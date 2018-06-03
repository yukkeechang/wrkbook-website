import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './Messages';

if ( Meteor.isServer ) {
  describe('Messages Meteor Methods API',function(){


    const jobId = Random.id();
    before(function(){
      resetDatabase();
    });

    it('can create a new Message',function(done){
      const touserId = Random.id();
      const userId = Accounts.createUser({
        email: 'test@test.com',
        password: 'testAdmin',
        username: 'testAdmin'
      });

      Roles.addUsersToRoles(userId, 'PRO');

      let newMessage ={
        to: touserId,
        owner: userId,
        timestamp: new Date(),
        message: "THINGS",
        seen:false,
        jobId: jobId
      }
      const createMessage = Meteor.server.method_handlers['createMessage'];
      const invocation = {userId};
      createMessage.apply(invocation,[newMessage]);
      expect(Message.find().count()).to.equal(1);
      done();
    });
    it('can create a new Channel',function(done){
      let usrPro = Meteor.users.findOne();
      const userId = usrPro._id;

      let newChannel ={
        name:"GAME",
        jobId:jobId
      }
      const createChannel = Meteor.server.method_handlers['createChannel'];
      const invocation = {userId};
      createChannel.apply(invocation,[newChannel]);
      expect(Channel.find().count()).to.equal(1);
      done();
    });
    after(function(){
      resetDatabase();
    });




  })
}
