
import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import  RequirementSchema  from './requirementSchema';


export default JobSchema = new SimpleSchema({
  employerId:{
    type:String
  },
  applyemployeeIds:{
    type: [String],
    defaultValue: [],

  },
  admitemployeeIds:{
    type:[String],
    defaultValue: [],
  },
  declineemployeeIds:{
    type: [String],
    defaultValue: [],
  },
  title:{
    type: BasicText
  },
  description:{
    type:BasicText
  },
  additionText:{
    type:BasicText
  },
  startAt:{
    type: Date,

  },
  endAt:{
    type: Date,


  },
  pay:{
    type: Number,
    defaultValue: 0,
    min:0
  },
  location:{
    type: LocationSchema
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      }
    }
  },
  updateAt:{
    type:Date,
    autoValue: function() {
    if ( this.isUpdate ) {
      return new Date;
      }
    }
  },
  jobTypes:{
    type: TextList
  },
  status:{
    type: String,
    defaultValue:'Open'
  },
  requirements:{
    type: RequirementSchema,
  }
});
