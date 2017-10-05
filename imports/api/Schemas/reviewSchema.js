import  BasicText  from './basicTextSchema';
export default ReviewSchema = new SimpleSchema({
  reviewerId:{
    type: String,
    defaultValue: ''
  },
  revieweeId:{
    type:String,
    defaultValue: ''
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
  createdAt:{
    type: Date,
  },
  jobID:{
    type: String,
    
  }
});
