 export default MessagesSchema = new SimpleSchema({
  channel: {
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

  }
});
