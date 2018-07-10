import SimpleSchema from 'simpl-schema';
const ImportantSchema = new SimpleSchema({
  High:{
    type:Boolean,
    defaultValue: true
  },
  Medium:{
    type:Boolean,
    defaultValue: false
  },
  Low:{
    type:Boolean,
    defaultValue: false
  }

});
export default  ImportantSchema;
