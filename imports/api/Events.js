import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import { Roles } from "meteor/alanning:roles";
import EventSchema from "./Schemas/eventSchema";
import { PROFESSIONAL } from "./Schemas/employeeSchema";
import { CONTRACTOR } from "./Schemas/employerSchema";
import { NOTAUTH } from "./Users";

/** @module Event */
/**
 * @summary Defines the events collection,
 * has the basic MongoBD functions(insert,update,remove,etc)
 */
const Event = new Mongo.Collection("events");
Event.attachSchema(EventSchema);

if (Meteor.isServer) {
  /**
   *
   * Publishes all events for date specified by the user.
   * Will only pull events created by the specific user.
   * @publication {today-events}
   * @function
   * @name today-events
   * @param {Date} currentDate date
   * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
   *
   */
  Meteor.publish("today-events", function(currentDate) {
    if (
      Roles.userIsInRole(this.userId, CONTRACTOR) ||
      Roles.userIsInRole(this.userId, PROFESSIONAL)
    ) {
      let morningTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
        0
      );
      let nightTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        23,
        59
      );
      return Event.find({
        startAt: { $gte: morningTime },
        endAt: { $lte: nightTime },
        owner: this.userId
      });
    } else {
      this.stop();
      return;
    }
  });
  /**
   *
   * Publishes all events within a month-span of date defined by the user.
   * Will only pull events created by the specific user.
   * @publication {your-events-this-month}
   * @function
   * @name your-events-this-month
   * @param {Date} currentDate Date Object
   * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
   *
   */
  Meteor.publish("your-events-this-month", function(currentDate) {
    if (
      Roles.userIsInRole(this.userId, CONTRACTOR) ||
      Roles.userIsInRole(this.userId, PROFESSIONAL)
    ) {
      let firstDate = new Date(currentDate.getFullYear(),
                                      currentDate.getMonth(),
                                      1);
      let lastDate = new Date(currentDate.getFullYear(),
                                      currentDate.getMonth() + 1,
                                      0,23,59);

      return Event.find({
        startAt: { $gte: firstDate },
        endAt: { $lte: lastDate },
        owner: this.userId
      });
    } else {
      this.stop();
      return;
    }
  });
  /**
   *
   * Publishes all events associated with an jobId.
   * A valid user needs to call this function.
   * @publication {get-event}
   * @function
   * @name get-event
   * @param {String} jobid id an job
   * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
   * @throw {Meteor.Error} if the user calling the function is not a valid user.
   *
   */
  Meteor.publish("get-event", function(jobId) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    return Event.find({ jobId: jobId });
  });
  /**
   *
   * Publishes all events within a week-span of date defined by the user..
   * A valid user needs to call this function.
   * @publication {events-for-week}
   * @function
   * @param {Date} currentDate Date Object
   * @name events-for-week
   * @param  {Object} editEvent event object that will be used to update the event stored in the database
   * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
   * @throw{Meteor.Error} if the user calling the function is not a valid user.
   *
   */
  Meteor.publish('events-for-week',function(currentDate){
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    if (
      Roles.userIsInRole(this.userId, CONTRACTOR) ||
      Roles.userIsInRole(this.userId, PROFESSIONAL)
    ) {
      let firstDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
      );
      let lastDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 6,
        23,59
      );

      return Event.find({
        startAt: { $gte: firstDate },
        endAt: { $lte: lastDate },
        owner: this.userId
      });
    } else {
      this.stop();
      return;
    }
  });
}
Meteor.methods({
  /**
   * @summary used to validate objects against EventSchema
   * @todo implement this
   * @mmethod
   * @param  {Object} eventToValidate event object to check
   */
  validateEvent(eventToValidate) {
    if (eventToValidate) return true;
  },
  /**
   * Inserts event object into database.
   * Will first try to validate the event object being sent.
   * the owner of the object will be the person calling the function.
   * If the object being sent passes the validation it will be inserted into the database with a timestamp
   * @param  {Object} newEvent is the event object, it should follow EventSchema
   * @mmethod
   * @throw {Meteor.Error}  Will throw Meteor Error if the person calling the funtion is not a valid user
   * or if the event object doesnt pass validation
   * @return {String} if successful will return the string id of the event recently inserted in database
   */
  createEvent(newEvent) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    newEvent.owner = this.userId;
    newEvent.createdAt = new Date();
    check(newEvent, EventSchema);
    let validation = EventSchema.namedContext("Event");
    if (!validation.validate(newEvent)) throw new Meteor.Error("403", "THINGS");
    return Event.insert(newEvent);
  },
  /**
   * Will try to update  the stored event object with the associated eventId and the object that is being sent.
   * First will try to pull stored copy of the object associated with eventId (if it doesnt exist function will stop and gives no error/warning).
   * Will not change the date and time of the event about.
   * Will only change the importance of the date and the description
   * @mmethod
   * @param  {String} eventId   String Id of the event object stored in the database
   * @throws {Meteor.Error} will throw error if the user calling the function is not a valid user
   * @param  {Object} editEvent event object that will be used to update the event stored in the database
   * @return {Boolean}           will return true if the document has been updated
   */
  updateEvent(eventId, editEvent) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    check(eventId, String);
    let eventData = Event.findOne({ _id: eventId, owner: this.userId });
    if (!eventData) return;
    if (eventData.description.text != editEvent.description.text) {
      eventData.description.text = editEvent.description.text;
    }
    if (eventData.important != editEvent.important) {
      eventData.important = editEvent.important;
    }
    return Event.update(
      { _id: eventId, owner: this.userId },
      { $set: eventData }
    ) == 1
      ? true
      : false;
  },
  /**
   * Deletes event object stored in the database with the associated eventId.
   * A vaild user has to have to called this function.
   * @mmethod
   * @throws {Meteor.Error} will throw error if the user calling the function is not a valid user
   * @param  {String} eventId the id of the event to be deleted from the database
   * @return {Boolean}           will return true if the document has been deleted
   */
  removeEvent(eventId) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    check(eventId, String);
    return Event.remove({ _id: eventId, owner: this.userId }) == 1
      ? true
      : false;
  },
  /**
   * Retrieves event object from database with the associated id.
   * Also checks if the eventid is a valid string.
   * @mmethod
   * @throws {Meteor.Error} will throw error if the user calling the function is not a valid user
   * @param  {String} eventId the id of the event to be retrieved
   * @return {Object}         will return event object with the associated id
   */
  getEventInfo(eventId) {
    if (!this.userId) throw new Meteor.Error("401", NOTAUTH);
    check(eventId, String);
    return Event.findOne({ _id: eventId });
  }
});

export { Event };
