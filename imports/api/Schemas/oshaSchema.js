import SimpleSchema from 'simpl-schema';
const OshaSchema = new SimpleSchema({
  osha10: {
    type: Boolean,
    defaultValue:false
  },
  osha30:{
    type : Boolean,
    defaultValue: false
  }
});
export default OshaSchema;
