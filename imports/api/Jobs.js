import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import JobSchema  from './Schemas/jobSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import EventSchema from './Schemas/eventSchema';
import OshaSchema from './Schemas/oshaSchema';
import SupervisorSchema from './Schemas/supervisorSchema';
import LocationSchema  from './Schemas/locationSchema';
import  RequirementSchema  from './Schemas/requirementSchema';
import SocialSchema from './Schemas/socialSchema';
import IdSchema from './Schemas/specificId';
import ToolSchema from './Schemas/toolSchema';
import  TextList from './Schemas/textListSchema';
import  BasicText  from './Schemas/basicTextSchema';
import ProfessionalSchema from './Schemas/professionalSchema'
import NotificationSchema from './Schemas/notificationSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import { Roles } from 'meteor/alanning:roles';

import SimpleSchema from 'simpl-schema';
/** @module Job */

export const  NOTMADE ={
  jobNotMade : true
};
/**
* @summary Defines the Job collection,
* has the basic MongoBD functions(insert,update,remove,etc)'
* @example
* //inserts a object into the Job Collection
* Job.insert(object)
*/
Job = new Mongo.Collection('jobs');
Job.attachSchema(JobSchema);

/**
 * Calculates the longitude and latitude coordinates around a given width of
 * a location
 * @param  {Double} lat         the latitude of the center point
 * @param  {Double} lng         the longitude of the center point
 * @param  {Double} maxDistance the distance in miles from the center point
 * @return {Object}             contains the top and bottom latitude coordinates and left and right longitude coordinates
 * @example
 * //calculate the coordinates for a 20 miles distance around the coordinates (40.0,73.1)
 * 
 */
const calculateJobArea = (lat,lng,maxDistance)=>{
  const bearing = 45;
  const meterDegrees = 111111;
  const mileToMeters= 1609.34;

  let distance = maxDistance* mileToMeters/2;
  let cos_degg = Math.cos(bearing* Math.PI/180);
  let sin_degg = Math.sin(bearing* Math.PI/180);

  let lat_rad = Math.cos(lat * Math.PI/180);

  let eastDisplacement = distance * sin_degg / lat_rad / meterDegrees;
  let northDisplacement = distance * cos_degg / meterDegrees;
  let westDisplacement = - eastDisplacement;
  let southDisplacement = - northDisplacement;

  return{
    latTop: lat + northDisplacement,
    latBottom: lat + southDisplacement,
    lngTop: lng + eastDisplacement,
    lngBottom: lng + westDisplacement
  }
};
const removeEmployeeSingleDimArray =(userId,array)=>{
  const idx = array.indexOf(userId);
  if(idx == -1) throw "Not Found in Array";
  array.splice(idx,1);
  return array;
};
const removeEmployeeTwoDimArray = (userId,twoDimArray) =>{
  if(twoDimArray[0].constructor === Array) throw "Not a Two Dimensional Array";
  let outIndx = -1;
  let inIndx = -1;
  for (let i in twoDimArray) {
    let foundUserIndex = twoDimArray[i].ids.indexOf(userId);
    if(foundUserIndex != -1) {
      inIndx = foundUserIndex;
      outIndx = i;
    }
  }
  twoDimArray[outIndx].ids.splice(inIndx,1);
  return {
    twoDArray:twoDimArray,
    outterIndex: outIndx
  }
};
export const changeIsOpen = () =>{

  let currentDate = new Date();
  let changedJobArray=[];
  let things = Job.find({'generalEnd': {$lt : currentDate},'isOpen':true});
  things.forEach((job)=>{
    job.isOpen = false;
    changedJobArray.push(job._id);
    Job.update({_id:job._id},{$set:job});
  });
  updateEmployeeWorkHistory(changedJobArray)
  return things.count();
};


const updateEmployeeWorkHistory = (arrayOfIds)=>{

    jobAndEmployeeIDS = []
    for (let key in arrayOfIds) {
        let id =  arrayOfIds[key]
        let admitemployeeIds = Job.findOne({_id:id},{fields:{admitemployeeIds:1}}).admitemployeeIds;

        console.log(admitemployeeIds);
        let jobEmployeeObject = {
          employeeIds: admitemployeeIds,
          jobId: id
        }
        jobAndEmployeeIDS.push(jobEmployeeObject)
    }
    //SHOULD UNROLL THIS
    for (let indx in jobAndEmployeeIDS) {
      for( let employeeIndex in jobAndEmployeeIDS[indx].employeeIds){

        let user = Meteor.users.findOne({_id:jobAndEmployeeIDS[indx].employeeIds[employeeIndex]});
        console.log(user);
        let prevJob = user.profile.employeeData.prevJobs;
        prevJob[prevJob.length] = jobAndEmployeeIDS[indx].jobId;
        Meteor.users.update({_id: jobAndEmployeeIDS[indx].employeeIds[employeeIndex] },{$set: user});
      }
    }
};
const jobRequirementAgainstEmployeeQuery =(employeeData) =>{
  return[
       {$or:[ {'requirements.driverLicense':{$ne : true}},
       {'requirements.driverLicense':true,'requirements.driverLicense':employeeData.driverLicense }]}
     ,
       {$or:[ {'requirements.osha.osha10': false, 'requirements.osha.osha30':false},
       {'requirements.osha.osha10':false,'requirements.osha.osha30':true,'requirements.osha.osha30':employeeData.osha.osha30},
       {'requirements.osha.osha10':true, $or :[{'requirements.osha.osha10':employeeData.osha.osha10},{'requirements.osha.osha10':employeeData.osha.osha30}] },
       ]}
     ,
       {$or:[ {'requirements.socialPref.taxID': false, 'requirements.socialPref.social':false},
       {'requirements.socialPref.taxID':false,'requirements.socialPref.social':true,'requirements.socialPref.social':employeeData.socialPref.social},
       {'requirements.socialPref.taxID':true, $or :[{'requirements.socialPref.taxID':employeeData.socialPref.taxID},{'requirements.socialPref.social':employeeData.socialPref.social}] },
       ]}
     ]


}

