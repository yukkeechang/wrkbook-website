import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import {sinon} from 'meteor/practicalmeteor:sinon';
import JobSchema  from './Schemas/jobSchema';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import {inserJob} from './Jobs.test';
import './Reviews';

if ( Meteor.isServer ) {
  describe('Reviews API',function () {
    describe('Reviews Meteor Methods API',function(){
      before(function () {
        resetDatabase();
      });
      it('check if a review for a job has already been created',function () {
        const checkReview = Meteor.server.method_handlers['checkIfReviewForJobExist'];
        let userId = Random.id();
        const invocation = {userId};
        let reviewObject ={
          reviewerId : userId,
          revieweeId:  Random.id(),
          companyName: {
            text: "DummyName"
          },
          rating:3,
          review:"abiudsflads",
          createdAt: new Date(),
          jobId: Random.id()
        }
        const reviewExist1 = checkReview.apply(invocation,[reviewObject.jobId,reviewObject.revieweeId,userId]);
        expect(reviewExist1).to.equal(false);
        Review.insert(reviewObject);
        const reviewExist2 = checkReview.apply(invocation,[reviewObject.jobId,reviewObject.revieweeId,userId]);
        expect(reviewExist2).to.equal(true);


      });
    it('deletes reviews',function () {
      const deleteReview = Meteor.server.method_handlers['removeReview'];
      let userId = Random.id();
      let reviewObject ={
        reviewerId : userId,
        revieweeId:  Random.id(),
        companyName: {
          text: "DummyName"
        },
        rating:3,
        review:"abiudsflads",
        createdAt: new Date(),
        jobId: Random.id()
      }
      let reviewId= Review.insert(reviewObject);

      const invocation = {userId};

      deleteReview.apply(invocation,[reviewId]);

      expect(Review.find({_id:reviewId}).count()).to.equal(0);

    });

    it('check if both professionals worked on the same job', function () {
      const jobId = Random.id();

      const userId = Accounts.createUser({
        email: 'test@test.com',
        password: 'testAdmin',
        username: 'testAdmin',
        profile: {
          employeeData:{
            prevJobs: jobId
          }
        }
      });

      const revieweeId = Accounts.createUser({
        email: 'test@mail.com',
        password: 'testAdmin',
        username: 'testMail',
        profile: {
          employeeData:{
            prevJobs: jobId
          }
        }
      });

      const checkProfessionals = Meteor.server.method_handlers['checkIfProandProWork']
      const invocation = {userId};

      const results = checkProfessionals.apply(invocation,[jobId,revieweeId,userId]);
      expect(results).to.equal(true);
    });

    it('check if a contractor made a job and if an employee worked on the same job\n(the contractor is making the review)', function () {
      const userId = Random.id();
      const employeeId = Random.id();
      let jobObject = JobSchema.clean({});
      jobObject.admitemployeeIds[0] = employeeId;
      jobObject.employerId = userId;
      jobObject.location.locationName ="sadhasi";
      jobObject.location.latitude =12.3;
      jobObject.location.longitude = -12.3;
      jobObject.description.text ="ASADGGF";
      jobObject.supervisor.name ="asfd";
      jobObject.supervisor.phone ="233-123-1234";
      jobObject.jobTypes.texts[0] = "asdada";
      jobObject.jobTitle.text = "sadf";
      jobObject.generalStart=new Date();
      jobObject.updateAt= new Date();
      jobObject.generalEnd= new Date('2019-12-17T03:24:00');
      const jobId = inserJob(jobObject);

      const checkProCon = Meteor.server.method_handlers['checkIfConandProWork'];
      const invocation = {userId};

      const results = checkProCon.apply(invocation,[jobId,employeeId,userId]);

      expect(results).to.equal(true);

    });
    it('checks if a professional worked on a job made a contractor\n(the professional is making the review)', function () {
      let userId = Random.id();
      let employerId = Random.id();
      let jobObject = JobSchema.clean({});
      jobObject.admitemployeeIds[0] = userId;
      jobObject.employerId = employerId;
      jobObject.location.locationName ="sadhasi";
      jobObject.location.latitude =12.3;
      jobObject.location.longitude = -12.3;
      jobObject.description.text ="ASADGGF";
      jobObject.supervisor.name ="asfd";
      jobObject.supervisor.phone ="233-123-1234";
      jobObject.jobTypes.texts[0] = "asdada";
      jobObject.jobTitle.text = "sadf";
      jobObject.generalStart=new Date();
      jobObject.updateAt= new Date();
      jobObject.generalEnd= new Date('2019-12-17T03:24:00');
      let jobId = inserJob(jobObject);

      let checkProCon = Meteor.server.method_handlers['checkIfProandConWork'];
      let invocation = {userId};

      let results = checkProCon.apply(invocation,[jobId,employerId,userId]);

      expect(results).to.equal(true);
    });
    it('can create a review',function () {

      let userId = Accounts.createUser({
        email: 'test@test1.com',
        password: 'testAdmin',
        username: 'testAdmin1'
      });
      Roles.addUsersToRoles(userId,"PRO");

      let employerId = Accounts.createUser({
        email: 'test@mail1.com',
        password: 'testAdmin',
        username: 'testMail1',
        profile:{
          employerData:{
            companyName:{
              text: "asdf"
            }
          }
        }
      });
      Roles.addUsersToRoles(employerId,"CON");


      let jobObject = JobSchema.clean({});
      jobObject.admitemployeeIds[0] = userId;
      jobObject.employerId = employerId;
      jobObject.location.locationName ="sadhasi";
      jobObject.location.latitude =12.3;
      jobObject.location.longitude = -12.3;
      jobObject.description.text ="ASADGGF";
      jobObject.supervisor.name ="asfd";
      jobObject.supervisor.phone ="233-123-1234";
      jobObject.jobTypes.texts[0] = "asdada";
      jobObject.jobTitle.text = "sadf";
      jobObject.generalStart=new Date();
      jobObject.updateAt= new Date();
      jobObject.generalEnd= new Date('2019-12-17T03:24:00');

      let jobId = inserJob(jobObject);


      let reviewObject = {
        reviewerId: userId,
        revieweeId: employerId ,
        companyName: {
          text:  "REPLACE"
        },
        rating: 4,
        review: "dsgfdsfgsdfgfd",
        createdAt: new Date(),
        jobId: jobId
      }


      let createReview = Meteor.server.method_handlers['createReview'];
      let invocation = {userId:userId};



      const reviewID = createReview.apply(invocation,[reviewObject]);
      expect(Review.find({_id:reviewID}).count()).to.equal(1)

    });
    it('can update a review',function () {
      let reviewObject = Review.findOne({});
      let reviewID = reviewObject._id;
      delete reviewObject._id;
      reviewObject.rating= 5;
      reviewObject.review ="NEW TEXT";

      let updateReview = Meteor.server.method_handlers['updateReview'];
      let invocation = {userId:reviewObject.reviewerId};

      updateReview.apply(invocation,[reviewID,reviewObject]);

      expect(Review.findOne({_id:reviewID}).rating).to.equal(5);
      expect(Review.findOne({_id:reviewID}).review).to.equal("NEW TEXT");
    });
    after(function () {
      resetDatabase();
    });
   });
   describe('Review Pub/Sub Methods',function () {

   });
 });
}
