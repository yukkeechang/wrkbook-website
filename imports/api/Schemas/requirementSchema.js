import OshaSchema from './oshaSchema';
import SocialSchema from './socialSchema';
import EducationSchema from './educationSchema';
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
  education:{
    type: EducationSchema
  },
  languages:{
    type: [String],
    defaultValue: [],
    optional: true
  }

});
