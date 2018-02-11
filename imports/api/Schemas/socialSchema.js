import SimpleSchema from 'simpl-schema';

export default SocialSchema = new SimpleSchema({
  taxID: {
    type: Boolean,
    defaultValue:false

  },
  social:{
    type : Boolean,
    defaultValue:false
  }
});
