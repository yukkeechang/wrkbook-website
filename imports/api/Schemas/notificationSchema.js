import SimpleSchema from 'simpl-schema';
const NotificationSchema = new SimpleSchema({
  toWhomst:{
    type:String,
    defaultValue: ''
  },
  seen :{
    type:Boolean,
    defaultValue:false
  },
  description:{
    type:String,
    min:1,
    max:250,
    defaultValue:''
  },
  jobId: {
    type: String,
    defaultValue: ''
  },
  typeNotifi:{
    type: String,
    defaultValue:''
  },
  href:{
    type:String,
    defaultValue:''
  },
  createdAt:{
    type: Date,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  }
});
export default NotificationSchema
