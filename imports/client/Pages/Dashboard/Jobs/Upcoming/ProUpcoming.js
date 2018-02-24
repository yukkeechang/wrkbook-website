import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ListingView from '../Shared/ProJobListingView';
import EmployeeNoJobs from '../Shared/EmployeeNoJobs';

//---This page renders UPCOMING jobs for PROFESSIONALS

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ProUpcomingJobsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
render() {
  let jobz = this.props.job;
  console.log(this.props);
  console.log(this.props.job.length >1 );
  if(!this.props.ready) {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
        <MSpinner />
      </div>
    )
  }

  else if(this.props.job.length >0 ) {
    let notifications = this.props.notifications;
    notifications.map(function(notify,index){
      Meteor.call('updateNotification',notify._id,(err)=>{
        console.log(err);
      });
    });
    console.log("we in it boiii");
    return (
      <div>
      <h3 className="center-align">Upcoming Jobs</h3>
      {jobz.map(function(job, index){
        return(
          <ListingView
            key={job._id}
            job = {job}
            userId={this.props.userId}
            isCompeleted = {false}
          />
        )
      }.bind(this))}
      </div>
    )
  }
  else {
    console.log("in here");
    return (
        <EmployeeNoJobs
        message={"upcoming"}/>
      )
    }
  }
}



export default ProUpcoming = withTracker(props => {
  let user = Meteor.userId();
  let jobPost=[];
  let notifications = [];
  let ready = false;
  let notifiloading = false;

  let handle = Meteor.subscribe('upcoming-job-pro');
  let notificationHandle = Meteor.subscribe('notifications-for-user');
  ready = handle.ready();
  notifiloading = notificationHandle.ready();

  notifications = Notification.find({typeNotifi:'HIRED'}).fetch();
  jobPost = Job.find({}).fetch();

  return {
    handle:handle,
    userId: user,
    ready: ready,
    job: jobPost,
    notifications:notifications
  };
})(ProUpcomingJobsPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
//Put all job posts in an array, map through the array and send job info as props to the child component
