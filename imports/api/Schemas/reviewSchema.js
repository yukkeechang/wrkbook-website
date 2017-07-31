import  BasicText  from './basicTextSchema';
export default ReviewSchema = new SimpleSchema({
  reviewerId:{
    type: String,
  },
  revieweeId:{
    type:String
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
  }
});
