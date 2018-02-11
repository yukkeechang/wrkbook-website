//For professionals to rate contractors
//Paid on time might be taken out

import SimpleSchema from 'simpl-schema';
export default proReviewSchema = new SimpleSchema({
  paidOnTime: {
    type: Boolean,
    defaultValue:false
  },
  safeWorkSpace:{
    type : Boolean,
    defaultValue:false
  }

});
