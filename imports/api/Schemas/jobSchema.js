
import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import  RequirementSchema  from './requirementSchema';
import SupervisorSchema from './supervisorSchema';

//Make Jobtitle and are of objects where title corresponds to pay

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
  additionText:{
    type:BasicText
  },
  eventInfo:{
    type: [String],
    defaultValue: []
  },
  pay:{
    type: [Number],
    defaultValue: []
  },
  numWorkers:{
    type: [Number],
    defaultValue: []
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
  supervisor:{
    type: SupervisorSchema
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
  isOpen:{
    type: Boolean,
    defaultValue:true
  },
  requirements:{
    type: RequirementSchema,
  }
});
