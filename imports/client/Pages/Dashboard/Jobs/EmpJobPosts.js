import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MSpinner from '../../Shared/MSpinner';
import EmpJobPostComponent from './EmpJobPostComponent';
import EmployeeNoJobs from './Shared/EmployeeNoJobs';
function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}
// Job = new Mongo.Collection('jobs');

class EmployeeJobPosts extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    if(!isEmpty(this.props.jobPost)){
      let notifications = this.props.notifications;
      notifications.map(function(notify,index){
        Meteor.call('updateNotification',notify._id,(err)=>{
          console.log(err);
        });
      });

      return(
        <div>
          { this.props.jobPost.map((job,index)=>{
            console.log(job._id);
            return(
              <EmpJobPostComponent
                key={job._id}
                jobinfo = {job}
                events = {job.eventInfo}
                title={job.jobTitle.text}
                startAt={job.startAt}
                endAt={job.endAt}
                description={job.description.text}
                location={job.location}
                pay={job.pay}
              />
            )
          })}
        </div>
      );
    }
    else if(!this.props.loading && !this.props.notifiloading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
          <EmployeeNoJobs/>
      );
    }
  }
}
export default EmpJobPosts = withTracker( params  => {
  let user = Meteor.user();
  let jobPost =[];
  let notifications = [];
  let loading = false;
  let notifiloading = false;
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post',user.profile.employeeData);
    let notificationHandle = Meteor.subscribe('notifications-for-user');

    loading = handle.ready();
    notifiloading = notificationHandle.ready();

    jobPost = Job.find({},{sort: {generalStart: 1}}).fetch();
    notifications = Notification.find({typeNotifi:'MATCH'}).fetch();

  }
  return{
    user: user,
    loading:loading,
    jobPost:jobPost,
    notifications:notifications
  };
})(EmployeeJobPosts);
