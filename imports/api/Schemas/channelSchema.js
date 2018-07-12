import SimpleSchema from 'simpl-schema';

const ChannelSchema = new SimpleSchema({
  name: {
    type: String,
  },
  jobId:{
    type:String,
  }
});

export default ChannelSchema;
