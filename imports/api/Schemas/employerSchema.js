import  BasicText from './basicTextSchema';

import LocationSchema  from './locationSchema';
import {DEFAULT} from './basicTextSchema';
import {PICLINK} from './basicTextSchema';

export const CONTRACTOR = 'CON';

export default  EmployerSchema = new SimpleSchema({
  companyName: {
    type: BasicText
  },
  licenseNumber: {
    type:BasicText,
    optional: true
  },
  webPage:{
    type: String,
    optional:true
  },
  location:{
    type:LocationSchema
  },
  about:{
    type: BasicText
  },
  image:{
    type: String,
    defaultValue: PICLINK
  }

});
