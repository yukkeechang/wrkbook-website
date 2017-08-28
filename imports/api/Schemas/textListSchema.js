export default TextList = new SimpleSchema({
  texts:{
    type:[String],
    minCount: 1,
    defaultValue: [],
  }
});
