import  BasicText  from './basicTextSchema';
import SimpleSchema from 'simpl-schema';

const ReferenceSchema = new SimpleSchema({
  owner:{
    type: String
  },
  name:{
    type: BasicText,
    defaultValue:BasicText.clean({})
  },
  position :{
    type: BasicText,
    defaultValue:BasicText.clean({})
  },
  companyName :{
    type: BasicText,
    defaultValue:BasicText.clean({})
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
  updateAt:{
    type:Date,
    autoValue: function() {
    if ( this.isUpdate ) {
      return new Date();
      }
    }
  },
  email: {
    type: String,
    defaultValue: '',
    min: 1,
    regEx : SimpleSchema.RegEx.EmailWithTLD
  },
  phone:{
    type: String,
    defaultValue: '',
    min: 1,
    regEx: SimpleSchema.RegEx.Phone
  }
});
export default ReferenceSchema ;
