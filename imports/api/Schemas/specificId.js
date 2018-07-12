import SimpleSchema from 'simpl-schema';

const IdSchema = new SimpleSchema({
  ids:{
    type:Array,
    defaultValue: [],
  },
  'ids.$':{
    type: String
  },
});
export default IdSchema;
