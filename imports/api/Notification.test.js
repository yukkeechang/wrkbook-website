import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import './Notifications';

describe('Notification  API',function(){
    const userId = Random.id();


    before(function() {
     resetDatabase();
    });

    it('can create a new Notification',function(){
      let newNotify ={
        toWhomst:userId,
        seen:false,
        description:'dummy text',
        jobId:'someJob',
        typeNotifi:'MATCH',
        href:'/job/:id',
        createdAt:new Date()
      }
      const newNotification = Meteor.server.method_handlers['createNotification'];
      const invocation ={ userId};

      newNotification.apply(invocation,[newNotify]);

      expect(Notification.find().count()).to.equal(1);
    });

    it('can edit a Notification',function(){
      const seenNotification = Meteor.server.method_handlers['updateNotification'];
      const invocation = {userId};

      let notify = Notification.findOne();
      let notifyId = notify._id;
      console.log(notify);
      seenNotification.apply(invocation,[notifyId]);
      expect(Notification.findOne().seen).to.equal(true);


    });
});
