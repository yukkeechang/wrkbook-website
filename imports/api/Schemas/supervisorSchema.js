export default SupervisorSchema = new SimpleSchema({
    name:{
      type: String,
      min:1,
      max:251,
      defaultValue: ''
    },
    phone:{
      type: String,
      defaultValue: '',
      regEx:  /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
    }
});
