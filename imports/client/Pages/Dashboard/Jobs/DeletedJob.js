import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MSpinner from '../../Shared/MSpinner';
import EmployeeMatch from './EmployeeMatch/EmployeeMatch';
import DeleteView from './Shared/DeletedJobView';
function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}
// Job = new Mongo.Collection('jobs');

class DeletedJ extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){

    if(!!this.props.notification){
      console.log(this.props.notification);
        Meteor.call('updateNotification',this.props.notification._id,(err)=>{
          console.log(err);
        })
      return(
        <div>
          <DeleteView
            job={this.props.job}
          />
        </div>
      );
    }
    else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
          <h1>NAH</h1>
      );
    }
  }
}
export default DeletedJob = withTracker( param  => {

  let loading = false;
  let handle = Meteor.subscribe('view-deleted-job',param.match.params.value);
  loading = handle.ready();
  let notification = Notification.find({}).fetch()[0];

  let jobObject = {}
  if(!!notification){
    jobObject  = JSON.parse(notification.jobId);
  }
  return{
    handle:handle,
    notification:notification,
    loading:loading,
    job:jobObject
  };
})(DeletedJ);