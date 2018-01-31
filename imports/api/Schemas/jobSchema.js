
import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import  RequirementSchema  from './requirementSchema';
import SupervisorSchema from './supervisorSchema';
import ProfessionalSchema from './professionalSchema';
import IdSchema from './specificId';
import ToolSchema from './toolSchema';

//Make Jobtitle and are of objects where title corresponds to pay
SimpleSchema.messages({
  "unmatched": "there is a issue with the amount of worker and the days and pay rate",

});
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
  applyAsIDs:{
    type:[IdSchema],
    defaultValue: [],
  },
  admitAsIDs:{
    type:[IdSchema],
    defaultValue: [],
  },
  description:{
    type : BasicText
  },
  generalStart:{
    type: Date
  },
  generalEnd:{
    type: Date
  },
  additionText:{
    type:String,
    min:1,
    max:250,
    optional: true
  },
  eventInfo:{
    type: [String],
    defaultValue: [],
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
  professionals:{
    type: [ProfessionalSchema],
    defaultValue: []
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
  tools:{
    type: ToolSchema
  },
  jobTitle:{
   type: BasicText
  },
  isOpen:{
    type: Boolean,
    defaultValue:true
  },
  requirements:{
    type: RequirementSchema,
  }
});
