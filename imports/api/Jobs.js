import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import JobSchema  from './Schemas/jobSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import EventSchema from './Schemas/eventSchema';
import NotificationSchema from './Schemas/notificationSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import { Roles } from 'meteor/alanning:roles';

var newJobEventCheck ={
  job: Object,
  eventz: [Object]
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
  check(employee,EmployeeSchema);
  if(Roles.userIsInRole(this.userId,PROFESSIONAL)){

    let bearing = 45;
    const meterDegrees = 111111;
    const mileToMeters= 1609.34;
    let jobTitle = employee.jobTitle.texts;
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




    let lat_top = lat + northDisplacement;
    let lat_bot = lat + southDisplacement;
    let lng_top = lng + eastDisplacement;
    let lng_bot = lng + westDisplacement;


      return Job.find({ 'jobTypes.texts' : {$in : jobTitle},
                        'location.latitude': {$gte: lat_bot, $lt: lat_top},
                        'location.longitude': {$gte: lng_bot , $lt: lng_top}
                      });
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
    return Job.find({employerId: this.userId});
  }else{
    this.stop();
    return ;
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
    return Job.find({admitemployeeIds: {$in: hackIdThing}});;
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
  return Job.find({});
});
Meteor.methods({
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
      check(newJobEvent,newJobEventCheck);
      let job = newJobEvent.job;
      let eventz = newJobEvent.eventz;
      job.employerId = this.userId;
      job.createdAt = new Date();
      job.updateAt = new Date();
      check(job,JobSchema);
      let id1 = Job.insert(job);
      let ids2 =[];
      for (let i = 0; i < eventz.length; i++) {
        eventz[i].owner = this.userId;
        eventz[i].createdAt = new Date();
        check(eventz[i],EventSchema);
        ids2[i] =  Event.insert(eventz[i]);
        eventz[i].jobId = id1;
        let selector2 = {_id: ids2[i], owner: this.userId};
        Event.update(selector2,{$set:eventz[i]});
      }

      job.eventInfo= ids2;

      let selector1 = {_id: id1, employerId: this.userId};
      Job.update(selector1,{$set: job});


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
  updateJob(jobId,updateJob){
    check(jobId,String);
    let optional = Match.Optional;
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    if( !(Roles.userIsInRole(this.userId,CONTRACTOR)) ) throw new Meteor.Error('401',NOTAUTH);;

    check(updateJob,JobSchema);

    let prevJob = Job.findOne({_id: jobId});
    if(!(prevJob)) return;
    let requirements = updateJob.requirements;


    if(updateJob.additionText.text != DEFAULT ){
      prevJob.additionText.text = updateJob.additionText.text
    }
    if(updateJob.eventInfo.length != prevJob.eventInfo.length){
      prevJob.eventInfo = updateJob.eventInfo;
    }
    if(updateJob.pay.length > 0){
      prevJob.pay = updateJob.pay;
    }
    if(updateJob.numWorker.length >0 ){
      prevJob.numWorker = updateJob.numWorker;
    }
    if(updateJob.jobTypes.length > 0){
      prevJob.jobTypes = updateJob.jobTypes;
    }
    if(prevJob.isOpen != updateJob.isOpen){
        prevJob.isOpen = updateJob.isOpen;
    }

    if(requirements.languages.length >0){
      prevJob.requirements.languages = requirements.languages;

    }
    if(requirements.highGed != prevJob.requirements.highGed){
      prevJob.requirements.highGed = requirements.highGed;
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
    if(requirements.supervisor.name != prevJob.requirements.supervisor.name){
      prevJob.requirements.supervisor.name = requirements.supervisor.name;
    }
    if(requirements.supervisor.phone != prevJob.requirements.supervisor.phone){
      prevJob.requirements.supervisor.phone = requirements.supervisor.phone;
    }

    if(updateJob.location.locationName != DEFAULT){
      prevJob.location.locationName =
      updateJob.location.locationName;

      prevJob.location.latitude =
      updateJob.location.latitude;

      prevJob.location.longitude =
      updateJob.location.longitude;
    }
    prevJob.updateAt = new Date();
    let selector = {_id: jobId, employerId: this.userId};

    Job.update(selector,{$set: prevJob});
  },
  /**
  Updates the employeeIds of a job, with a jobId.
  @param {String} jobId is the Id of the jobPost
  @param {Object} object of employee ids in different fields
  @throws {Meteor.Error} if the jobId is not a string a match error will be
  thrown Or if the user calling the function is not sign an 401 error will be thrown
  */
  updateEmployeeIds(jobId,empolyeeIds){

    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    // check(updateJob.,JobSchema);
    if(!isPRO && !isCON) throw new Meteor.Error('401',NOTAUTH);

    let prevJob = Job.findOne({_id: jobId});
    if(!(prevJob)) throw new Meteor.Error('403','Job was not found');
    if(!('undefined' === typeof(empolyeeIds.apply))){
          prevJob.applyemployeeIds = empolyeeIds.apply;
    }
    if(!('undefined' === typeof(empolyeeIds.decline))){
      prevJob.declineemployeeIds = empolyeeIds.decline;
    }
    if(!('undefined' === typeof(empolyeeIds.admit))){
      prevJob.admitemployeeIds = empolyeeIds.admit;
    }



    let selector = {_id: jobId};

    Job.update(selector,{$set: prevJob});

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
