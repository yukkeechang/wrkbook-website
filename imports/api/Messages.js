import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import {NOTAUTH} from './Users';
import MessagesSchema from './Schemas/messageSchema';
import ChannelSchema from './Schemas/channelSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';

/** @module Message */
/**
  * @summary Defines the Message collection,
  * has the basic MongoBD functions(insert,update,remove,etc)
  */
const Message = new Mongo.Collection('messages');
/**
  * @summary Defines the Channel collection,
  * has the basic MongoBD functions(insert,update,remove,etc)
  */
const Channel = new Mongo.Collection('channels');

Message.attachSchema(MessagesSchema);
Channel.attachSchema(ChannelSchema);
if ( Meteor.isServer ) {
  /**
  *
  * @summary Publishes all new notifications for a user
  * @publication {Notification} notifications-for-user User
  * @function
  * @name notifications-for-user
  * @returns {MongoBD.cursor|NULL} cursor point to all valid notifications objects. Null if not a signed in user
  *
  */
  Meteor.publish('channels-for-job',function(jobId){
    if(typeof jobId != 'undefined'){
      return Channel.find({jobId:jobId});
    }
    return null;
  });
  Meteor.publish('unread-channels',function(jobId){
    return Message.find({channelId:{$exists:true} ,jobId:jobId,to:{$exists:false},seen:{$nin:[this.userId]}},{fields:{channelId:1}});
  });
  Meteor.publish('unread-messages-job',function(jobId){
    return Message.find({channelId:{$exists:false} ,jobId:jobId,to:{$exists:true},seen:false});
  });
  Meteor.publish('messages-for-channel',function(jobId,channell){
    let channel  = Channel.findOne({jobId:jobId,name:channell});
    if(channel){
      return Message.find({channelId:channel._id ,jobId:jobId,to:{$exists:false}});
    }
    return null;
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
            {jobId:{$in: currentJobs},seen: {$nin:[this.userId]},channelId:{$exists:true} }]

      });
    }
    else if( Roles.userIsInRole(this.userId,CONTRACTOR)){
      let currentJobs = Meteor.call('findActiveJobsEmployer');
      return Message.find({
        $or:[{jobId:{$in: currentJobs},seen: false,to:this.userId},
            {jobId:{$in: currentJobs},seen: {$nin:[this.userId]},channelId:{$exists:true} }]
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
    console.log(newMessage);
    if (!!newMessage.to) {
      newMessage.seen = false;
    }else{
      newMessage.seenGroup=[this.userId];
    }
    let validation = MessagesSchema.namedContext('Message');
    if(!validation.validate(newMessage))throw new Meteor.Error('403','THINGS');
    Message.insert(newMessage);
  },
  getMessage(messageId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    return Message.findOne({_id:messageId});

  },
  updateSeenStatus(messageId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(messageId,String);
    let message = Message.findOne({_id:messageId});
    if(!message)return;
    if (!!message.to) {
      message.seen = message.to === this.userId ? false: message.seen;
    }else{
      message.seenGroup.push(this.userId);
      let noCopies = new Set(message.seenGroup);
      message.seenGroup= Array.from(noCopies);
    }
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

export {Channel, Message};
