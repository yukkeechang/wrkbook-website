import  BasicText from './basicTextSchema';
import ImportantSchema from './importanceSchema'
import SimpleSchema from 'simpl-schema';
//https://wiki.mozilla.org/Calendar:Sql_Calendar_Schema

export default  EventSchema = new SimpleSchema({
  owner:{
    type:String
  },
  title:{
    type: BasicText,
    defaultValue:BasicText.clean({})
  },
  responsibilities:{
    type:BasicText,
    defaultValue:BasicText.clean({})
  },
  startAt:{
    type: Date,
    custom: function(){

      let endAtInfo = this.field('endAt');
      let todaysDate = new Date();
      if(this.isSet && endAtInfo.isSet){
        if(this.value > endAtInfo.value){

          return "beginDate";
        }
        if(this.value < todaysDate){
          return "pastDate";
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
    type:ImportantSchema,
    defaultValue:ImportantSchema.clean({})
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      }
    }
  },
/**
case 0 -> means it's  a one time event
case 1 -> means it's a daily recuring event
case 2 -> means it's a weekly recurring event
case 3 -> means it's a monthly recurring event
**/
  recurringType:{
    type: Number,
    defaultValue: 0,
    custom: function(){
      let interval = this.field('recurringInterval');
      if(this.isSet && interval.isSet){
        let recurring = this.value;
        switch (recurring) {
          case 0:
            if(interval.value != 0) return "interval";
            break;
          case 1:
            if(interval.value >= 7 || interval.value < 0)return "interval";
            break;
          case 2:
            if(interval.value >= 4 || interval.value <0) return "interval";
            break;
          case 3:
              if(interval.value >= 12 || interval.value < 0 ) return 'interval';
            break;
          default:
            return ;
        }
      }
    }
  },
/**
if recurringTYpe then the interval should be 0 : since its a one time event
**/
  recurringInterval:{
    type:Number,
    defaultValue:0,
    custom: function(){
      let recurringType = this.field('recurringType');
      if(this.isSet && recurringType.isSet){
        let interval = this.value;
        switch (recurringType) {
          case 0:
            if(interval.value != 0) return "interval";
            break;
          case 1:
            if(interval.value >= 7 || interval.value < 0)return "interval";
            break;
          case 2:
            if(interval.value >= 4 || interval.value <0) return "interval";
            break;
          case 3:
              if(interval.value >= 12 || interval.value < 0 ) return 'interval';
            break;
          default:
            return ;
        }
      }
    }
  },
  /**
  Mask for reccurring events-> meaning its going to exclude that given values.
  for example a value of [3] for a daily recurring is going to repeat every day except for
  the third day of the weeek ,and a value of [2,3] for a daily recurring is going to repeat every day except for
  the second and third day of the weeek
  **/
  recurringData:{
    type: Array,
    defaultValue:[],
    custom : function(){
      let recurringType = this.field('recurringType');
      if(this.isSet && recurringType.isSet){
        let mask = this.value;
        let largest = mask.sort().reverse()[0];
        let smallest = mask.sort()[0];
        switch (recurringType) {
          case 0:
            if(largest.value != 0) return "interval";
            if(smallest.value != 0) return "interval";
            break;
          case 1:
            if(largest.value >= 7 || smallest.value < 0)return "interval";
            break;
          case 2:
            if(largest.value >= 4 || smallest.value <0) return "interval";
            break;
          case 3:
              if(largest.value >= 12 || smallest.value < 0 ) return 'interval';
            break;
          default:
            return ;
        }
      }
    }
  },
  'recurringData.$':{type:Number},
  jobId:{
    type: String,
    defaultValue: ''
  }

});

EventSchema.messageBox.messages({
  "pastDate":"Can't make a start date before today",
  "beginDate": "BEGIN DATE IS SET AFTER END DATE",
  "endDATE" :"END DATE IS SET BEFORE BEGIN DATE",
  "interval": "The interval is not valid given the recurring type"
});
