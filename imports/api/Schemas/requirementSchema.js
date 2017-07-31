import OshaSchema from './oshaSchema';
import SocialSchema from './socialSchema';
export default RequirementSchema = new SimpleSchema({
  osha:{
    type: OshaSchema
  },
  socialPref :{
    type: SocialSchema
  },
  driverLicense:{
    type: Boolean,
    defaultValue: false
  },
  backgroundCheck:{
    type: Boolean,
    defaultValue: false
  },
  highGed:{
    type: Boolean,
    defaultValue: false
  },
  languages:{
    type: [String],
    defaultValue: [],
    optional: true
  }

});
