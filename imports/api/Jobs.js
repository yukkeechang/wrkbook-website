import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import JobSchema  from './Schemas/jobSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import EventSchema from './Schemas/eventSchema';
import OshaSchema from './Schemas/oshaSchema';
import SocialSchema from './Schemas/socialSchema';
import ProfessionalSchema from './Schemas/professionalSchema'
import NotificationSchema from './Schemas/notificationSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import { Roles } from 'meteor/alanning:roles';

export const  NOTMADE ={
  jobNotMade : true
};
//Defines a collection named jobs
Job = new Mongo.Collection('jobs');
Job.attachSchema(JobSchema);


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

    let bearing = 45;
    const meterDegrees = 111111;
    const mileToMeters= 1609.34;

    let jobTitle = employee.jobTitle;
    let lat = employee.location.latitude;
    let lng = employee.location.longitude;
    let distance = employee.maxDistance * mileToMeters/2;

    let cos_degg = Math.cos(bearing* Math.PI/180);
    let sin_degg = Math.sin(bearing* Math.PI/180);

    let lat_rad = Math.cos(lat * Math.PI/180);

    let eastDisplacement = distance * sin_degg / lat_rad / meterDegrees;
    let northDisplacement = distance * cos_degg / meterDegrees;
    let westDisplacement = - eastDisplacement;
    let southDisplacement = - northDisplacement;
    let currentDate = new Date();


    let length = jobTitle.length;
    if (length == 1) {
      jobTitle[1]= "AAAA";
      // console.log(jobTitle);
    }
    console.log(jobTitle);

    let lat_top = lat + northDisplacement;
    let lat_bot = lat + southDisplacement;
    let lng_top = lng + eastDisplacement;
    let lng_bot = lng + westDisplacement;
    let hackIdThing =[];
    hackIdThing[0] = this.userId;


      let results =  Job.find({
          $and: [
            {
            'jobTypes.texts' : {$in : jobTitle},
            'declineemployeeIds' :{$nin : hackIdThing},
            'generalStart':{$gt: currentDate},
            'isOpen':true,
            'location.latitude': {$gte: lat_bot, $lt: lat_top},
            'location.longitude': {$gte: lng_bot , $lt: lng_top}}
            ,
              {$or:[ {'requirements.driverLicense':{$ne : true}},
              {'requirements.driverLicense':true,'requirements.driverLicense':employee.driverLicense}]}
            ,
              {$or:[ {'requirements.osha.osha10': false, 'requirements.osha.osha30':false},
              {'requirements.osha.osha10':false,'requirements.osha.osha30':true,'requirements.osha.osha30':employee.osha.osha30},
              {'requirements.osha.osha10':true, $or :[{'requirements.osha.osha10':employee.osha.osha10},{'requirements.osha.osha10':employee.osha.osha30}] },
              ]}
            ,
              {$or:[ {'requirements.socialPref.taxID': false, 'requirements.socialPref.social':false},
              {'requirements.socialPref.taxID':false,'requirements.socialPref.social':true,'requirements.socialPref.social':employee.socialPref.social},
              {'requirements.socialPref.taxID':true, $or :[{'requirements.socialPref.taxID':employee.socialPref.taxID},{'requirements.socialPref.social':employee.socialPref.social}] },
              ]}

          ]


      });

      return results;


  }else{
    this.stop();
    return ;
  }







});
/**
*
* Publishes all Jobs that was made by a employer
* ONLY an employer use this function
* @returns {Array} that contains all jobs made by a specific user.
*/
Meteor.publish('job-post-employer',function(){

  if(Roles.userIsInRole(this.userId,CONTRACTOR)){
    return Job.find({employerId: this.userId},{sort: {generalStart: 1}});
  }else{
    this.stop();
    return ;
  }

});
Meteor.publish('job-post-employer-edit',function(jobId){
  if(Roles.userIsInRole(this.userId,CONTRACTOR)){
    return Job.find({_id: jobId,employerId:this.userId},{sort: {generalStart: 1}});
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
Meteor.publish('active-jobs-admin',function(){
  if(Roles.userIsInRole(this.userId,'admin')){
    return Job.find({isOpen: true});
  }else{
    this.stop();
    return ;
  }

});


Meteor.publish('all-jobs',function(){
  if (Roles.userIsInRole(this.userId,'admin')) {
    return Job.find({});
  }else{
    this.stop();
    return;
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


Meteor.publish('current-job-con',function(){
  let currentDate = new Date();
  if (Roles.userIsInRole(this.userId,CONTRACTOR)) {
    return Job.find({employerId:this.userId,
                     generalStart:{$lt: currentDate},
                     isOpen:true},{sort: {generalStart: 1}});
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
  if (Roles.userIsInRole(this.userId,CONTRACTOR)) {

    let jobInfo = Job.findOne({_id: jobId, employerId: this.userId});

    if(!!jobInfo.applyemployeeIds){

      return  Meteor.users.find({_id: {$in: jobInfo.applyemployeeIds}}, {fields: { emails: 1, profile: 1 } });

    }else{
      return ;
    }
  }else{
    this.stop();
    throw new Meteor.Error('403',NOTAUTH);
  }
});
Meteor.publish('admit-employee-job',function(jobId){
  if (Roles.userIsInRole(this.userId,CONTRACTOR)) {

    let jobInfo = Job.findOne({_id: jobId, employerId: this.userId});
    if(!!jobInfo.admitemployeeIds){
      return Meteor.users.find({_id: {$in: jobInfo.admitemployeeIds}}, {fields: { emails: 1, profile: 1 } });
    }else{
      return ;
    }

  }else{
    this.stop();
    throw new Meteor.Error('403',NOTAUTH);
  }
});


Meteor.methods({

  validateJob(jobObject){
    let  validations = JobSchema.newContext('JOB');
    let proValidation = ProfessionalSchema.newContext('PRO');
    let eventValidation = EventSchema.newContext('EVE');

    let visorNumb = !validations.validateOne(jobObject,'supervisor.phone');
    let visorName = !validations.validateOne(jobObject,'supervisor.name');
    let jobTypes = !validations.validateOne(jobObject,'jobTypes.texts');
    let jobTitle = !validations.validateOne(jobObject,'jobTitle.text');
    let locationName = !validations.validateOne(jobObject,'location.locationName');
    let locLat = !validations.validateOne(jobObject,'location.latitude');
    let locLng = !validations.validateOne(jobObject,'location.longitude');
    let reqLicense = !validations.validateOne(jobObject,'requirements.driverLicense');
    let reqBackground = !validations.validateOne(jobObject,'requirements.backgroundCheck');
    let reqLanguages = !validations.validateOne(jobObject,'requirements.languages');
    let oshaCheck = !Match.test(jobObject.requirements.osha, OshaSchema);
    let socialCheck = !Match.test(jobObject.requirements.socialPref, SocialSchema);
    let lengthToCheck = jobObject.professionals.length;
    let events = [];


    for(let i =0;i<lengthToCheck;++i){
        let eventtoMake= EventSchema.clean({});
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

    let smallTime =largeTime;
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
      let protitle = !proValidation.validateOne(jobObject.professionals[i],'responsibilities');
      let propay = !proValidation.validateOne(jobObject.professionals[i],'pay');
      let proworker = !proValidation.validateOne(jobObject.professionals[i],'numWorkers');

      let eventTitle = !eventValidation.validateOne(events[i],'title.text');
      let eventRes = !eventValidation.validateOne(events[i],'responsibilities.text');
      let eventStart = !eventValidation.validateOne(events[i],'startAt');
      let eventEnd =  !eventValidation.validateOne(events[i],'endAt');


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



    if( visorNumb ||visorName || jobTypes || jobTitle || locationName ||
      locLat || locLng || reqLicense || reqBackground || reqLanguages ||
      oshaCheck  || socialCheck || proissue || eventissue
    ) throw new Meteor.Error('403',Errors);

    return{
      job : jobObject,
      events :  events
    };






  },

  sendNotificationsToPotential(jobObject){


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

      if(Roles.userIsInRole(this.userId,'free-job')){
        Roles.removeUsersFromRoles(this.userId,'free-job');
      }
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

  if(updateJob.additionText.text != DEFAULT ){
    prevJob.additionText.text = updateJob.additionText.text
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
  if(updateJob.supervisor.name != prevJob.supervisor.name){
    prevJob.supervisor.name = updateJob.supervisor.name;
  }
  if(updateJob.supervisor.phone != prevJob.supervisor.phone){
    prevJob.supervisor.phone = updateJob.supervisor.phone;
  }

  if(requirements.backgroundCheck != prevJob.requirements.backgroundCheck){
    prevJob.requirements.backgroundCheck = requirements.backgroundCheck;
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
  if(updateJob.supervisor.name != prevJob.supervisor.name){
    prevJob.supervisor.name = updateJob.supervisor.name;
  }
  if(updateJob.supervisor.phone != prevJob.supervisor.phone){
    prevJob.supervisor.phone = updateJob.supervisor.phone;
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
    console.log( prevJob.eventInfo[idx]);
    let selector2 = {_id: prevJob.eventInfo[idx],owner:this.userId};
      updateEvent[idx].jobId = jobId;
      Event.update( selector2,{$set:updateEvent[idx]});
  }
},

  applyForJob(jobId){
    if(!this.userId || !Roles.userIsInRole(this.userId,PROFESSIONAL)) throw new Meteor.Error('401',NOTAUTH);

    let job = Job.findOne({_id: jobId});
    if(!job)throw new Meteor.Error('403','Job was not found');

    if (job.declineemployeeIds.includes(this.userId)) return;
    if(job.admitemployeeIds.includes(this.userId)) return;
    if (job.applyemployeeIds.includes(this.userId)) {
      return;
    }else{
      job.applyemployeeIds.push(this.userId);
      let noCopies = new Set(job.applyemployeeIds);
      job.applyemployeeIds = Array.from(noCopies);
    }

    let selector = {_id: jobId};

    Job.update(selector,{$set: job});

    let notify = NotificationSchema.clean({});
    notify.toWhomst = job.employerId;
    notify.description = "Someone applied for the job you posted at "+ job.location.locationName;
    notify.jobId = jobId;
    notify.href = "job/"+jobId;

    Meteor.call('createNotification',notify);



  },
  declineJob(jobId){
    if(!this.userId || !Roles.userIsInRole(this.userId,PROFESSIONAL)) throw new Meteor.Error('401',NOTAUTH);

    let job = Job.findOne({_id: jobId});
    if(!job)throw new Meteor.Error('403','Job was not found');

    if(job.applyemployeeIds.includes(this.userId)){
      let idx = job.applyemployeeIds.indexOf(this.userId);
      if (idx != -1) { //Should always be true
          job.applyemployeeIds.splice(idx,1);
      }
    }
    if (job.admitemployeeIds.includes(this.userId)) {
      let idx = job.admitemployeeIds.indexOf(this.userId);
      if (idx != -1) { //Should always be true
          job.admitemployeeIds.splice(idx,1);
      }
    }
    if (job.declineemployeeIds.includes(this.userId)) {
      return;
    }else{
      job.declineemployeeIds.push(this.userId);
      let noCopies = new Set(job.declineemployeeIds);
      job.declineemployeeIds = Array.from(noCopies);
    }

    let selector = {_id: jobId};

    Job.update(selector,{$set: job});
  },
  declineEmployee(jobId,employeeId){
      if(!this.userId || !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);

      let job = Job.findOne({_id: jobId});
      if(!job)throw new Meteor.Error('403','Job was not found');

      if(job.applyemployeeIds.includes(employeeId)){
        let idx = job.applyemployeeIds.indexOf(employeeId);
        if (idx != -1) { //Should always be true
            job.applyemployeeIds.splice(idx,1);
        }
      }
      if (job.admitemployeeIds.includes(employeeId)) {
        let idx = job.admitemployeeIds.indexOf(employeeId);
        if (idx != -1) { //Should always be true
            job.admitemployeeIds.splice(idx,1);
        }
      }
      if (job.declineemployeeIds.includes(employeeId)) {
        return;
      }else{
        job.declineemployeeIds.push(employeeId);
        let noCopies = new Set(job.declineemployeeIds);
        job.declineemployeeIds = Array.from(noCopies);
      }

      let selector = {_id: jobId};

      Job.update(selector,{$set: job});
  },
  admiteEmployee(jobId,employeeId){
    if(!this.userId || !Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);

    let job = Job.findOne({_id: jobId});
    if(!job)throw new Meteor.Error('403','Job was not found');

    if(job.applyemployeeIds.includes(employeeId)){
      let idx = job.applyemployeeIds.indexOf(employeeId);
      if (idx != -1) { //Should always be true
          job.applyemployeeIds.splice(idx,1);
      }
    }
    if(job.declineemployeeIds.includes(employeeId)){ //Shouldn't happen but incase
      let idx = job.declineemployeeIds.indexOf(employeeId);
      if (idx != -1) { //Should always be true
          job.declineemployeeIds.splice(idx,1);
      }
    }
    if (job.admitemployeeIds.includes(employeeId)) {
      return;
    }else{
      job.admitemployeeIds.push(employeeId);
      let noCopies = new Set(job.admitemployeeIds);
      job.admitemployeeIds = Array.from(noCopies);
    }

    let notify = NotificationSchema.clean({});
    notify.toWhomst = employeeId;
    notify.description = "You have been admitted to the job at "+ job.location.locationName;
    notify.jobId =jobId;
    notify.href = "job/"+jobId;

    Meteor.call('createNotification',notify);


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
    let notify = NotificationSchema.clean({});

    let jobRemove = Job.findOne({_id:jobId,employerId:this.userId});
    notify.description = 'The Job located at '+  jobRemove.location.locationName+
    ' has been deleted';
    let peopleApplied = jobRemove.applyemployeeIds;
    let peopleMatch = jobRemove.admitemployeeIds;
    let totalPeople = peopleApplied.concat(peopleMatch);
    for (let i = 0; i < totalPeople.length; i++){
      notify.toWhomst = totalPeople[i];
      Meteor.call('createNotification',notify);
    }

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

  }
});
