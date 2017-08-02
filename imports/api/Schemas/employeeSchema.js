import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import AvailabeSchema from './availableSchema';
import {DEFAULT} from './basicTextSchema';
import OshaSchema from './oshaSchema';
import {PICLINK} from './basicTextSchema';
import EducationSchema from './educationSchema';

export const PROFESSIONAL = 'PRO';

export default EmployeeSchema = new SimpleSchema({
  jobTitle:{
    type: [String],
    minCount: 1,
    defaultValue: [],
  },
  education:{
    type: EducationSchema,
  },
  certifications:{
    type: TextList,
  },
  languages:{
    type: [String],
    minCount: 1,
    defaultValue: [],
  },
  osha:{
    type: OshaSchema,
  },
  about:{
    type: BasicText,
  },
  skills:{
    type:BasicText,
  },
  location:{
    type: LocationSchema,
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
    type: [String],
    defaultValue:[]
  },
  image:{
    type: String,
    defaultValue: PICLINK
  },
  Availability:{
    type: AvailabeSchema,
    optional: true
  }
});
