export const DEFAULT = '';
export const PICLINK = '';
import SimpleSchema from 'simpl-schema';
/**
 * BasicText Schema is use for the majority of text input.
 * It has a max of 250 characters.
 * Its default value is a empty string.
 * @prop {String} text string that only be less than 250 characters long 
 * @type {SimpleSchema}
 */
const BasicText = new SimpleSchema({
  text:{
    type:String,
    min:1,
    max:250,
    defaultValue: DEFAULT,
  }
});
export default BasicText;
