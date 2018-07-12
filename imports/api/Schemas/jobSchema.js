
import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import  RequirementSchema  from './requirementSchema';
import SupervisorSchema from './supervisorSchema';
import ProfessionalSchema from './professionalSchema';
import IdSchema from './specificId';
import ToolSchema from './toolSchema';
import SimpleSchema from 'simpl-schema';
//Make Jobtitle and are of objects where title corresponds to pay

const JobSchema = new SimpleSchema({
  employerId:{
    type:String
  },
  applyemployeeIds:{
    type: Array,
    defaultValue: [],
  },
  'applyemployeeIds.$':String,
  admitemployeeIds:{
    type: Array,
    defaultValue: [],
  },
  'admitemployeeIds.$':String,
  declineemployeeIds:{
    type: Array,
    defaultValue: [],
  },
  'declineemployeeIds.$':String,
  applyAsIDs:{
    type:Array,
    defaultValue: [],
  },
  'applyAsIDs.$':{type:IdSchema},
  admitAsIDs:{
    type:Array,
    defaultValue: [],
  },
  'admitAsIDs.$':{type:IdSchema},
  description:{
    type : BasicText,
    defaultValue:BasicText.clean({})
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
    type: Array,
    defaultValue: [],
  },
  'eventInfo.$':String,
  location:{
    type: LocationSchema,
    defaultValue:LocationSchema.clean({})
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
  professionals:{
    type: Array,
    defaultValue: []
  },
  'professionals.$':{type:ProfessionalSchema},
  supervisor:{
    type: SupervisorSchema,
    defaultValue:SupervisorSchema.clean({})
  },
  updateAt:{
    type:Date,
    autoValue: function() {
    if ( this.isUpdate ) {
      return new Date();
      }
    }
  },
  jobTypes:{
    type: TextList,
    defaultValue:TextList.clean({})
  },
  tools:{
    type: ToolSchema,
    defaultValue:ToolSchema.clean({})
  },
  jobTitle:{
   type: BasicText,
   defaultValue:BasicText.clean({})
  },
  isOpen:{
    type: Boolean,
    defaultValue:true
  },
  requirements:{
    type: RequirementSchema,
    defaultValue:RequirementSchema.clean({})
  }
});
export default JobSchema;
