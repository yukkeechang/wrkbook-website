import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import {NOTAUTH} from './Users';
import MessagesSchema from './Schemas/messageSchema';
import ChannelSchema from './Schemas/channelSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';


Message = new Mongo.Collection('messages');
Channel = new Mongo.Collection('channels');

Message.attachSchema(MessagesSchema);
Channel.attachSchema(ChannelSchema);
if ( Meteor.isServer ) {
  Meteor.publish('channels-for-job',function(jobId){
    if(typeof jobId != 'undefined'){
      return Channel.find({jobId:jobId});
    }
  });

  //Hange function
  Meteor.publish('messages-for-channel',function(jobId,channell){
    let channel  = Channel.findOne({jobId:jobId,name:channell});
    if(!!channel){
      return Message.find({channelId:channel._id ,jobId:jobId,to:{$exists:false}});
    }
  });
  Meteor.publish('all-messages-for-job',function (jobId) {
    return Message.find({$or:[{jobId:jobId,to:this.userId},
        {jobId:jobId,channelId:{$exists:true} }]});
  });
  Meteor.publish('messages-conversation',function(userId,jobId){
    return Message.find({
      $or:[{channelId:{$exists:false},jobId:jobId,owner:this.userId,to:userId},
            {channelId:{$exists:false},jobId:jobId,owner:userId,to:this.userId}]});
  });
  Meteor.publish('unread-messages',function () {
    if( Roles.userIsInRole(this.userId,PROFESSIONAL)){
      let currentJobs = Meteor.call('findActiveJobsEmployee');
      return Message.find({
        $or:[{jobId:{$in: currentJobs},seen: false,to:this.userId},
            {jobId:{$in: currentJobs},seen: false,channelId:{$exists:true} }]

      });
    }
    else if( Roles.userIsInRole(this.userId,CONTRACTOR)){
      let currentJobs = Meteor.call('findActiveJobsEmployer');
      return Message.find({
        $or:[{jobId:{$in: currentJobs},seen: false,to:this.userId},
            {jobId:{$in: currentJobs},seen: false,channelId:{$exists:true} }]
      });
    }
    else{
      this.stop();
      return null;
    }

  });
}

Meteor.methods({

  createMessage(newMessage){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    newMessage.owner= this.userId;
    newMessage.timestamp = new Date();
    newMessage.seen= false;
    let validation = MessagesSchema.namedContext('Message');
    if(!validation.validate(newMessage))throw new Meteor.Error('403','THINGS');
    Message.insert(newMessage);
  },
  getChannel(channelId){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      return Channel.findOne({_id:channelId});
  },
  createChannel(newChannel){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let validation = ChannelSchema.namedContext('Channel');
    if(!validation.validate(newChannel))throw new Meteor.Error('403','THINGS');
    Channel.insert(newChannel);
  }
});
