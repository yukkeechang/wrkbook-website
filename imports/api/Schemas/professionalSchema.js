export default ProfessionalSchema = new SimpleSchema({
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
