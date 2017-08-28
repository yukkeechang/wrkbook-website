import TradeSchoolSchema from './tradeSchoolSchema';
export default EducationSchema = new SimpleSchema({
  highGED :{
    type: Boolean,
    defaultValue: true
  },
  tradeSchool:{
    type: TradeSchoolSchema
  },
  higherEdu:{
    type: Boolean,
    defaultValue: false
  }
});
