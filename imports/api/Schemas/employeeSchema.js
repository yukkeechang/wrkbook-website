import OshaSchema from './oshaSchema';
import {PICLINK} from './basicTextSchema';
import EducationSchema from './educationSchema';
import SocialSchema from './socialSchema';
import SimpleSchema from 'simpl-schema';

export const PROFESSIONAL = 'PRO';

const EmployeeSchema = new SimpleSchema({
  jobTitle:{
    type: Array,
    minCount: 1,
    defaultValue: [],
  },
  'jobTitle.$':{type:String},
  education:{
    type: EducationSchema,
    defaultValue:EducationSchema.clean({})
  },
  languages:{
    type: Array,
    minCount: 1,
    defaultValue: [],
  },
  'languages.$':{type:String},
  osha:{
    type: OshaSchema,
    defaultValue:OshaSchema.clean({})
  },
  hasCar :{
    type: Boolean
  },
  driverLicense:{
    type:Boolean,
  },
  bringTools :{
    type:Boolean
  },
  maxDistance:{
    type: Number,
    defaultValue: 25,
    min: 1,
    max: 100
  },
  prevJobs:{
    type: Array,
    defaultValue:[]
  },
  'prevJobs.$':{type:String},
  socialPref :{
    type: SocialSchema,
    defaultValue:SocialSchema.clean({})
  },
  certfi : {
    type : Array,
    defaultValue : [],
    minCount: 0,
    maxCount:5
  },
  'certfi.$':{type:String},
  image:{
    type: String,
    defaultValue: PICLINK
  },
  facebookLink:{
    type: String,
    optional: true
  },
  instaLink :{
    type: String,
    optional: true
  }
});

export default EmployeeSchema;
