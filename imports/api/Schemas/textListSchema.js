export default TextList = new SimpleSchema({
  texts:{
    type:[String],
    minCount: 0,
    defaultValue: [],
  }
});
