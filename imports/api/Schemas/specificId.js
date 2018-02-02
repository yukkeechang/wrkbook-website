import SimpleSchema from 'simpl-schema';

export default IdSchema = new SimpleSchema({
  ids:{
    type:Array,
    defaultValue: [],
  },
  'ids.$':{
    type: String
  },
});
