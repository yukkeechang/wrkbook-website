export const DEFAULT = '';
export const PICLINK = '';
import SimpleSchema from 'simpl-schema';

const BasicText = new SimpleSchema({
  text:{
    type:String,
    min:1,
    max:250,
    defaultValue: DEFAULT,
  }
});
export default BasicText;
