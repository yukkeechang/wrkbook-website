import SimpleSchema from 'simpl-schema';
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
      min:1,
      regEx: SimpleSchema.RegEx.Phone
    }
});
