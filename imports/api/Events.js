import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import EventSchema from './Schemas/eventSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users';


Event = new Mongo.Collection('events');
Event.attachSchema(EventSchema);

Meteor.publish('your-events-this-month',function(){
  if (Roles.userIsInRole(this.userId,CONTRACTOR)
  ||Roles.userIsInRole(this.userId,PROFESSIONAL) ) {
    let futureDate = new Date();
    let pastDate = new Date();
    let lastMonth= futureDate.getMonth() - 1 < 0 ? 11 : futureDate.getMonth() - 1;
    let nextMonth = futureDate.getMonth() + 1 >11 ? 0 : futureDate.getMonth() + 1;
    futureDate.setMonth(nextMonth);
    pastDate.setMonth(lastMonth);
    return Event.find({$and:[
      {$or : [{startAt:{$gt: pastDate}},{endAt:{$lt:futureDate}}]},
      {owner:this.userId}
    ]})
  }else{
    this.stop();
    return;
  }
});

Meteor.methods({
  createEvent(newEvent){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    newEvent.createdAt = new Date();
    check(newEvent,EventSchema);
    Event.insert(newEvent);
  },
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
    Event.update({_id: eventId,owner:this.userId});
  },
  removeEvent(eventId){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
    check(eventId,String);
    Event.remove({_id: eventId,owner:this.userId});
  }

})