if ( Meteor.isServer ) {

  /**
  *
  * Publishes all Jobs that matchs the jobTitles of a  employee, and
  * within a range of the employee location, the range is  defined by the employee
  * @param {Object} employee is an object that should match EmployeeSchema
  * @returns {Array} that contains all jobs mataching a several job titles and are
  * within a specific range of the employee location
  *
  */

  Meteor.publish('job-post', function(employee){

    if(Roles.userIsInRole(this.userId,PROFESSIONAL)){

      let jobTitle = employee.jobTitle;

      let coor = calculateJobArea(employee.location.latitude,
                                  employee.location.longitude,
                                  employee.maxDistance);
      let hackIdThing =[this.userId];
      let currentDate = new Date();



      let queryArray = jobRequirementAgainstEmployeeQuery(employee);
      queryArray.push({
           'jobTypes.texts' : {$in : jobTitle},
           'declineemployeeIds' :{$nin : hackIdThing},
           'applyemployeeIds' :{$nin : hackIdThing},
           'admitemployeeIds' :{$nin : hackIdThing},
           'generalStart':{$gt: currentDate},
           'isOpen':true,
           'location.latitude': {$gte: coor.latBottom, $lt: coor.latTop},
           'location.longitude': {$gte: coor.lngBottom, $lt: coor.lngTop}
        });

      return  Job.find({
         $and: queryArray
       });


    }else{
      this.stop();
      return ;
    }

  });

  Meteor.publish('active-jobs',function () {
    if( Roles.userIsInRole(this.userId,PROFESSIONAL)){
      let currentJobs = Meteor.call('findActiveJobsEmployee');
      return Job.find({ _id:{$in: currentJobs} });
    }
    else if( Roles.userIsInRole(this.userId,CONTRACTOR)){
      let currentJobs = Meteor.call('findActiveJobsEmployer');
      return Job.find({ _id:{$in: currentJobs} });
    }
    else{
      this.stop();
      return null;
    }
  })
  /**
    MAYBE MERGE WITH ONE-JOB PUBLICATION
   */
  Meteor.publish('job-post-employer-edit',function(jobId){
    if(Roles.userIsInRole(this.userId,CONTRACTOR)){
      return Job.find({_id: jobId,employerId:this.userId},{sort: {generalStart: 1}});
    }else{
      this.stop();
      return;
    }
  });
  /**
    MAYBE MERGE WITH job-post-employer-edit PUBLICATION
   */
  Meteor.publish('one-job',function(jobID){

    if(Roles.userIsInRole(this.userId,PROFESSIONAL) ||
     Roles.userIsInRole(this.userId,CONTRACTOR)){
       let things= Job.find({_id: jobID});
       return things;
     }else{
       this.stop();
       return;
     }
  });
  /**
  *
  * Publishes all Jobs that a employee was matched with
  * @returns {Array} that contains all jobs made by a specific user.
  */

  Meteor.publish('job-post-admitted',function(){

    if(Roles.userIsInRole(this.userId,PROFESSIONAL)){
      let hackIdThing = [];
      hackIdThing[0] = this.userId;
      return Job.find({admitemployeeIds: {$in: hackIdThing}},{sort: {generalStart: 1}});;
    }else{
      this.stop();
      return ;
    }

  });

  Meteor.publish('job-post-applied',function(){

    if(Roles.userIsInRole(this.userId,PROFESSIONAL)){
      let hackIdThing = [];
      hackIdThing[0] = this.userId;
      return Job.find({applyemployeeIds: {$in: hackIdThing}},{sort: {generalStart: 1}});;
    }else{
      this.stop();
      return ;
    }

  });

  Meteor.publish('upcoming-job-con',function(){
    let currentDate = new Date();
    if (Roles.userIsInRole(this.userId,CONTRACTOR)) {

     return Job.find({employerId:this.userId,
                      generalStart:{$gt: currentDate},
                      isOpen:true},{sort: {generalStart: 1}});
    }else {
      this.stop();
      return;
    }
  });

  //Find current job for professionals
  // These dont need to paramter to be passed since we know who is calling this function
  Meteor.publish('current-job-pro',function(){
    if(Roles.userIsInRole(this.userId,PROFESSIONAL)) {
      let hackIdThing =[];
      hackIdThing[0] = this.userId;
      let currentDate = new Date()
      let job = Job.find({
            'admitemployeeIds' :{$in : hackIdThing},
            'generalStart':{$lte: currentDate},
            'generalEnd':{$gt: currentDate},
            'isOpen':true
      });
      let jobIds = [];
      job.forEach((job) =>{
        //Index of the smaller array inside AdmitAsIDs array
        let idxx = -1;
        //Index for AdmitAsIDs (bigger array), index used for jobTypes array
        let idxx2 = -1;
        for (let indx in job.admitAsIDs) /*indx is indexing through admitAsIDs*/ {
          //if empId is not in the array in array admitAsIDS, move to next array in admitAsIDs array
          if (job.admitAsIDs[indx].ids.indexOf(this.userId) != -1) {
            idxx = job.admitAsIDs[indx].ids.indexOf(this.userId);
            idxx2 = indx;
          }
        }
        let eventId = job.eventInfo[idxx2]
        //Find event with event Id
        hackIdThing = [];
        hackIdThing[0] = eventId
        let eventObj = Event.findOne({_id: {$in: hackIdThing},
          'startAt': {$lte: currentDate},
          'endAt': {$gt: currentDate}
        })
        if(!!eventObj)jobIds[jobIds.length] = eventObj.jobId;

      });
      let cursor = Job.find({_id:{$in:  jobIds}});

      return  cursor;
    } else {
      this.stop();
      return;
    }
  });

  //Find completed job for professionals
  // These dont need to paramter to be passed since we know who is calling this function
  Meteor.publish('completed-job-pro',function(){
    if(Roles.userIsInRole(this.userId,PROFESSIONAL)) {
      let hackIdThing =[this.userId];

      let currentDate = new Date()



      let job = Job.find({'admitemployeeIds' :{$in : hackIdThing},
                          'generalEnd':{$lt: currentDate},
                          'isOpen':false});
      // return job;
      // WHY IS THIS HERE
      let jobIds = [];
        job.forEach((job) =>{
        let idxx = -1;
        let idxx2 = -1;

        for (let indx in job.admitAsIDs)  {
          if (job.admitAsIDs[indx].ids.indexOf(this.userId) != -1) {
            idxx = job.admitAsIDs[indx].ids.indexOf(this.userId);
            idxx2 = indx;
          }
        }
        let eventId = job.eventInfo[idxx2];

        hackIdThing = [];
        hackIdThing[0] = eventId;
        let eventObj = Event.findOne({_id: {$in: hackIdThing},'endAt': {$lt: currentDate}});
        if(!!eventObj)jobIds[jobIds.length] = eventObj.jobId;


      });
      let cursor = Job.find({_id:{$in:  jobIds}});

      return  job;

    } else {
      this.stop();
      return;
    }
  });

  //Find upcoming job for professionals
  // These dont need to paramter to be passed since we know who is calling this function
  Meteor.publish('upcoming-job-pro',function(){
    if(Roles.userIsInRole(this.userId,PROFESSIONAL)) {
      let hackIdThing =[];
      hackIdThing[0] = this.userId;
      let currentDate = new Date()
      let job = Job.find({$and:
        [
          {
            'admitemployeeIds' :{$in : hackIdThing}
          }, {
            'generalStart':{$gt: currentDate}
          }, {
            'isOpen':true
          }
        ]
      })
      if(!job)throw new Meteor.Error('403','Job was not found');

      return job;

    } else {
      this.stop();
      return;
    }
  });



  Meteor.publish('current-job-con',function(){
    let currentDate = new Date();
    if (Roles.userIsInRole(this.userId,CONTRACTOR)) {

        let things = Job.find({'generalEnd': {$lt : currentDate},
                               'isOpen':true,
                               'employerId':this.userId});
       things.forEach((job)=>{
         job.isOpen = false;
         Job.update({_id:job._id},{$set:job});
       });

      return Job.find(
        { employerId:this.userId,
          generalStart:{$lt: currentDate},
          isOpen:true
        },
          {sort: {generalStart: 1}}
       );
    }else {
      this.stop();
      return;
    }
  });

  Meteor.publish('closed-job-con',function(){
    if (Roles.userIsInRole(this.userId,CONTRACTOR)) {
      return Job.find({employerId:this.userId,isOpen: false},{sort: {generalStart: 1}});
    }else {
      this.stop();
      return;
    }
  });
  Meteor.publish('apply-employee-job',function(jobId){
    if (Roles.userIsInRole(this.userId,CONTRACTOR)|| Roles.userIsInRole(this.userId,PROFESSIONAL)) {

      let jobInfo = Job.findOne({_id: jobId},{fields:{applyemployeeIds: 1}});

      if(!!jobInfo.applyemployeeIds){
        return  Meteor.users.find({_id: {$in: jobInfo.applyemployeeIds}}, {fields: { emails: 1, profile: 1 } });
      }
      return ;

    }else{
      this.stop();
      throw new Meteor.Error('403',NOTAUTH);
    }
  });
  Meteor.publish('admit-employee-job',function(jobId){
    if (Roles.userIsInRole(this.userId,CONTRACTOR)|| Roles.userIsInRole(this.userId,PROFESSIONAL)) {

      let jobInfo = Job.findOne({_id: jobId},{fields:{admitemployeeIds:1}});
      if(!!jobInfo.admitemployeeIds){
        return Meteor.users.find({_id: {$in: jobInfo.admitemployeeIds}}, {fields: { emails: 1, profile: 1 } });
      }
      return ;

    }else{
      this.stop();
      throw new Meteor.Error('403',NOTAUTH);
    }
  });
}




