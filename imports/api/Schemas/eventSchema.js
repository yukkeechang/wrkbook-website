import  BasicText from './basicTextSchema';
import ImportantSchema from './importanceSchema'


export default  EventSchema = new SimpleSchema({
  owner:{
    type:String
  }
  title:{
    type: BasicText
  },
    description:{
    type:BasicText
  },
  startAt:{
    type: Date
  },
  endAt:{
    type: Date
  },
  important:{
    type:ImportantSchema
  },
  createdAt:{
    type: Date
  }

});
