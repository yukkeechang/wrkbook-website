import SimpleSchema from 'simpl-schema';
/**
 * ChannelSchema is used in the messaging api.
 * It handles the group messaging.
 * @prop {String} name defines the name of channel
 * @prop {String} jobId associates a jobId to channel
 * @type {SimpleSchema}
 */
const ChannelSchema = new SimpleSchema({
  name: {
    type: String,
  },
  jobId:{
    type:String,
  }
});

export default ChannelSchema;
