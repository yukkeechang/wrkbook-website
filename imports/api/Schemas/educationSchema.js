import TradeSchoolSchema from './tradeSchoolSchema';
import SimpleSchema from 'simpl-schema';
/**
 * Used to define the education for a professional.
 * @prop {Boolean} highGED indicating if the professional went to highschool or equivalent
 * @prop {TradeSchoolSchema} tradeSchool indicating if and what tradeSchool
 * @prop {Boolean} higherEdu indicating if the professional went to highschool or equivalent
 * @type {SimpleSchema}
 */
const EducationSchema = new SimpleSchema({
  highGED :{
    type: Boolean,
    defaultValue: true
  },
  tradeSchool:{
    type: TradeSchoolSchema,
    defaultValue:TradeSchoolSchema.clean({})
  },
  higherEdu:{
    type: Boolean,
    defaultValue: false
  }
});
export default EducationSchema;
