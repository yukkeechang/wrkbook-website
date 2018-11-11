//For contractors to rate professionals
import SimpleSchema from "simpl-schema";
const conReviewSchema = new SimpleSchema({
  onTime: {
    type: Boolean,
    defaultValue: false
  },
  neatJob: {
    type: Boolean,
    defaultValue: false
  },
  wouldRecommend: {
    type: Boolean,
    defaultValue: false
  }
});

export default conReviewSchema;
