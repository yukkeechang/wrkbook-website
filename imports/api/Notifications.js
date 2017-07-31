import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import NotificationSchema from './Schemas/notificationSchema';
import {NOTAUTH} from './Users';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';

Notification = new Mongo.Collection('notifications');
Notification.attachSchema(NotificationSchema);

Meteor.publish('employer-notify',function(){
  if(Roles.userIsInRole(this.userId,CONTRACTOR)){
    return Notification.find({employerId: this.userId});
  }else{
    this.stop();
    return;
  }
});
Meteor.publish('employee-notify',function(){
  if(Roles.userIsInRole(this.userId,PROFESSIONAL)){
    return Notification.find({employeeId: this.userId});
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
});
