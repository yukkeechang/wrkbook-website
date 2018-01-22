import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import NotificationSchema from './Schemas/notificationSchema';
import {NOTAUTH} from './Users';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';

/**
  @global
  @description Defines the notifications collection,
  has the basic MongoBD functions(insert,update,remove,etc)
**/
Notification = new Mongo.Collection('notifications');
Notification.attachSchema(NotificationSchema);

Meteor.publish('notifications-for-user',function(){
  if(Roles.userIsInRole(this.userId,CONTRACTOR)||
  Roles.userIsInRole(this.userId,PROFESSIONAL)){
    return Notification.find({toWhomst: this.userId,seen:false});
  }else{
    this.stop();
    return;
  }
});


Meteor.methods({

  createNotification(newNotify){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    newNotify.createdAt = new Date();
    check(newNotify,NotificationSchema);
    Notification.insert(newNotify);
  },

  updateNotification(notifyId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(notifyId,String);
    let notification = Notification.findOne({_id: notifyId,toWhomst:this.userId});
    if(!(notification)) return;
    notification.seen = true;
    Notification.update({_id:notifyId},{$set: notification});
  },
  deleteNotificationsForJob(jobId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(jobId,String);
    Notification.remove({jobId:jobId});
  }

});
