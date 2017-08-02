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
    type:String,
    min:1,
    max:250,
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
