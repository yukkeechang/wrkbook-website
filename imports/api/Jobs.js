import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

import JobSchema  from './Schemas/jobSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
Job = new Mongo.Collection('jobs');
Job.attachSchema(JobSchema);

const imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images',{
  stores: [imageStore]
});

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});


Meteor.publish('job-post', function(employee){

  this.ready();
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
Meteor.publish('job-post-employer',function(employeerId){
  this.ready();

  return Job.find({employerId: employeerId});
});
Meteor.publish('images', function(){
  return Images.find();
 });

const objectWithoutKey = (object, key) => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
}
Meteor.methods({
  createJob(newJob){

    if(!this.userId) throw new Meteor.Error('401',"Login required");
    newJob.employerId = this.userId;
    newJob.createdAt = new Date();
    newJob.updateAt = new Date();


    check(newJob, JobSchema);

    Job.insert(newJob, function(err,ress){

      if(err){
        throw new Meteor.Error('BADBADNOTGOOD','Could not insert document');
      }else if (ress) {


      }
    });


  },
  updateJob(jobId,updateJob){
    check(jobId,String);
    let optional = Match.Optional;
    if(!this.userId) throw new Meteor.Error('401',"Login required");


    let updateJobwithoutid = {};
    if(!('undefined' === typeof(updateJob._id))){
      updateJobwithoutid = objectWithoutKey(updateJob,'_id');
    }else {
      updateJobwithoutid = updateJob;
    }
    check(updateJobwithoutid,JobSchema);

    let prevJob = Job.findOne({_id: jobId});
    if(!(prevJob)) return;
    if(updateJob.applyemployeeIds.length > 0){
      prevJob.applyemployeeIds = updateJob.applyemployeeIds;
    }
    if(updateJob.admitemployeeIds.length > 0){
      prevJob.admitemployeeIds = updateJob.admitemployeeIds;
    }
    if(updateJob.declineemployeeIds.length > 0){
      prevJob.declineemployeeIds = updateJob.declineemployeeIds;
    }
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
    if(updateJob.status.length > 0){
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
  removeJob(jobId){
    check(jobId,String);
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    Job.remove({_id: jobId, empolyeerId: this.userId});
  }
});
