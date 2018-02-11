export const DEFAULT = '';
export const PICLINK = '';
import SimpleSchema from 'simpl-schema';

export default BasicText = new SimpleSchema({
  text:{
    type:String,
    min:1,
    max:250,
    defaultValue: DEFAULT,
  }
});
