//For professionals to rate contractors
//Paid on time might be taken out
export default proReviewSchema = new SimpleSchema({
  paidOnTime: {
    type: Boolean,
    defaultValue:false
  },
  safeWorkspace:{
    type : Boolean,
    defaultValue:false
  }

});
