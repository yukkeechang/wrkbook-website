import SimpleSchema from 'simpl-schema';

const TextList = new SimpleSchema({
  texts:{
    type:Array,
    minCount: 1,
    defaultValue: [],
  },
  'texts.$':{
    type: String
  },
});
export default TextList;
