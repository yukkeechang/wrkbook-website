export default ProfessionalSchema = new SimpleSchema({
  title :{
    type: String,
    defaultValue:''
  },
  pay:{
    type: Number,
    defaultValue:0
  },
  numWorkers:{
    type: Number,
    defaultValue:0
  },
  startAt:{
    type:Date,
    optional:true
  },
  responsibilities:{
    type:String,
    defaultValue:''
  },
  endAt:{
    type: Date,
    optional:true
  }
});
