import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './References';

if ( Meteor.isServer ) {
  describe('References API',function () {
    describe('References Meteor Methods API',function(){


      before(function(){
        resetDatabase();
      });

      it('can create a new Reference',function(){
        const userId = Accounts.createUser({
          email: 'test@test.com',
          password: 'testAdmin',
          username: 'testAdmin'
        });

        Roles.addUsersToRoles(userId, 'PRO');

        let refObject ={
          owner:userId,
          name:{
            text: 'DummyName'
          },
          position :{
            text: 'DID A THING'
          },
          companyName:{
            text: 'ISSA companyName'
          },
          createdAt: new Date(),
          updateAt:new Date(),
          email: 'test@mail.com',
          phone: '123-123-1234'
        };
        const newReference = Meteor.server.method_handlers['createReference'];
        const invocation = {userId};
        newReference.apply(invocation,[refObject]);
        expect(Reference.find().count()).to.equal(1);
      });
      it('can update a Reference',function(){
        let refObject = Reference.findOne();
        const newEmailStr = 'newmail@mail.com';
        const newPosStr = 'UPDATE A THING'
        refObject.email = newEmailStr;
        refObject.position.text= newPosStr;

        let usrPro = Meteor.users.findOne();

        const updateRef = Meteor.server.method_handlers['updateReference'];
        let userId = usrPro._id
        const invocation = {userId};

        updateRef.apply(invocation,[refObject._id,refObject]);

        expect(Reference.findOne().email).to.equal(newEmailStr);
        expect(Reference.findOne().position.text).to.equal(newPosStr);
      });
      it('can get a Reference',function(){
        let refObject = Reference.findOne();
        let userObject = Meteor.users.findOne();

        const getRef = Meteor.server.method_handlers['getReference'];
        let userId = userObject._id;
        const invocation = {userId};

        let returnObject = getRef.apply(invocation,[refObject._id]);
        expect(refObject).to.deep.equal(returnObject);
      });
      it('can delete a Reference',function(){
        let refObject = Reference.findOne();
        let userObject = Meteor.users.findOne();

        const delRef = Meteor.server.method_handlers['deleteReference'];
        let userId = userObject._id;
        const invocation = {userId};

        delRef.apply(invocation,[refObject._id]);
        expect(Reference.find({ _id: refObject._id }).count()).to.equal(0);
      });

      it('testing the validateReference function',function () {
        let userId = Random.id();
        let refObjectGood ={
          owner:userId,
          name:{
            text: 'DummyName'
          },
          position :{
            text: 'DID A THING'
          },
          companyName:{
            text: 'ISSA companyName'
          },
          createdAt: new Date(),
          updateAt:new Date(),
          email: 'test@mail.com',
          phone: 'A-123-1234'
        };
        const invocation = {userId};

        const validateReference = Meteor.server.method_handlers['validateReference'];
        // console.log(validateReference.apply(invocation,[refObjectGood]));
        expect(()=>{ validateReference.apply(invocation,[refObjectGood])}).to.throw(Meteor.Error);



      })

      after(function() {
        resetDatabase();
      })


    });

    describe('References Pub/Sub API',function(){
      before(function(){
        resetDatabase();
      });

      it('can get references for logged-in user ', function(done) {
        const adminUserId = Accounts.createUser({
          email: 'test@test.com',
          password: 'testAdmin',
          username: 'testAdmin'
        });

        Roles.addUsersToRoles(adminUserId, 'PRO');
        const collector = new PublicationCollector({userId: adminUserId });

        let refObject ={
          owner:adminUserId,
          name:{
            text: 'DummyName'
          },
          position :{
            text: 'DID A THING'
          },
          companyName:{
            text: 'ISSA companyName'
          },
          createdAt: new Date(),
          updateAt:new Date(),
          email: 'test@mail.com',
          phone: '123-123-1234'
        };

        Reference.insert(refObject);

        collector.collect('your-references').then(collections=>{
          expect(collections.references.length).to.equal(1);
          assert.typeOf(collections.references,'array');
          done();
        }).catch(err=>{
          done(err);
        });


      });
      it('can get references for a PROFESSIONAL (not current user)',function(done){
        const randomUserId  = Accounts.createUser({
          email: 'random@test.com',
          password: 'testAdmin',
          username: 'randon'
        });

        Roles.addUsersToRoles(randomUserId, 'PRO');

        let refObject ={
          owner: randomUserId,
          name:{
            text: 'DummyName'
          },
          position :{
            text: 'DID A THING'
          },
          companyName:{
            text: 'ISSA companyName'
          },
          createdAt: new Date(),
          updateAt:new Date(),
          email: 'test@mail.com',
          phone: '123-123-1234'
        };

        Reference.insert(refObject);

        const collector = new PublicationCollector();
        collector.collect('references-for-user',randomUserId).then(collections=>{
          expect(collections.references.length).to.equal(1);
          assert.typeOf(collections.references,'array');
          done();
        }).catch(err =>{
          done(err);
        });
      })


    });
  });

}
