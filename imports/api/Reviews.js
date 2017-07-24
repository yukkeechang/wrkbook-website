import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'

import ReviewSchema from  './Schemas/reviewSchema';
import {DEFAULT} from './Schemas/basicTextSchema';

Review  = new Mongo.Collection('reviews');
Review.attachSchema(ReviewSchema);

Meteor.publish('reviews-by-revieweeID',function (revieweeId) {
  this.ready();
  return Review.find({ revieweeId: revieweeId});
});
Meteor.publish('reviews-by-reviewerID',function (reviewerId) {
  this.ready();
  return Review.find({ reviewerId: reviewerId});
});

Meteor.methods({
  createReview(newReview){
    if(!this.userId) throw new Meteor.Error('401',"Login required");
    check(newReview,ReviewSchema);
    Review.insert(newReview);
  },
  updateReview(reviewId,updateReview){
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    check(reviewId,String);

    check(updateReview,ReviewSchema);
    let prevReview = Review.findOne({_id: reviewId});
    if(!(prevReview)) return;
    if(newReview.review.text != DEFAULT){
      prevReview.review.text = newReview.review.text;
    }
    if(newReview.rating > 0){
      prevReview.rating = newReview.rating;
    }
    Review.update({_id: reviewId},{$set: prevReview});

  },
  removeReview(reviewId){
    check(reviewId,String);
    if(!this.userId) throw new Meteor.Error('401',"Login required");

    Review.remove({_id: reviewId, revieweeId: this.userId});
  }
});