Meteor.methods({

  validateJob(jobObject){
    let  validations = JobSchema.newContext();
    let supervisorValidation1 = SupervisorSchema.namedContext('SUP');
    let supervisorValidation2 = SupervisorSchema.namedContext('SUP2');
    let proValidation = ProfessionalSchema.namedContext('PRO');
    let eventValidation = EventSchema.namedContext('EVE');
    let locationValidation = LocationSchema.namedContext('Location');
    let oshaValidation = OshaSchema.namedContext('osha');
    let socialValidation = SocialSchema.namedContext('social');
    let toolValidation  = ToolSchema.namedContext('tool');
    let reqValidation = RequirementSchema.namedContext('req');
    let basicValidation = BasicText.namedContext('basic');
    let listValidation = TextList.namedContext('text');


    let visorNumb = !supervisorValidation1.validate(jobObject.supervisor,{keys:['phone']});
    let visorName = !supervisorValidation2.validate(jobObject.supervisor,{keys:['name']});
    let jobTypes = !validations.validate(jobObject,{keys:['jobTypes.texts']});
    let jobTitle = !validations.validate(jobObject,{keys:['jobTitle.text']});
    let tools = !toolValidation.validate(jobObject.tools,{keys:['toolsRequired']});
    let toolsname = !toolValidation.validate(jobObject.tools,{keys:['toolsName']});
    let locationName = !locationValidation.validate(jobObject.location,{keys:['locationName']});
    let locLat = !locationValidation.validate(jobObject.location,{keys:['latitude']});
    let locLng = !locationValidation.validate(jobObject.location,{keys:['longitude']});
    let reqLicense = !reqValidation.validate(jobObject.requirements,{keys:['driverLicense']});
    let excWeekends = !reqValidation.validate(jobObject.requirements, {keys:['weekendExcluded']})
    let reqBackground = !reqValidation.validate(jobObject.requirements,{keys:['backgroundCheck']});
    let reqLanguages = !reqValidation.validate(jobObject.requirements,{keys:['languages']});
    let oshaCheck = !oshaValidation.validate(jobObject.requirements.osha,{keys:['osha10','osha30']});
    let socialCheck = !socialValidation.validate(jobObject.requirements.socialPref,{keys:['taxID','social']});

    let lengthToCheck = jobObject.professionals.length;
    let events = [];



    for(let i =0;i<lengthToCheck;++i){
        let eventtoMake= EventSchema.clean({},{mutate:true});
        eventtoMake.title.text = jobObject.professionals[i].title;
        eventtoMake.responsibilities.text = jobObject.professionals[i].responsibilities;
        eventtoMake.startAt = jobObject.professionals[i].startAt;
        eventtoMake.endAt = jobObject.professionals[i].endAt;

        delete jobObject.professionals[i].startAt;
        delete jobObject.professionals[i].endAt;
        delete jobObject.professionals[i].title;

        events[i] = eventtoMake;
    }


    let largeTime = new Date();

    for (let idx in events) {
      if (largeTime < events[idx].endAt) {
        largeTime =  events[idx].endAt;
      }
    }

    let smallTime = largeTime;
    for (let idx in events) {
        if (smallTime > events[idx].startAt) {
          smallTime = events[idx].startAt;
        }
    }


    jobObject.generalStart = smallTime;
    jobObject.generalEnd = largeTime;
    let proissue = false;
    let eventissue = false;
    let prodetails = [];
    let eventdetails = [];
    if(lengthToCheck < 1){
      proissue = true;
      eventissue=true;
    }

    for(let i =0;i<lengthToCheck;++i){
      let protitle = !proValidation.validate(jobObject.professionals[i],{keys:['responsibilities']});
      let propay = !proValidation.validate(jobObject.professionals[i],{keys:['pay']});
      let proworker = !proValidation.validate(jobObject.professionals[i],{keys:['numWorkers']});

      let eventTitle = !basicValidation.validate(events[i].title,{keys:['text']});
      let eventRes = !basicValidation.validate(events[i].responsibilities,{keys:['text']});
      let eventStart = !eventValidation.validate(events[i],{keys:['startAt']});
      let eventEnd =  !eventValidation.validate(events[i],{keys:['endAt']});


      let ProError = {
        protitle: protitle,
        propay: propay,
        proworker:proworker
      };

      let EventError ={
        eventTitle: eventTitle,
        eventRes : eventRes,
        eventStart : eventStart,
        eventEnd : eventEnd
      }
      if(protitle || propay || proworker) proissue = true;
      if(eventTitle || eventRes || eventStart || eventEnd) eventissue = true;
      prodetails[i] = ProError;
      eventdetails[i] = EventError;

    }

    let Errors ={
      visorNumb : visorNumb,
      visorName : visorName,
      jobTypes : jobTypes,
      jobTitle : jobTitle,
      tools : tools,
      toolsname: toolsname,
      locationName :  locationName,
      locLat : locLat,
      locLng :  locLng,
      reqLicense : reqLicense,
      reqBackground : reqBackground,
      reqLanguages : reqLanguages,
      oshaCheck : oshaCheck,
      socialCheck : socialCheck,
      professionalIssue :{
        isIssue : proissue,
        details : prodetails
      },
      eventIssue : {
        isIssue : eventissue,
        details : eventdetails,
      }
    };



    //
    if( visorNumb||tools|| toolsname ||visorName || jobTypes || jobTitle || locationName ||
      locLat || locLng || reqLicense || reqBackground || reqLanguages ||
      oshaCheck  || socialCheck || proissue || eventissue
    ) throw new Meteor.Error('403',Errors);

    return{
      job : jobObject,
      events :  events
    };
  },
/**
 * Base upon the jobObject,notifications will be sent to the employees how are qualified
 * in the area of the location of the job.
 * @public
 * @param  {Object} jobObject the object of the job that contains info such location
 * @param  {string} jobId     the id of the job
 */
  sendNotificationsToPotential(jobObject,jobId){
    let maxTravel = calculateJobArea(jobObject.location.latitude,
                                      jobObject.location.longitude,100);
    //Gets all professional that have the job role in the job posting and are within 100 miles
    let potentialUser = Meteor.users.find({
          'profile.employeeData.jobTitle' : {$in : jobObject.jobTypes.texts},
          'profile.employeeData.location.latitude': {$gte: maxTravel.latBottom, $lt: maxTravel.latTop},
          'profile.employeeData.location.longitude': {$gte: maxTravel.lngBottom, $lt: maxTravel.lngTop}
    });

    let peoples = [];
    potentialUser.forEach((user)=>{
      let lat= user.profile.employeeData.location.latitude;
      let lng = user.profile.employeeData.location.longitude;
      let distance = user.profile.employeeData.maxDistance;

      const { latTop,latBottom,lngTop,lngBottom }  = calculateJobArea(lat,lng,distance);

      if(jobObject.location.latitude >= latBottom &&
         jobObject.location.latitude <=  latTop &&
         jobObject.location.longitude >= lngBottom &&
         jobObject.location.longitude <= lngTop ){


           let queryArray = jobRequirementAgainstEmployeeQuery(user.profile.employeeData);
           queryArray.push({
                _id:jobId
             });
          let matched = Job.find({ $and: queryArray}).count() >0 ? true:false;
          if(matched) peoples[peoples.length] = user._id;

       }

    });



    let notify = NotificationSchema.clean({},{mutate:true});
    notify.description = `There is a potential Job Match at ${jobObject.location.locationName}`;
    notify.jobId = jobId;
    notify.typeNotifi = "MATCH";
    notify.href = `/job/${jobId}`;
    for(let i =0 ;i < peoples.length;++i){
      notify.toWhomst = peoples[i];

      Meteor.call('createNotification',notify);
    }

  },
  /**
  Inserts a Job and an Event into the database. That Job must follow the format of
  JobSchema and the Event must follow the format of EventSchema.
  Only a contractor can use this function
  @param {Object} newJobEvent that contains the job object and th event object
  @throws {Meteor.Error} if the object passed does not match the Schema you will
  get a match error or if the user calling the method is not signin a Meteor.Error
  will be called.
  */

  createJob(newJobEvent){

    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    if(Roles.userIsInRole(this.userId,CONTRACTOR) ){
      let person = Meteor.users.findOne({_id : this.userId},{fields: { profile: 1 } });
      // if(!Roles.userIsInRole(this.userId,'free-job') && !Roles.userIsInRole(this.userId,'subscribe'))throw new Meteor.Error('403',NOTMADE);


      let things = Meteor.call('validateJob',newJobEvent);
      let job = things.job;
      let eventz = things.events;
      job.employerId = this.userId;
      job.createdAt = new Date();
      job.updateAt = new Date();
      let thingy = IdSchema.clean({},{mutate:true});

      for (let i = 0; i < eventz.length; i++) {
        job.applyAsIDs[i] = thingy;
        job.admitAsIDs[i]= thingy;
      }

      let id1 = Job.insert(job);
      let ids2 =[];
      for (let i = 0; i < eventz.length; i++) {
        eventz[i].owner = this.userId;
        eventz[i].createdAt = new Date();
        ids2[i] =  Event.insert(eventz[i]);
        eventz[i].jobId = id1;

        let selector2 = {_id: ids2[i], owner: this.userId};
        Event.update(selector2,{$set:eventz[i]});
      }

      job.eventInfo= ids2;

      let selector1 = {_id: id1, employerId: this.userId};
      Job.update(selector1,{$set: job});

      //========Commented out for TESTING purposes==========
      // if(Roles.userIsInRole(this.userId,'free-job')){
      //   Roles.removeUsersFromRoles(this.userId,'free-job');
      // }
      Meteor.call('sendNotificationsToPotential',job,id1);
      return things;


    }else{
      throw new Meteor.Error('401',NOTAUTH);
    }
  },
  /**
  ------------------------------------------------------------------------------
  ------------------------------------------------------------------------------
  THIS FUNCTION WILL HAVE TO BE CHANGE TO MAKE THE SCHEMA CHANGES
  -----------------------------------------------------------------------------
  -----------------------------------------------------------------------------
  Updates a JobPost that was already inserted into the database. If the JobPost
  object contains default values no reassignments will occur. If the jobId does
  not return a value object the function will exit. Only Contractors can call
  this function if an employee tries to use this function an
  unauthorize error will occur
  @param {String} jobId is the Id of the jobPost
  @param {Object} JobPost must match to the JobSchema
  @throws {Meteor.Error} if the object passed does not match the Schema you will
  get a match error OR if the user calling the method is not signin a Meteor.Error
  will be called OR if the jobID is not a string.
  */
  updateJob(jobId,updateJ){
    check(jobId,String);
    let optional = Match.Optional;
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    if( !(Roles.userIsInRole(this.userId,CONTRACTOR)) ) throw new Meteor.Error('401',NOTAUTH);;

  let things = Meteor.call('validateJob',updateJ);

  let updateJob = things.job;
  let updateEvent = things.events;

  let prevJob = Job.findOne({_id: jobId});
  if(!(prevJob)) return;
  let requirements = updateJob.requirements;

  if(updateJob.additionText != DEFAULT ){
    prevJob.additionText = updateJob.additionText
  }

  if(requirements.languages.length >0){
    prevJob.requirements.languages = requirements.languages;
  }
  if(requirements.driverLicense != prevJob.requirements.driverLicense){
    prevJob.requirements.driverLicense = requirements.driverLicense;
  }
  if(requirements.osha.osha10 != prevJob.requirements.osha.osha10){
    prevJob.requirements.osha.osha10 = requirements.osha.osha10;
  }
  if(requirements.osha.osha30 != prevJob.requirements.osha.osha30){
    prevJob.requirements.osha.osha30 = requirements.osha.osha30;
  }
  if(requirements.socialPref.taxID != prevJob.requirements.socialPref.taxID){
    prevJob.requirements.socialPref.taxID = requirements.socialPref.taxID;
  }
  if(requirements.socialPref.social != prevJob.requirements.socialPref.social){
    prevJob.requirements.socialPref.social = requirements.socialPref.social;
  }
  if(requirements.weekendExcluded != prevJob.requirements.weekendExcluded){
    prevJob.requirements.weekendExcluded = requirements.weekendExcluded
  }
  if(updateJob.supervisor.name != prevJob.supervisor.name){
    prevJob.supervisor.name = updateJob.supervisor.name;
  }
  if(updateJob.supervisor.phone != prevJob.supervisor.phone){
    prevJob.supervisor.phone = updateJob.supervisor.phone;
  }

  if(requirements.backgroundCheck != prevJob.requirements.backgroundCheck){
    prevJob.requirements.backgroundCheck = requirements.backgroundCheck;
  }

  if(updateJob.location.locationName != DEFAULT){
    prevJob.location.locationName =
    updateJob.location.locationName;

    prevJob.location.latitude =
    updateJob.location.latitude;

    prevJob.location.longitude =
    updateJob.location.longitude;
  }
  prevJob.professionals = updateJob.professionals
  prevJob.updateAt = new Date();
  prevJob.generalStart = updateJob.generalStart;
  prevJob.generalEnd = updateJob.generalEnd;
  let selector = {_id: jobId, employerId: this.userId};

  Job.update(selector,{$set: prevJob});

  for (let idx in updateEvent) {

    let selector2 = {_id: prevJob.eventInfo[idx],owner:this.userId};
      updateEvent[idx].jobId = jobId;
      Event.update( selector2,{$set:updateEvent[idx]});
  }

},

  applyForJob(jobId,position){
    if(!this.userId || !Roles.userIsInRole(this.userId,PROFESSIONAL)) throw new Meteor.Error('401',NOTAUTH);

    let currentUser = Meteor.users.findOne({_id:this.userId},{fields: {'profile.employeeData.jobTitle':1 } });

    let job = Job.findOne({_id: jobId});
    if(!job)throw new Meteor.Error('403','Job was not found');
    let employeeDoesntHave= currentUser.profile.employeeData.jobTitle.includes(position)? false:true;
    let jobDoesntHave = job.jobTypes.texts.includes(position) ? false:true;


    if(jobDoesntHave||employeeDoesntHave)return;
    if (job.declineemployeeIds.includes(this.userId)) return;
    if(job.admitemployeeIds.includes(this.userId)) return;
    if (job.applyemployeeIds.includes(this.userId)) {
      return;
    }else{
      let idx = job.jobTypes.texts.indexOf(position);
      if(job.admitAsIDs[idx].ids.length >= job.professionals[idx].numWorkers)return;
      job.applyemployeeIds.push(this.userId);
      let noCopies = new Set(job.applyemployeeIds);
      job.applyemployeeIds = Array.from(noCopies);

      job.applyAsIDs[idx].ids.push(this.userId);
      let nonCopies = new Set(job.applyAsIDs[idx].ids);
      job.applyAsIDs[idx].ids = Array.from(nonCopies);
    }

    let selector = {_id: jobId};

    Job.update(selector,{$set: job});

    let notify = NotificationSchema.clean({},{mutate:true});
    notify.toWhomst = job.employerId;
    notify.typeNotifi="APPLIED";
    notify.description = `Someone applied for the job you posted at ${job.location.locationName}`;
    notify.jobId = jobId;
    notify.href = `/job/${jobId}`;

    Meteor.call('createNotification',notify);

  },
  declineJob(jobId){
    if(!this.userId || !Roles.userIsInRole(this.userId,PROFESSIONAL)) throw new Meteor.Error('401',NOTAUTH);

    let job = Job.findOne({_id: jobId});
    if(!job)throw new Meteor.Error('403','Job was not found');

    if(job.applyemployeeIds.includes(this.userId)){
      job.applyemployeeIds = removeEmployeeSingleDimArray(this.userId,job.applyemployeeIds);
      job.applyAsIDs = removeEmployeeTwoDimArray(this.userId,job.applyAsIDs).twoDArray;

    }
    if (job.admitemployeeIds.includes(this.userId)) {
      job.admitemployeeIds = removeEmployeeSingleDimArray(this.userId,job.admitemployeeIds);
      job.admitAsIDs = removeEmployeeTwoDimArray(this.userId,job.admitAsIDs).twoDArray;

    }
    if (job.declineemployeeIds.includes(this.userId)) {
      return;
    }
    job.declineemployeeIds.push(this.userId);
    let noCopies = new Set(job.declineemployeeIds);
    job.declineemployeeIds = Array.from(noCopies);

    let selector = {_id: jobId};

    Job.update(selector,{$set: job});
  },
  declineEmployee(jobId,employeeId){
      if(!this.userId || !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);

      let job = Job.findOne({_id: jobId});
      if(!job)throw new Meteor.Error('403','Job was not found');

      if(job.applyemployeeIds.includes(employeeId)){
        job.applyemployeeIds = removeEmployeeSingleDimArray(employeeId,job.applyemployeeIds);
        job.applyAsIDs = removeEmployeeTwoDimArray(employeeId,job.applyAsIDs).twoDArray;

      }
      if (job.admitemployeeIds.includes(employeeId)) {
        job.admitemployeeIds = removeEmployeeSingleDimArray(employeeId,job.admitemployeeIds);
        job.admitAsIDs = removeEmployeeTwoDimArray(employeeId,job.admitAsIDs).twoDArray;
      }
      if (job.declineemployeeIds.includes(employeeId)) {
        return;
      }
      job.declineemployeeIds.push(employeeId);
      let noCopies = new Set(job.declineemployeeIds);
      job.declineemployeeIds = Array.from(noCopies);


      let selector = {_id: jobId};
      Notification.remove({toWhomst:employeeId,jobId:jobId,typeNotifi:"MATCH"});
      Notification.remove({toWhomst:employeeId,jobId:jobId,typeNotifi:"HIRED"});
      Job.update(selector,{$set: job});
  },
  admiteEmployee(jobId,employeeId){
    if(!this.userId || !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);

    let job = Job.findOne({_id: jobId});
    if(!job)throw new Meteor.Error('403','Job was not found');

    let idxx2 = -1;

    if(job.applyemployeeIds.includes(employeeId)){
      job.applyemployeeIds = removeEmployeeSingleDimArray(employeeId,job.applyemployeeIds);
      const result =  removeEmployeeTwoDimArray(employeeId,job.applyAsIDs);
      job.applyAsIDs = result.twoDArray;
      idxx2 = result.outterIndex;
    }
    if(job.declineemployeeIds.includes(employeeId)){ //Shouldn't happen but incase
      let idx = job.declineemployeeIds.indexOf(employeeId);
      if (idx != -1) { //Should always be true
          job.declineemployeeIds.splice(idx,1);
      }
    }
    if (job.admitemployeeIds.includes(employeeId)) {
      return;
    }
    if(job.admitAsIDs[idxx2].ids.length >= job.professionals[idxx2].numWorkers)return;
    job.admitemployeeIds.push(employeeId);
    let noCopies = new Set(job.admitemployeeIds);
    job.admitemployeeIds = Array.from(noCopies);

    job.admitAsIDs[idxx2].ids.push(employeeId);
    let nonCopies = new Set(job.admitAsIDs[idxx2].ids);
    job.admitAsIDs[idxx2].ids = Array.from(nonCopies);


    let notify = NotificationSchema.clean({},{mutate:true});
    notify.toWhomst = employeeId;
    notify.description = `You have been admitted to the job at ${job.location.locationName}`;
    notify.typeNotifi="HIRED"
    notify.jobId =jobId;
    notify.href = `/job/${jobId}`;

    Meteor.call('createNotification',notify);

    Notification.remove({toWhomst:employeeId,jobId:jobId,typeNotifi:"MATCH"});

    let selector = {_id: jobId, employerId:this.userId};

    Job.update(selector,{$set: job});
  },

  /**
  Deletes a jobPost and the events associated with it from the database using its ID. Only a contractor can
  call this function
  @param {String} jobId is the Id of the jobPost
  @throws {Meteor.Error} if the jobId is not a string a match error will be
  thrown Or if the user calling the function is not sign an 401 error will be thrown
  */
  removeJob(jobId){
    check(jobId,String);
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    if(!Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);
    let notify = NotificationSchema.clean({},{mutate:true});

    let jobRemove = Job.findOne({_id:jobId,employerId:this.userId});
    notify.description = `The Job located at ${jobRemove.location.locationName} has been cancelled`;
    notify.typeNotifi="REMOVE";
    let peopleApplied = jobRemove.applyemployeeIds;
    let peopleMatch = jobRemove.admitemployeeIds;
    let totalPeople = peopleApplied.concat(peopleMatch);
    notify.jobId = JSON.stringify(jobRemove);
    notify.href = `/deleted-job/${jobId}`;
    for (let i = 0; i < totalPeople.length; i++){
      notify.toWhomst = totalPeople[i];
      Meteor.call('createNotification',notify,(err)=>{
        if(err)console.log(err);
      });
      // Meteor.call('removeJobPro', totalPeople, jobRemove.location.locationName);
    }
    let notifyEmployer = NotificationSchema.clean({});
    notifyEmployer.description =`You cancelled the Job located at ${jobRemove.location.locationName}`;
    notifyEmployer.typeNotifi="REMOVE";
    notifyEmployer.jobId = JSON.stringify(jobRemove);
    notifyEmployer.toWhomst = this.userId;
    notifyEmployer.href = `/deleted-job/${jobId}`;
    Meteor.call('createNotification',notifyEmployer,(err)=>{
      if(err)console.log(err);
    });

    Meteor.call('removeJobPro', totalPeople, jobRemove.location.locationName,(err)=>{
      if(err)console.log(err);
    });
    Meteor.call('removeJobCon', this.userId, jobRemove.location.locationName,(err)=>{
      if(err)console.log(err);
    });
    Meteor.call('deleteNotificationsForJob',jobId,(err)=>{
      if(err)console.log(err);
    });


    Job.remove({_id: jobId, employerId: this.userId});
    Event.remove({jobId: jobId,owner:this.userId});
  },
  getJobInfo(jobId){
    check(jobId,String);
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    // if(!Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);

    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);
    Job.findOne({_id:jobId,employerId:this.userId})

  },
  closeJob(jobId){
    check(jobId,String);
    if(!this.userId || !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);
    let job = Job.findOne({_id:jobId},{fields:{admitemployeeIds:1}});
    if(!job) throw new Meteor.Error('403','Job Not Found');
    job.isOpen=false;
    let selector = {_id: jobId, employerId:this.userId};

    Job.update(selector,{$set: job});
    let admitemployeeIds= job.admitemployeeIds;

    for (let variable in admitemployeeIds) {
      Meteor.call('updateEmployeeJobHistory',admitemployeeIds[variable],jobId,(err)=>{
        if(err)console.log(err);
      })
    }
  },
  /**
   * Once a job is completed the employee that is associated with the id,(userId)
   * the field prevjob will be updated with the id of the completed job
   * @param  {string} userId  the id of the employee
   * @param  {string} jobId  the id of the job
   * @todo check if job exists and if employer is owner of that job
   */
  updateEmployeeJobHistory(userId,jobId){
    if(!this.userId|| !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);
    const jobNotCompleted = Job.findOne({_id:jobId},{fields:{isOpen: 1}});
    const jobNotExist = Job.find({_id:jobId}).count() < 1;
    if(!!jobNotCompleted||jobNotExist) throw new Meteor.Error('401',NOTAUTH);

    let user = Meteor.user.findOne({_id:userId});
    let prevJob = user.profile.employeeData.prevJobs;
    prevJob[prevJob.length] = jobId;
    Meteor.users.update({_id: userId},{$set: user});


  },
  findActiveJobsEmployee(){
    if(!this.userId|| !Roles.userIsInRole(this.userId,PROFESSIONAL)) throw new Meteor.Error('401',NOTAUTH);
    let jobIdArray = [];
    let hackIdThing  = [this.userId];
    let currentDate = new Date();
    let jobCursor = Job.find({ 'admitemployeeIds' :{$in : hackIdThing}},{fields:{_id:1}});

    jobCursor.forEach((job)=>{
      jobIdArray.push(job._id);
    })

    return jobIdArray;
  },
  findActiveJobsEmployer(){
    if(!this.userId|| !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);
    let jobIdArray = [];
    let currentDate = new Date();
    let jobCursor = Job.find({ employerId :this.userId},{fields:{_id:1}});

    jobCursor.forEach((job)=>{
      jobIdArray.push(job._id);
    })
    return jobIdArray;
  },

  matchNewEmployeeAgainstOldJobs(id){
    if(!Roles.userIsInRole(id,PROFESSIONAL)) throw new Meteor.Error('401',NOTAUTH);
    let employee = Meteor.users.findOne({_id: id}).profile.employeeData;
    if(!employee) return;
    let jobTitle = employee.jobTitle;

    let coor = calculateJobArea(employee.location.latitude,
                                employee.location.longitude,
                                employee.maxDistance);
    let hackIdThing =[id];
    let currentDate = new Date();


    let queryArray = jobRequirementAgainstEmployeeQuery(employee);
    queryArray.push({
         'jobTypes.texts' : {$in : jobTitle},
         'declineemployeeIds' :{$nin : hackIdThing},
         'applyemployeeIds' :{$nin : hackIdThing},
         'admitemployeeIds' :{$nin : hackIdThing},
         'generalStart':{$gt: currentDate},
         'isOpen':true,
         'location.latitude': {$gte: coor.latBottom, $lt: coor.latTop},
         'location.longitude': {$gte: coor.lngBottom, $lt: coor.lngTop}
      });

    let results =  Job.find({$and: queryArray},{fields:{_id:1,'location.locationName':1}});

    results.forEach((job)=>{
      let prev = Notification.find({toWhomst: id,typeNotifi:"MATCH",jobId:job._id}).count() > 0 ? true: false;

      if(!prev){
        let notify = NotificationSchema.clean({},{mutate:true});
        notify.description = `There is a potential Job Match at ${job.location.locationName}`;
        notify.jobId = job._id;
        notify.typeNotifi = "MATCH";
        notify.href = `/job/${job._id}`;
        notify.toWhomst = id;
        Meteor.call('createNotification',notify,(err)=>{
          if(err)console.log(err);
        });

      }
    });


  }
});
