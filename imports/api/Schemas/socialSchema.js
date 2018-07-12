import SimpleSchema from 'simpl-schema';

const SocialSchema = new SimpleSchema({
  taxID: {
    type: Boolean,
    defaultValue:false

  },
  social:{
    type : Boolean,
    defaultValue:false
  }
});
export default SocialSchema;
