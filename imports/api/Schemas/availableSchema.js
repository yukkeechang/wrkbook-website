export default AvailabeSchema = new SimpleSchema({
  beginTime:{
    type: Date,
    defaultValue: new Date()
  },
  endTime:{
    type: Date,
    defaultValue: new Date(2018,1,1)
  }
});
