import SimpleSchema from 'simpl-schema';
/* eslint-disable no-lonely-if */
const ToolSchema = new SimpleSchema({
  toolsRequired :{
    type: Boolean,
    defaultValue: false
  },
  toolsName: {
    type: String,
    defaultValue: '',
    custom : function(){
      let isTools = this.field('toolsRequired');

      if(this.isSet && isTools.isSet){
        let length = this.value.length;
        if(isTools.value){
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

ToolSchema.messageBox.messages({
  "short": "Needs to be atleast 1 character",
  "long" : "This is greater than 250 characters",
  "noTools" : "you claimed that you don't require tools but you put a name for the tools"
});

export default ToolSchema;
