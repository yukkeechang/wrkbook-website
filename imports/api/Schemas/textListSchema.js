import SimpleSchema from 'simpl-schema';

export default TextList = new SimpleSchema({
  texts:{
    type:Array,
    minCount: 1,
    defaultValue: [],
  },
  'texts.$':{
    type: String
  },
});
