import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import { NOTAUTH } from "./Users";
import NotificationSchema from "./Schemas/notificationSchema";
import { PROFESSIONAL } from "./Schemas/employeeSchema";
import { CONTRACTOR } from "./Schemas/employerSchema";

const MAX_TODOS = 1000;
/** @module Notification */
/**
 * @summary Defines the notifications collection,
 * has the basic MongoBD functions(insert,update,remove,etc)
 */
const Notification = new Mongo.Collection("notifications");
Notification.attachSchema(NotificationSchema);
if (Meteor.isServer) {
  /**
   *
   * Publishes all new notifications for a user.
   * This subscription does not have any parameters.
   * @publication {Notification} notifications-for-user User
   * @function
   * @name notifications-for-user
   * @returns {MongoBD.cursor|NULL} cursor point to all valid notifications objects. Null if not a signed in user
   *
   */
  Meteor.publish("notifications-for-user", function() {
    if (
      Roles.userIsInRole(this.userId, CONTRACTOR) ||
      Roles.userIsInRole(this.userId, PROFESSIONAL)
    ) {
      return Notification.find({ toWhomst: this.userId, seen: false });
    } else {
      this.stop();
      return;
    }
  });
  /**
   *
   * Publishes all  notifications for a user regardless if the notification has been seen.
   * The notifications will be pulled in no particular order. It will just notifications for the specific user.
   * The user has to fall into one of the two roles (CON/PRO) to be authorized to use this function.
   * @publication {Notification} all-notifications-for-user User
   * @function
   * @name all-notifications-for-user
   * @returns {MongoBD.cursor|NULL} cursor point to all valid notifications objects. Null if not a signed in user
   *
   */
  Meteor.publish("all-notifications-for-user", function() {
    if (
      Roles.userIsInRole(this.userId, CONTRACTOR) ||
      Roles.userIsInRole(this.userId, PROFESSIONAL)
    ) {
      const options = {
        sort: {createdAt: -1}
      };
      return Notification.find({ toWhomst: this.userId },options);
    } else {
      this.stop();
      return;
    }
  });
  /**
   *  This will publish a notification with the job info for a deleted job.
   *  Before we remove a job from the database we store a portion of the info in a notification.
   *  This is done so that a user can see the basic info of the deleted job.
   * @publication {Notification} all-notifications-for-user User
   * @function
   * @name view-deleted-job
   * @returns {MongoBD.cursor|NULL} cursor point to all valid notifications objects. Null if not a signed in user
   */
  Meteor.publish("view-deleted-job", function(jobId) {
    if (
      Roles.userIsInRole(this.userId, CONTRACTOR) ||
      Roles.userIsInRole(this.userId, PROFESSIONAL)
    ) {
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
   * Inserts a notification object into the database.
   * The object being sent up will be first validated.
   * If the object passes validation it will be inserted into the database with a timestamp.
   * @mmethod
   * @throws {Meteor.Error} will throw error if the user calling the function is not a valid user
   * @param  {Object} newNotify the notification object to be inserted. see NotificationSchema
   * @return {String} if successful will return the string id of the notification recently inserted in database
   */
  createNotification(newNotify) {
    newNotify.createdAt = new Date();
    let validation = NotificationSchema.namedContext("Notification");
    if (!validation.validate(newNotify))
      throw new Meteor.Error("403", "THINGS");
    return Notification.insert(newNotify);
  },
  /**
  * Will try to update 'seen' value of  the notification with the associated id(notifyId).
  * First will try to pull stored copy of the object associated with notifyId (if it doesnt exist function will stop and gives no error/warning).
  * Will only change seen value from false to true.
  * @mmethod
  * @param  {String} notifyId   String Id of the notification object stored in the database
  * @throws {Meteor.Error} will throw error if the user calling the function is not a valid user
  * @return {Boolean}           will return true if the document has been updated
   */
  updateNotification(notifyId) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    check(notifyId, String);
    let notification = Notification.findOne({
      _id: notifyId,
      toWhomst: this.userId
    });
    if (!notification) return;
    notification.seen = true;
    return Notification.update({ _id: notifyId }, { $set: notification }) == 1
      ? true
      : false;
  },
  /**
   * Deletes all notifications that are associated with a jobId.
   * Will only remove notification of the following types: applied/hired/match.
   * @mmethod
   * @param  {String} jobId   String Id of the job that will determine which notifications to delete
   * @throws {Meteor.Error} will throw error if the user calling the function is not a valid user
   * @return {Boolean}           will return true if the documents has been removed
   */
  deleteNotificationsForJob(jobId) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    check(jobId, String);
    Notification.remove({ jobId: jobId, typeNotifi: "APPLIED" });
    Notification.remove({ jobId: jobId, typeNotifi: "HIRED" });
    Notification.remove({ jobId: jobId, typeNotifi: "MATCH" });

    return Notification.find({jobId:jobId}).count() == 0;
  }
});

export { Notification };
