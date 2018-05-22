import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { expect, be , assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import {PublicationCollector} from 'meteor/johanbrook:publication-collector';
import './Reviews';

if ( Meteor.isServer ) {
  describe('Reviews Meteor Methods API',function(){
    before(function () {
      resetDatabase();
    })
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
      const reviewExist1 = checkReview.apply(invocation,[reviewObject.jobId,reviewObject.revieweeId]);
      expect(reviewExist1).to.equal(false);
      Review.insert(reviewObject);
      const reviewExist2 = checkReview.apply(invocation,[reviewObject.jobId,reviewObject.revieweeId]);
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

  })
 });
}
