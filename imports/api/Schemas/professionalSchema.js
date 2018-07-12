import SimpleSchema from 'simpl-schema';
const ProfessionalSchema = new SimpleSchema({
  responsibilities :{
    type: String,
    defaultValue:''
  },
  pay:{
    type: Number,
    defaultValue:0,
    min: 1
  },
  numWorkers:{
    type: Number,
    defaultValue:0,
    min:1
  },
});
export default ProfessionalSchema
