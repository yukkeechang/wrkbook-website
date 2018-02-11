import  BasicText from './basicTextSchema';

import LocationSchema  from './locationSchema';
import {DEFAULT} from './basicTextSchema';
import {PICLINK} from './basicTextSchema';
import SimpleSchema from 'simpl-schema';
export const CONTRACTOR = 'CON';

export default  EmployerSchema = new SimpleSchema({
  companyName: {
    type: BasicText,
    defaultValue:BasicText.clean({})
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
    type:LocationSchema,
    defaultValue:LocationSchema.clean({})
  },
  about:{
    type: BasicText,
    defaultValue:BasicText.clean({})
  },
  image:{
    type: String,
    defaultValue: PICLINK
  }

});
