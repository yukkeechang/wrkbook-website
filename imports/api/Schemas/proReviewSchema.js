//For professionals to rate contractors
//Paid on time might be taken out

import SimpleSchema from 'simpl-schema';
const proReviewSchema = new SimpleSchema({
  paidOnTime: {
    type: Boolean,
    defaultValue:false
  },
  safeWorkSpace:{
    type : Boolean,
    defaultValue:false
  }

});
export default proReviewSchema
