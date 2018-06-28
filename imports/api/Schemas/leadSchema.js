import SimpleSchema from 'simpl-schema';

export default LeadSchema = new SimpleSchema ({
  name: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  isPro: {
    type: Boolean,
    optional: true
  }
});
