export default NotificationSchema = new SimpleSchema({
  employerId: {
    type: String
  },
  employeeId: {
    type: String
  },
  jobId: {
    type: String
  },
  seen :{
    type: Boolean
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
