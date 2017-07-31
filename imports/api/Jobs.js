import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import JobSchema  from './Schemas/jobSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users'
import { Roles } from 'meteor/alanning:roles';


//Defines a collection named jobs
Job = new Mongo.Collection('jobs');
Job.attachSchema(JobSchema);


/*
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
/*
*
* Publishes all Jobs that was made by a employer
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

Meteor.publish('job-post-admitted',function(){

  if(Roles.userIsInRole(this.userId,PROFESSIONAL)){
    let hackIdThing = [];
    hackIdThing[0] = this.userId;
    // this.ready();
    // this.stop();

    let sh =Job.find({admitemployeeIds: {$in: hackIdThing}});

    return sh;
  }else{
    this.stop();
    return ;
  }

});
Meteor.methods({
  /*
  Inserts a Job into the database. That Job must follow the format of
  JobSchema.
  @param {Object} new must match to the JobSchema
  @throw {Meteor.Error} if the object passed does not match the Schema you will
  get a match error or if the user calling the method is not signin a Meteor.Error
  will be called.
  */

  createJob(newJob){

    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);


    if(Roles.userIsInRole(this.userId,CONTRACTOR) ){
      newJob.employerId = this.userId;
      newJob.createdAt = new Date();
      newJob.updateAt = new Date();


      check(newJob, JobSchema);

      Job.insert(newJob);
    }else{
      throw new Meteor.Error('401',NOTAUTH);
    }





  },
  /*
  Updates a JobPost that was already inserted into the database. If the JobPost
  object contains default values no reassignments will occur. If the jobId does
  not return a value object the function will exit.
  @param {String} jobId is the Id of the jobPost
  @param {Object} JobPost must match to the ReviewSchema
  @throw {Meteor.Error} if the object passed does not match the Schema you will
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

    if(updateJob.title.text != DEFAULT ){
      prevJob.title.text = updateJob.title.text
    }
    if(updateJob.description.text != DEFAULT ){
      prevJob.description.text = updateJob.description.text
    }
    if(updateJob.additionText.text != DEFAULT ){
      prevJob.additionText.text = updateJob.additionText.text
    }
    if(updateJob.startAt != prevJob.startAt){
      prevJob.startAt = updateJob.startAt;
    }
    if(updateJob.startAt != prevJob.endAt){
      prevJob.endAt = updateJob.endAt;
    }
    if(updateJob.pay.length >0){
      prevJob.pay = updateJob.pay;
    }
    if(updateJob.numWorker != prevJob.numWorker){
      prevJob.numWorker = updateJob.numWorker;
    }
    if(updateJob.jobTypes.length >0){
      prevJob.jobTypes = updateJob.jobTypes;
    }
    if(prevJob.isOpen != updateJob.isOpen){
        prevJob.isOpen = updateJob.isOpen;
    }

    if(requirements.languages.length > 0){
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
  updateEmployeeIds(jobId,empolyeeIds){

    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    // check(updateJob.,JobSchema);
    if(!isPRO|| !isCON ) throw new Meteor.Error('401',NOTAUTH);
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
  /*
  *
  Deletes a jobPost from the database using its ID.
  @param {String} jobId is the Id of the jobPost
  @throw {Meteor.Error} if the jobId is not a string a match error will be
  thrown Or if the user calling the function is not sign an 401 error will be thrown
  */
  removeJob(jobId){
    check(jobId,String);
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    if(!Roles.userIsInRole(this.userId,CONTRACTOR)) throw new Meteor.Error('401',NOTAUTH);
    Job.remove({_id: jobId, employerId: this.userId});
  }
});
