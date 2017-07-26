import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import JobSchema  from './Schemas/jobSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
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

  // this.ready();
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






});
/*
*
* Publishes all Jobs that was made by a employer
* @param {String} employeerId is the user ID of the employer
* @returns {Array} that contains all jobs made by a specific user.
*/
Meteor.publish('job-post-employer',function(employeerId){
  check(employeerId,String);
  // this.ready();
  // this.stop()
  return Job.find({employerId: employeerId});
});

Meteor.publish('job-post-admitted',function(employeeId){
  check(employeeId,String);
  let hackIdThing = [];
  hackIdThing[0] = employeeId;
  // this.ready();
  // this.stop();
  console.log(hackIdThing);
  let sh =Job.find({admitemployeeIds: {$in: hackIdThing}});
  console.log(sh.fetch());
  return sh;
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

    if(!this.userId) throw new Meteor.Error('401',"Login required");
    newJob.employerId = this.userId;
    newJob.createdAt = new Date();
    newJob.updateAt = new Date();


    check(newJob, JobSchema);

    Job.insert(newJob);


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
    if(!this.userId) throw new Meteor.Error('401',"Login required");


    // check(updateJob.,JobSchema);

    let prevJob = Job.findOne({_id: jobId});
    if(!(prevJob)) return;

    if(updateJob.title.text != DEFAULT ){
      prevJob.title.text = updateJob.title.text
    }
    if(updateJob.description.text != DEFAULT ){
      prevJob.description.text = updateJob.description.text
    }
    if(updateJob.additionText.text != DEFAULT ){
      prevJob.additionText.text = updateJob.additionText.text
    }
    if(updateJob.pay >0){
      prevJob.pay = updateJob.pay;
    }
    if(updateJob.jobTypes.length >0){
      prevJob.jobTypes = updateJob.jobTypes;
    }
    if(prevJob.status != updateJob.status){
            prevJob.status = updateJob.status;
    }


    if(updateJob.requirements.languages.length > 0){
      prevJob.requirements.languages = updateJob.requirements.languages;

      prevJob.requirements.osha = updateJob.requirements.osha;
      prevJob.requirements.driverLicense = updateJob.requirements.driverLicense;
      prevJob.requirements.backgroundCheck = updateJob.requirements.backgroundCheck;
      prevJob.requirements.highGed = updateJob.requirements.highGed;
    }
    if(prevJob.location.locationName != DEFAULT){
      prevJob.location.locationName =
      updateJob.location.locationName;

      prevJob.location.latitude =
      updateJob.location.latitude;

      prevJob.location.longitude =
      updateJob.location.longitude;
    }

    let selector = {_id: jobId};

    Job.update(selector,{$set: prevJob});
  },
  updateEmployeeIds(jobId,applyIds,declineIds,admitIds){

    if(!this.userId) throw new Meteor.Error('401',"Login required");


    // check(updateJob.,JobSchema);

    let prevJob = Job.findOne({_id: jobId});
    if(!(prevJob)) return;

    prevJob.applyemployeeIds = applyIds;
    prevJob.admitemployeeIds = admitIds;
    prevJob.declineemployeeIds = declineIds;
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
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    Job.remove({_id: jobId, empolyeerId: this.userId});
  }
});
