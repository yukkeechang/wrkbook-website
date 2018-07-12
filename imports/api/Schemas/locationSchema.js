import {DEFAULT} from './basicTextSchema';
import SimpleSchema from 'simpl-schema';

const  LocationSchema = new SimpleSchema({
  locationName: {
    type: String,
    min:1,
    max:251,
    defaultValue: DEFAULT
  },
   latitude:{
     type: Number,
     min : -90,
     max: 90,

   },
   longitude:{
     type: Number,
     min : -180,
     max: 180,

   }

});
export default LocationSchema;
