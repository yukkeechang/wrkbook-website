import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { NOTAUTH } from './Users';
import NotificationSchema from './Schemas/notificationSchema';
import { PROFESSIONAL } from './Schemas/employeeSchema';
import { CONTRACTOR } from './Schemas/employerSchema';

/** @module Notification */
/**
  * @summary Defines the notifications collection,
  * has the basic MongoBD functions(insert,update,remove,etc)
  */
Notification = new Mongo.Collection('notifications');
Notification.attachSchema(NotificationSchema);
if (Meteor.isServer) {
  /**
  *
  * @summary Publishes all new notifications for a user
  * @publication {Notification} notifications-for-user User
  * @function
  * @name notifications-for-user
  * @returns {MongoBD.cursor|NULL} cursor point to all valid notifications objects. Null if not a signed in user
  *
  */
  Meteor.publish('notifications-for-user', function () {
    if (Roles.userIsInRole(this.userId, CONTRACTOR) ||
    Roles.userIsInRole(this.userId, PROFESSIONAL)) {
      return Notification.find({ toWhomst: this.userId, seen: false });
    } else {
      this.stop();
      return;
    }
  });
  /**
  *
  * @summary Publishes all  notifications for a user regaurdless if the notification has been seen
  * @publication {Notification} all-notifications-for-user User
  * @function
  * @name all-notifications-for-user
  * @returns {MongoBD.cursor|NULL} cursor point to all valid notifications objects. Null if not a signed in user
  *
  */
  Meteor.publish('all-notifications-for-user', function () {
    if (Roles.userIsInRole(this.userId, CONTRACTOR) ||
    Roles.userIsInRole(this.userId, PROFESSIONAL)) {
      return Notification.find({ toWhomst: this.userId });
    } else {
      this.stop();
      return;
    }
  });

  Meteor.publish('view-deleted-job',function (jobId) {
    if (Roles.userIsInRole(this.userId, CONTRACTOR) ||
    Roles.userIsInRole(this.userId, PROFESSIONAL)) {
      const hrefLink = `/deleted-job/${jobId}`;
      return Notification.find({ toWhomst: this.userId, href: hrefLink });
    } else {
      this.stop();
      return;
    }
  });
}

Meteor.methods({
/**
 * [createNotification description]
 * @param  {[type]} newNotify [description]
 * @return {[type]}           [description]
 */
  createNotification(newNotify){
    newNotify.createdAt = new Date();
    let validation = NotificationSchema.namedContext('Notification');
    if (!validation.validate(newNotify)) throw new Meteor.Error('403', 'THINGS');
    Notification.insert(newNotify);
  },
  /**
   * [updateNotification description]
   * @param  {[type]} notifyId [description]
   * @return {[type]}          [description]
   */
  updateNotification(notifyId){
    if (!this.userId) throw new Meteor.Error('401', NOTAUTH);
    check(notifyId,String);
    let notification = Notification.findOne({ _id: notifyId, toWhomst: this.userId });
    if (!(notification)) return;
    notification.seen = true;
    Notification.update({ _id: notifyId}, {$set: notification });
  },
  /**
   * [deleteNotificationsForJob description]
   * @param  {[type]} jobId [description]
   * @return {[type]}       [description]
   */
  deleteNotificationsForJob(jobId){
    if (!this.userId) throw new Meteor.Error('401', NOTAUTH);
    check(jobId,String);
    Notification.remove({ jobId:jobId, typeNotifi:"APPLIED" });
    Notification.remove({ jobId:jobId, typeNotifi:"HIRED" });
    Notification.remove({ jobId:jobId, typeNotifi:"MATCH" });
  }
});
