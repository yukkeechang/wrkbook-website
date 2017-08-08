export default NotificationSchema = new SimpleSchema({
  employee: {
    ID: {
    type: String
    },
    seen:{
      type: Boolean
    }

  },
  employer: {
    ID: {
    type: String
    },
    seen:{
      type: Boolean
    },
  },
  jobId: {
    type: String
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date;
      }
    }
  }
});
