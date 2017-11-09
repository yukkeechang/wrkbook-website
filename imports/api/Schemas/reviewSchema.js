import  BasicText  from './basicTextSchema';
import  conReviewSchema from './conReviewSchema';
import  proReviewSchema from './proReviewSchema';
export default ReviewSchema = new SimpleSchema({
  reviewerId:{
    type: String,
    defaultValue: ''
  },
  revieweeId:{
    type:String,
    defaultValue: ''
  },
  companyName:{
    type: BasicText
  },
  rating:{
    type: Number,
    defaultValue: 0,
    min:0,
    max:5
  },
  review:{
    type: BasicText,
    optional:true
  },
  conReview:{
    type: conReviewSchema,
    optional: true
  },
  proReview:{
    type: proReviewSchema,
    optional:true
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      }
    }
  },
  jobID:{
    type: String,

  }
});
