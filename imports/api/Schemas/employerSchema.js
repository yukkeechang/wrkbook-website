import  BasicText from './basicTextSchema';

import LocationSchema  from './locationSchema';
import {DEFAULT} from './basicTextSchema';
export default  EmployerSchema = new SimpleSchema({
  companyName: {
    type: BasicText
  },
  licenseNumber: {
    type:BasicText
  },
  webPage:{
    type: String,
    defaultValue: DEFAULT
  },
  location:{
    type:LocationSchema
  },
  details:{
    type: BasicText
  },
  image:{
    type: String,
    defaultValue: DEFAULT
  }

});
