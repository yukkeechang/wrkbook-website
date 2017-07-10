import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

var schema = {
  _id: String,
  empolyeerId: String,
  empolyeeIds: Object,
  title: String,
  description: String,
  addText: String,
  startAt: Date,
  endAt: Date,
  pay: Number,
  location: String,
  createdAt: Date,
  updateAt: Date,
  tags: Object,
  status: String
};

Job = new Mongo.Collection('Jobs');

Meteor.methods({
  createJob(newJob){

    if(!this.userId) throw new Meteor.Error('401',"Login required");
    newJob.empolyeerId = this.userId;
    newJob.createdAt = new Date();
    newJob.updateAt = new Date();
    newJob.empolyeeIds = {};

    check(newJob, _.omit(schema, '_id'));

    let titleEmpty = newJob.title.length > 0 ? false:true ;
    let titleLong = newJob.title.length < 251 ? false:true;


    let descriptionEmpty = newJob.description.length > 0 ? false:true;
    let descriptionLong = newJob.description.length < 251 ? false:true;


    let textEmpty = newJob.addText.length > 0 ? false:true;
    let textLong = newJob.addText.length < 251 ? false:true;



    let pWrong = !isNaN(newJob.pay) && newJob.pay > 0 ? false: true;

    let Errors ={
      titleEmpty: titleEmpty,
      titleLong: titleLong,

      descriptionEmpty: descriptionEmpty,
      descriptionLong: descriptionLong,

      textEmpty: textEmpty,
      textLong: textLong,

      pWrong: pWrong
    };

    if(titleEmpty|| titleLong||  descriptionEmpty||
      descriptionLong || textEmpty || textLong ||
        pWrong ) throw new Meteor.Error('403',Errors);
    Job.insert(newJob, function(err,ress){

      if(err){
        throw new Meteor.Error('BADBADNOTGOOD','Could not insert document');
      }else if (ress) {

         for (var channel in newJob.tags) {
           let channelName = newJob.tags[channel];
           console.log(channelName);
           Meteor.publish(channelName, function(){
             console.log(ress);
             this.ready();
             return Job.find({ _id: ress});
           });
         }

      }
    });


  },
  findJobsbyTag(tag){
    if(!this.userId) throw new Meteor.Error('401',"Login required");
    let tagEmpty = tag.length >  0 ? false :true ;
    if(tagEmpty) throw new Meteor.Error('403',"Not valid tag");

    let ress = Job.find({tags: tag}).fetch();;

    console.log(ress);
    return ress;


  },
  findJobsbyEmpolyeerId(empolyeer){
    if(!this.userId) throw new Meteor.Error('401',"Login required");
    let idEmpty = empolyeer.length >  0 ? false :true ;
    if(tagEmpty) throw new Meteor.Error('403',"Not Valid Employeer ID");

    let ress = Job.find({ empolyeerId: empolyeer}).fetch();

    console.log(ress);
    return ress;

  },
  updateJob(jobId,updateJob){
    check(jobId,String);
    let optional = Match.Optional;
    if(!this.userId) throw new Meteor.Error('401',"Login required");
    updateJob.updateAt = new Date();

    check(updateJob,{
      updateAt: schema.updateAt,
      title: optional(schema.title),
      description: optional(schema.description),
      startAt: optional(schema.startAt),
      endAt: optional(schema.endAt),
      pay: optional(schema.pay),
      location: optional(schema.location),
      tags: optional(schema.tags),
      status: optional(schema.status)
    });

    let selector = {_id: jobId, empolyeerId: this.userId};

    Job.update(selector,{$set: updateJob});
  },
  removeJob(jobId){
    check(jobId,String);
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    Job.remove({_id: jobId, empolyeerId: this.userId});
  }
});
