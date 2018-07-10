import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import EventSchema from './Schemas/eventSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users';

/** @module Event */
/**
  * @summary Defines the events collection,
  * has the basic MongoBD functions(insert,update,remove,etc)
  */
const Event = new Mongo.Collection('events');
Event.attachSchema(EventSchema);

if ( Meteor.isServer ) {
  /**
  *
  * @summary Publishes all events for the current date
  * @publication {Event} today-events User
  * @function
  * @param {Date} currentDate date
  * @name today-events
  * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
  *
  */
  Meteor.publish('today-events',function(currentDate) {
    if (Roles.userIsInRole(this.userId,CONTRACTOR) ||
      Roles.userIsInRole(this.userId,PROFESSIONAL) ) {
      return Event.find(
        {$and:[
          {$or : [{startAt:{$lte: currentDate}},{endAt:{$gte:currentDate}}]},
          {owner:this.userId}
      ]});

    }else{
      this.stop();
      return;
    }
  });
  /**
  *
  * @summary Publishes all events within a month-span of the current date
  * @publication {Event} today-events User
  * @function
  * @param {Date} currentDate date
  * @name today-events
  * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
  *
  */
  Meteor.publish('your-events-this-month',function(currentDate){
    if (Roles.userIsInRole(this.userId,CONTRACTOR)  ||
    Roles.userIsInRole(this.userId,PROFESSIONAL) ) {
      let futureDate = currentDate;
      let lastMonth= futureDate.getMonth() - 1 < 0 ? 11 : futureDate.getMonth() - 1;
      let nextMonth = futureDate.getMonth() + 1 >11 ? 0 : futureDate.getMonth() + 1;

      return Event.find({$and:[
        {$or : [{startAt:{$lte: nextMonth}},{endAt:{$gte:lastMonth}}]},
        {owner:this.userId}
      ]});
    }else{
      this.stop();
      return;
    }
  });
  /**
  *
  * @summary Publishes all events associated with an jobId
  * @publication {Event} get-event User
  * @function
  * @param {String} jobid id an job
  * @name get-event
  * @returns {MongoBD.cursor|NULL} cursor point to all valid event objects. Null if not a signed in user
  *
  */
  Meteor.publish('get-event', function(jobId) {
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    return Event.find({'jobId': jobId});
  });
}
Meteor.methods({
  /**
   * [validateEvent description]
   * @mmethod
   * @param  {Object} eventToValidate [description]
   * @return {[type]}                 [description]
   */
  validateEvent(eventToValidate){
    if(eventToValidate)return true;
  },
  /**
   * @mmethod
   * [createEvent description]
   * @param  {[type]} newEvent [description]
   * @return {[type]}          [description]
   */
  createEvent(newEvent){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    newEvent.owner = this.userId;
    newEvent.createdAt = new Date();
    check(newEvent,EventSchema);
    let validation  = EventSchema.namedContext('Event');
    if(!validation.validate(newEvent))throw new Meteor.Error('403','THINGS');
    Event.insert(newEvent);
  },
  /**
   * [updateEvent description]
   * @mmethod
   * @param  {[type]} eventId   [description]
   * @param  {[type]} editEvent [description]
   * @return {[type]}           [description]
   */
  updateEvent(eventId, editEvent){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(eventId,String);
    let eventData = Event.findOne({_id: eventId,owner:this.userId});
    if(!(eventData)) return;
    if(eventData.description.text != editEvent.description.text){
      eventData.description.text = editEvent.description.text;
    }
    if(eventData.important != editEvent.important){
      eventData.important = editEvent.important;
    }
    Event.update({_id: eventId,owner:this.userId},{$set:eventData});
  },
  /**
   * [removeEvent description]
   * @mmethod
   * @param  {[type]} eventId [description]
   * @return {[type]}         [description]
   */
  removeEvent(eventId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(eventId,String);
    Event.remove({_id:eventId,owner:this.userId});
  },
  /**
   * [getEventInfo description]
   * @mmethod
   * @param  {[type]} eventId [description]
   * @return {[type]}         [description]
   */
  getEventInfo(eventId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(eventId,String);
    return Event.findOne({_id:eventId });
  }

});

export {Event};
