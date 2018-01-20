import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import {NOTAUTH} from './Users';
import ConReviewSchema from  './Schemas/conReviewSchema';
import ProReviewSchema from  './Schemas/proReviewSchema';
import ReviewSchema from  './Schemas/reviewSchema';
import {DEFAULT} from './Schemas/basicTextSchema';

const WRONGMET ={
  incorrectMethod : true
};
const REVIEWERR ={
  notmade : true,

};
/*
  Defines a collection with the name "reviews"
  This also needs to be defined on the client side
*/
Review  = new Mongo.Collection('reviews');
Review.attachSchema(ReviewSchema);

/**
*
* Publishes all Reviews written for a user with an String ID
* @param {String} The Id of the user
* @returns {Array} that contains all the review of that reviewee
*
*/
Meteor.publish('reviews-for-user',function (revieweeId) {
  check(revieweeId,String)
  if(this.userId === revieweeId){
    this.stop();
    throw new Meteor.Error('403',WRONGMET)
  }

  return Review.find({ revieweeId: revieweeId});
});
/**
FIND a thing for this function
**/
Meteor.publish('employee-reviews-for-a-job', function( employeeId,employerId,jobId) {
  return Review.find({revieweeId: employeeId, reviewerId:employerId, jobId:jobId});
});

Meteor.publish('reviews-for-job',function(jobID){
    let job = Job.findOne({_id: jobID},{fields: {employerId:1}});
    if(!job)throw new Meteor.Error('401','JOB NOT FOUND');

    return Review.find({reviewerId:this.userId,jobId:jobID,revieweeId:job.employerId});
});

Meteor.publish('reviews-for-employee',function(jobID,employeeID){
    return Review.find({reviewerId:this.userId,revieweeId:employeeID,jobId:jobID});
});




/**
*
* Publishes all Reviews written by a user with ID
* @param {String} The Id of user
* @returns {Array} that contains all the review of that reviewer
*
*/
Meteor.publish('reviews-by-user',function (reviewerId) {
  check(reviewerId,String);
  if(!this.userId){
    this.stop();
    throw new Meteor.Error('401',NOTAUTH);
  }
  this.ready();
  return Review.find({ reviewerId: reviewerId});
});
/**
*
* Publishes all Reviews written for the current user
* @returns {Array} that contains all the review of that reviewee
*
*/
Meteor.publish('reviews-for-you',function(){

  if(!this.userId){
    this.stop();
    throw new Meteor.Error('401',NOTAUTH);
  }


  return Review.find({revieweeId:this.userId});;
});
/**
*
* Publishes all Reviews written by the current user
* @returns {Array} that contains all the review of that reviewer
*
*/
Meteor.publish('reviews-by-you',function(){
  if(!this.userId){
    this.stop();
    throw new Meteor.Error('401',NOTAUTH);
  }
  return Review.find({reviewerId:this.userId});
})

