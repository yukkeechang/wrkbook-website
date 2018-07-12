import SimpleSchema from 'simpl-schema';
const SupervisorSchema = new SimpleSchema({
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
export default SupervisorSchema;
