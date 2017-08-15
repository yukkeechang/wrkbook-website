
import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import  RequirementSchema  from './requirementSchema';
import SupervisorSchema from './supervisorSchema';

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
  additionText:{
    type:BasicText
  },
  eventInfo:{
    type: [String],
    defaultValue: [],
    custom: function(){
      let pay = this.field('pay');
      let numWorkers =  this.field('numWorkers');
      if(this.isSet && pay.isSet && numWorkers.isSet){
        if(this.value.length != pay.value.length ||
           this.value.length != numWorkers.value.length ||
         pay.value.length != numWorkers.value.length){
           return "unmatched";
         }
      }
    }
  },
  pay:{
    type: [Number],
    defaultValue: [],
    custom: function(){

    }
  },
  numWorkers:{
    type: [Number],
    defaultValue: [],
    custom: function(){

    }
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
