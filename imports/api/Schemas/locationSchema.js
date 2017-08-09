import {DEFAULT} from './basicTextSchema';
export default LocationSchema = new SimpleSchema({
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
     decimal:true

   },
   longitude:{
     type: Number,
     min : -180,
     max: 180,
     decimal:true

   }

});