Meteor.methods({
/**
 * Check if the Review Object follows the Schema
 * @param  {Object} reviewObject The reviewObject sent by the user
 * @throws {Meteor.Error}  If the reviewObject being sent violates the Schema
 */
  validateReview(reviewObject) {
    let  validations = ReviewSchema.newContext('REVIEW');

    let reviewerId = !validations.validateOne(reviewObject,'reviewerId');
    let revieweeId = !validations.validateOne(reviewObject,'revieweeId');
    let jobId = !validations.validateOne(reviewObject,'jobId');
    let rating = !validations.validateOne(reviewObject, 'rating');

    // let review = !validations.validateOne(reviewObject, 'review.text');
    let conReview = !Match.test(reviewObject.conReview, ConReviewSchema);
    let proReview = !Match.test(reviewObject.proReview, ProReviewSchema);
    let Errors = {
      reviewerId: reviewerId,
      revieweeId: revieweeId,
      jobId: jobId,
      rating: rating,
      proReview: proReview,
      conReview: conReview
    }

    let nukeText = reviewObject.review.length>0? false: true;

    if(nukeText){
      delete reviewObject.review;
      if( revieweeId ||reviewerId || jobId|| rating  ||
         proReview || conReview)
        throw new Meteor.Error('403',Errors);
    }else{
      let review = !validations.validateOne(reviewObject, 'review.text');
      Errors.review = review;
      if( revieweeId ||reviewerId || jobId|| rating  ||review||
         proReview || conReview)
        throw new Meteor.Error('403',Errors);
    }




  },

  /**
  Inserts a review into the database. That review must follow the format of
  ReviewSchema. If a employer is reviewing a employee, the employee must have
  worked on a job posted by the employer, if not the review wont be made.
  If a employee wants to review another employee they must have worked on the same
  job, if not the review wont be made.
  You can not review employers.
  @param {Object} newReview must match to the ReviewSchema
  @throws {Meteor.Error} if the object passed does not match the Schema you will
  get a match error or if the user calling the method is not signin a Meteor.Error
  will be called.
  */
  createReview(newReview){
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    newReview.reviewerId = this.userId;
    let jobInfo = Job.findOne({_id: newReview.jobId}, {fields: {employerId:1}});
    let employerInfo = Meteor.users.findOne({_id: jobInfo.employerId});
    newReview.companyName.text = employerInfo.profile.employerData.companyName.text;

    Meteor.call('validateReview',newReview);
    let reviewExist = Review.find({reviewerId: this.userId,
                            revieweeId: newReview.revieweeId,
                            jobId:newReview.jobId}).count() > 0 ? true : false;

    if(reviewExist)throw new Meteor.Error('403',REVIEWERR);
    let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
    let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
    if(!isPRO && !isCON ) throw new Meteor.Error('401',NOTAUTH);
    if (newReview.revieweeId === this.userId) {
      console.log("error 1")
      throw new Meteor.Error('403',REVIEWERR);
     }
    if(isCON && Roles.userIsInRole(newReview.revieweeId,PROFESSIONAL)){
      //make an array of one user id to compare to another array
      let hackIdThing = [];
      hackIdThing[0] = newReview.revieweeId;
      let cursor = Job.find({
        $and :[{employerId: this.userId},{_id:newReview.jobId},{admitemployeeIds: {$in: hackIdThing}}]
      });
      let workedOnJobs = cursor.count() > 0 ? true : false;
      if(!workedOnJobs) {
        console.log("error 2")
        throw new Meteor.Error('403',REVIEWERR);

      };
    }
    if(isPRO &&  Roles.userIsInRole(newReview.revieweeId,PROFESSIONAL) ){
      let currentUser = Meteor.users.findOne({_id : this.userId},{fields: {  'profile.employeeData.prevJobs': 1} });
      let toBeReviewed = Meteor.users.findOne({_id : newReview.revieweeId},{fields: {  'profile.employeeData.prevJobs': 1} });
      if(currentUser.profile.employeeData.prevJobs.length  === 0) {
       console.log("error 3")
       throw new Meteor.Error('403',REVIEWERR)
       };

      let currentUserWorked = currentUser.profile.employeeData.prevJobs.indexOf(newReview.jobId);
      let toBeReviewedWorked = toBeReviewed.profile.employeeData.prevJobs.indexOf(newReview.jobId);

      let workedOnJobs = currentUserWorked >-1 && toBeReviewedWorked >-1 ? true:false;
      if(!workedOnJobs) throw new Meteor.Error('403',REVIEWERR);

    }
    if(isPRO &&  Roles.userIsInRole(newReview.revieweeId,CONTRACTOR)){
      let hackIdThing = [];
      hackIdThing[0] = this.userId;
      let cursor = Job.find({
        $and :[{employerId: newReview.revieweeId},{_id:newReview.jobId},{admitemployeeIds: {$in: hackIdThing}}]
      });
      let workedOnJobs = cursor.count() > 0 ? true : false;
      if(!workedOnJobs) {
        console.log("5")
      throw new Meteor.Error('403',REVIEWERR)
      };
    }


    Review.insert(newReview);
  },

  /**
  Updates a review that was already inserted into the database. If the updateReview
  object contains default values no reassignments will occur.
  @param {String} reviewId is the Id of the review
  @param {Object} updateReview must match to the ReviewSchema
  @throws {Meteor.Error} if the object passed does not match the Schema you will
  get a match error OR if the user calling the method is not signin a Meteor.Error
  will be called OR if the reviewId is not a string.
  */
  updateReview(reviewId,updateReview){
    check(reviewId,String);
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    check(updateReview,ReviewSchema);
    let prevReview = Review.findOne({_id: reviewId});
    if(!(prevReview)) return;
    if(newReview.review.text != DEFAULT){ // Check if the text provided is new user text
      prevReview.review.text = newReview.review.text;
    }
    if(newReview.rating > 0){
      prevReview.rating = newReview.rating;
    }
    Review.update({_id: reviewId,reviewerId:this.userId},{$set: prevReview});

  },
  /**
  *
  Deletes a review from the database using its ID.
  @param {String} reviewId is the Id of the Review
  @throws {Meteor.Error} if the reviewID is not a string a match error will be
  thrown Or if the user calling the function is not sign an 401 error will be thrown
  */
  removeReview(reviewId){
    check(reviewId,String);
    if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

    Review.remove({_id: reviewId, revieweeId: this.userId});
  }
});
