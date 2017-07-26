import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

import ReviewSchema from  './Schemas/reviewSchema';
import {DEFAULT} from './Schemas/basicTextSchema';


//Defines a collection with the name "reviews"
Review  = new Mongo.Collection('reviews');
Review.attachSchema(ReviewSchema);
/*
*
* Publishes all Reviews written for a user with an String ID
* @param {String} The Id of the Reviewee
* @returns {Array} that contains all the review of that reviewee
*
*/
Meteor.publish('reviews-by-revieweeID',function (revieweeId) {
  check(revieweeId,String)
  this.ready();
  return Review.find({ revieweeId: revieweeId});
});

/*
*
* Publishes all Reviews written by a user with ID
* @param {String} The Id of the Reviewer
* @returns {Array} that contains all the review of that reviewer
*
*/
Meteor.publish('reviews-by-reviewerID',function (reviewerId) {
  check(reviewerId,String);
  this.ready();
  return Review.find({ reviewerId: reviewerId});
});


Meteor.methods({
  /*
  Inserts a review into the database. That review must follow the format of
  ReviewSchema.
  @param {Object} newReview must match to the ReviewSchema
  @throw {Meteor.Error} if the object passed does not match the Schema you will
  get a match error or if the user calling the method is not signin a Meteor.Error
  will be called.
  */
  createReview(newReview){
    if(!this.userId) throw new Meteor.Error('401',"Login required");
    check(newReview,ReviewSchema);
    Review.insert(newReview);
  },

  /*
  Updates a review that was already inserted into the database. If the updateReview
  object contains default values no reassignments will occur.
  @param {String} reviewId is the Id of the review
  @param {Object} updateReview must match to the ReviewSchema
  @throw {Meteor.Error} if the object passed does not match the Schema you will
  get a match error OR if the user calling the method is not signin a Meteor.Error
  will be called OR if the reviewId is not a string.
  */
  updateReview(reviewId,updateReview){
    check(reviewId,String);
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    check(updateReview,ReviewSchema);
    let prevReview = Review.findOne({_id: reviewId});
    if(!(prevReview)) return;
    if(newReview.review.text != DEFAULT){ // Check if the text provided is new user text
      prevReview.review.text = newReview.review.text;
    }
    if(newReview.rating > 0){
      prevReview.rating = newReview.rating;
    }
    Review.update({_id: reviewId},{$set: prevReview});

  },
  /*
  *
  Deletes a review from the database using its ID.
  @param {String} reviewId is the Id of the Review
  @throw {Meteor.Error} if the reviewID is not a string a match error will be
  thrown Or if the user calling the function is not sign an 401 error will be thrown
  */
  removeReview(reviewId){
    check(reviewId,String);
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    Review.remove({_id: reviewId, revieweeId: this.userId});
  }
});
