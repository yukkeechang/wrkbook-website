//For contractors to rate professionals
export default conReviewSchema = new SimpleSchema({
  onTime: {
    type: Boolean,
    defaultValue:false
  },
  neatJob:{
    type : Boolean,
    defaultValue:false
  },
  wouldRecommend:{
    type : Boolean,
    defaultValue:false
  }
});
