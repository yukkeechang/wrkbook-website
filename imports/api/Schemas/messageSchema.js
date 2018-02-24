import SimpleSchema from 'simpl-schema';
 export default MessagesSchema = new SimpleSchema({
  channelId: {
    type: String,
    optional: true
  },
  to: {
    type: String,
    optional: true
  },
  owner: {
    type: String,
  },
  timestamp: {
    type: Date,

  },
  message: {
    type: String,
    min:1,
    max:250,
  },
  seen:{
    type: Boolean,
    defaultValue:false
  },
  jobId:{
    type:String,
    defaultValue:''
  }


});
