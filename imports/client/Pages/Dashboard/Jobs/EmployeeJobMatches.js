import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MSpinner from '../../Shared/MSpinner';
import EmployeeMatch from './EmployeeMatch/EmployeeMatch';
import EmployeeNoJobs from './Shared/EmployeeNoJobs';

class EmployeeJobPosts extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.jobPost.length > 0){
      let notifications = this.props.notifications;
      notifications.map(function(notify,index){
        Meteor.call('updateNotification',notify._id,(err)=>{
          console.log(err);
        });
      });

      return(
        <div>
          { this.props.jobPost.map((job,index)=>{

            return(
              <EmployeeMatch
                key={job._id}
                userId={this.props.userId}
                ref={job._id+"123"}
                jobinfo = {job}
                events = {job.eventInfo}
                title={job.jobTitle.text}
                description={job.description.text}
                location={job.location.locationName}

              />
            )
          })}
        </div>
      );
    }
    else if(!this.props.loading){
      return (
        <div className="flex-center">
          <MSpinner />
        </div>
      );
    }
    else{

      return(
          <EmployeeNoJobs
          message={"matches"}/>
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

    let handle = Meteor.subscribe('job-post',user.profile.employeeData);
    let notificationHandle = Meteor.subscribe('notifications-for-user');

    loading = handle.ready();
    notifiloading = notificationHandle.ready();

    jobPost = Job.find({},{sort: {generalStart: 1}}).fetch();
    notifications = Notification.find({typeNotifi:'MATCH'}).fetch();


  return{
    userId: user._id,
    loading:loading,
    jobPost:jobPost,
    notifications:notifications,
  };
})(EmployeeJobPosts);
