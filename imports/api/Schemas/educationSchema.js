import TradeSchoolSchema from './tradeSchoolSchema';
import SimpleSchema from 'simpl-schema';

export default EducationSchema = new SimpleSchema({
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
