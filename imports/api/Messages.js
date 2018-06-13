import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import {NOTAUTH} from './Users';
import MessagesSchema from './Schemas/messageSchema';
import ChannelSchema from './Schemas/channelSchema';


Message = new Mongo.Collection('messages');
Channel = new Mongo.Collection('channels');

Message.attachSchema(MessagesSchema);
Channel.attachSchema(ChannelSchema);
if ( Meteor.isServer ) {
  Meteor.publish('channels-for-job',function(jobId){
    return Channel.find({jobId:jobId});
  });
  Meteor.publish('messages-for-channel',function(jobId,channel){
    let channel  = Channel.findOne({jobId:jobId,channel:channel});
    return Message.find({channelId:channel._id ,jobId:jobId,to:{$exists:false}});
  });
  Meteor.publish('messages-from-user',function(userId,jobId){
    return Message.find({
      $or:[{channel:{$exists:false},jobId:jobId,owner:this.userId,to:userId},
            {channel:{$exists:false},jobId:jobId,owner:userId,to:this.userId}]});
  });
}

Meteor.methods({

  createMessage(newMessage){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    newMessage.owner= this.userId;
    newMessage.timestamp = new Date();
    let validation = MessagesSchema.namedContext('Message');
    if(!validation.validate(newMessage))throw new Meteor.Error('403','THINGS');
    Message.insert(newMessage);
  }
  createChannel(newChannel){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    let validation = ChannelSchema.namedContext('Channel');
    if(!validation.validate(newChannel))throw new Meteor.Error('403','THINGS');
    Channel.insert(newChannel);
  }
});
