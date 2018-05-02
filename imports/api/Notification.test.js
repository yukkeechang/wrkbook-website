import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './Notifications';

if ( Meteor.isServer ) {
  describe('Notification Meteor Methods API',function(){
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

        seenNotification.apply(invocation,[notifyId]);
        expect(Notification.findOne().seen).to.equal(true);


      });
      it('can delete Notifications for a Job',function(){
        let jobId = Random.id();
        let newNotify ={
          toWhomst:userId,
          seen:false,
          description:'dummy text',
          jobId: jobId,
          typeNotifi:'MATCH',
          href:'/job/:id',
          createdAt:new Date()
        }
        let notifyApplied = Object.assign({}, newNotify);
        notifyApplied.typeNotifi="APPLIED";
        let notifyHire = Object.assign({}, newNotify);
        notifyHire.typeNotifi="HIRED";

        Notification.insert(newNotify);
        Notification.insert(notifyApplied);
        Notification.insert(notifyHire);

        expect(Notification.find({jobId:jobId}).count()).to.equal(3);

        const deleteNotification = Meteor.server.method_handlers['deleteNotificationsForJob'];
        const invocation = {userId};

        deleteNotification.apply(invocation,[jobId]);
        expect(Notification.find({jobId:jobId}).count()).to.equal(0);



      });
      after(function(){
        resetDatabase();
      });
  });

  describe('Notification Publish/Subscribe API',function(){
    before(function() {
     resetDatabase();
    });

    it('getting all notification for a user',function(done) {
      const adminUserId = Accounts.createUser({
        email: 'test@test.com',
        password: 'testAdmin',
        username: 'testAdmin'
      });

      Roles.addUsersToRoles(adminUserId, 'PRO');

      const collector = new PublicationCollector({userId: adminUserId });
      const jobId  = Random.id();
      let newNotify ={
        toWhomst: adminUserId,
        seen:true ,
        description:'dummy text',
        jobId: jobId,
        typeNotifi:'MATCH',
        href:'/job/:id',
        createdAt:new Date()
      }
      Notification.insert(newNotify);

      collector.collect('all-notifications-for-user',function(collections){

        expect(collections.notifications.length).to.equal(1);
        assert.typeOf(collections.notifications,'array');

      });
      done()
    });

    it('getting unseen notifications for a user',function(done){
      let user = Meteor.users.findOne();

      const collector = new PublicationCollector({userId:user._id});

      let notfiy = Notification.findOne();
      notfiy.seen = false;
      Notification.update({_id:notfiy._id},{$set:notfiy});

      collector.collect('notifications-for-user',function(collections){
        expect(collections.notifications.length).to.equal(1);
      });


      done();
    })
    after(function(){
      resetDatabase();
    });

  });
}
