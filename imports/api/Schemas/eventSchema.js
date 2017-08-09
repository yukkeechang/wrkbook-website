import  BasicText from './basicTextSchema';
import ImportantSchema from './importanceSchema'

//https://wiki.mozilla.org/Calendar:Sql_Calendar_Schema
SimpleSchema.messages({
  "beginDate": "BEGIN DATE IS SET AFTER END DATE",
  "endDATE" :"END DATE IS SET BEFORE BEGIN DATE"
});

export default  EventSchema = new SimpleSchema({
  owner:{
    type:String
  },
  title:{
    type: BasicText
  },
  description:{
    type:BasicText
  },
  startAt:{
    type: Date,
    custom: function(){

      let endAtInfo = this.field('endAt');

      if(this.isSet && endAtInfo.isSet){
        if(this.value > endAtInfo.value){

          return "beginDate";
        }

      }
    }
  },
  endAt:{
    type: Date,
    custom : function(){
      let startAtInfo = this.field('startAt');
      if(this.isSet && startAtInfo.isSet){
        if(this.value < startAtInfo.value){

          return "endDATE";
        }

      }
    }
  },
  important:{
    type:ImportantSchema
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      }
    }
  },

  recurringType:{
    type: Number,
    defaultValue: 0
  },
  recurringInterval:{
    type:Number,
    defaultValue:0
  },
  recurringData:{
    type: Number,
    defaultValue:0
  },
  jobId:{
    type: String,
    defaultValue: ''
  }

});
