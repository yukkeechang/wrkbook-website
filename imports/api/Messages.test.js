import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './Messages';
import {Message,Channel} from './Messages';

if ( Meteor.isServer ) {
  describe('Messaging API ',function(){

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
    });

    describe('Messages Publish/Subscribe API',function () {

      const jobId = Random.id();
      before(function(){
        resetDatabase();

      });

      it('can get channels for a specific job', function (done) {

          const collector = new PublicationCollector();
          let channel = {
            name : 'DUMMY',
            jobId:jobId
          };
          Channel.insert(channel);

          collector.collect('channels-for-job',jobId).then(collections =>{
             assert.equal(collections.channels.length, 1);
             done();
          }).catch(err =>{
            done(err);
          });
      });

      it('can get messages for channel',function (done) {
        let channel= Channel.findOne({});
        let channelMessage = {
          channelId: channel._id,
          owner: Random.id(),
          seen:false,
          timestamp: new Date(),
          message:'NUTTTTT',
          jobId:jobId
        };


        Message.insert(channelMessage);

        const collector = new PublicationCollector();

        collector.collect('messages-for-channel',jobId,channel.name).then(collections =>{
           assert.equal(collections.messages.length, 1);
           done();
        }).catch(err =>{
          done(err);
        });
      });

      it('can get all messages for a job (all channels and messages for user )',function(done){
        const userId = Accounts.createUser({
          email: 'test@test.com',
          password: 'testAdmin',
          username: 'testAdmin'
        });
        Roles.addUsersToRoles(userId,'PRO');
        let dummyMessage ={
          to:userId,
          owner: Random.id(),
          timestamp: new Date(),
          seen:false,
          message:'NUTTTTT',
          jobId:jobId
        }
        Message.insert(dummyMessage)

        const collector = new PublicationCollector({userId:userId});

        collector.collect('all-messages-for-job',jobId).then(collections =>{
          expect(collections.messages.length).to.equal(2);
          assert.typeOf(collections.messages,'array');
          done();
        }).catch(err=>{
          done(err);
        });
      });

      it('can get all messages between between two users',function (done) {
        let user = Meteor.users.findOne({});
        const randomPersonId = Random.id();
        let dummyMessage ={
          to:user._id,
          owner: randomPersonId,
          timestamp: new Date(),
          seen:false,
          message:'NUTTTTT',
          jobId:jobId
        }
        Message.insert(dummyMessage);

        dummyMessage.to = randomPersonId;
        dummyMessage.owner = user._id;

        Message.insert(dummyMessage);

        const collector = new PublicationCollector({userId:user._id});

        collector.collect('messages-conversation',randomPersonId,jobId).then(collections =>{

          expect(collections.messages.length).to.equal(2);
          done();
        }).catch(err =>{
          done(err);
        });
      })


    });
  })




}
