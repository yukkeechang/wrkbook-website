import  TextList from './textListSchema';
import  BasicText  from './basicTextSchema';
import LocationSchema  from './locationSchema';
import AvailabeSchema from './availableSchema';

export default EmployeeSchema = new SimpleSchema({
  jobTitle:{
    type: TextList,
  },
  education:{
    type: TextList,
  },
  certifications:{
    type: TextList,
  },
  languages:{
    type: TextList
  },
  osha:{
    type: Boolean,
    defaultValue: false
  },
  details:{
    type: BasicText,
  },
  skills:{
    type:TextList,
  },
  location:{
    type: LocationSchema,
  },
  maxDistance:{
    type: Number,
    defaultValue: 25,
    min: 1,
    max: 100
  },
  Availability:{
      type: [AvailabeSchema],
      defaultValue:[]
  }
});
