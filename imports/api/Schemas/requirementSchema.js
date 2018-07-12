import OshaSchema from './oshaSchema';
import SocialSchema from './socialSchema';
import SimpleSchema from 'simpl-schema';

const RequirementSchema = new SimpleSchema({
  osha:{
    type: OshaSchema,
    defaultValue:OshaSchema.clean({})
  },
  socialPref :{
    type: SocialSchema,
    defaultValue:SocialSchema.clean({})
  },
  driverLicense:{
    type: Boolean,
    defaultValue: false
  },
  backgroundCheck:{
    type: Boolean,
    defaultValue: false
  },
  languages:{
    type: Array,
    defaultValue: [],
    optional: true
  },
  'languages.$':{type:String},
  weekendExcluded: {
    type: Boolean,
    defaultValue: false
  }
});

export default RequirementSchema;
