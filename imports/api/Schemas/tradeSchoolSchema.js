import SimpleSchema from 'simpl-schema';

export default TradeSchoolSchema = new SimpleSchema({
  wentToSchool :{
    type: Boolean,
    defaultValue: false
  },
  schoolName: {
    type: String,
    defaultValue: '',
    custom : function(){
      let isSchool = this.field('wentToSchool');

      if(this.isSet && isSchool.isSet){
        let length = this.value.length;
        if(isSchool.value){
          if(length > 250){
            return "long";
          }
          if(length < 1){
            return "short";
          }
        }else {
          if(length >= 1){
            return "noSchool";
          }
        }
      }
    }
  }
});

TradeSchoolSchema.messageBox.messages({
  en:{
    "short": "Needs to be atleast 1 character",
    "long" : "This is greater than 250 characters",
    "noSchool" : "you claimed that you didn't go to trade school but you put a name for the trade school"
  },
});
