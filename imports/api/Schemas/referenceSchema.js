import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
export default ReferenceSchema = new SimpleSchema({
  owner:{
    type: String
  },
  name:{
    type: BasicText
  },
  position :{
    type: BasicText
  },
  companyName :{
    type: BasicText
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
  location :{
    type: LocationSchema
  },
  email: {
    type: String,
    defaultValue: '',
    min: 1,
    regEx : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  phone:{
    type: String,
    defaultValue: '',
    min: 1,
    regEx:  /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
  }

});
