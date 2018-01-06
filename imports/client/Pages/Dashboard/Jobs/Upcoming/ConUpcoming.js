import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import MSpinner from '../../../Shared/MSpinner';
import ConJobPostComponent from '../ConJobPostComponent';
import EmployerNoJobs from '../Shared/EmployerNoJobs';

//---This page renders UPCOMING jobs for CONTRACTORS

function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class ConUpcomingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading1: false
    }
  }
  render(){
    if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else if(!isEmpty(this.props.jobPost)){
      let jobz = this.props.jobPost;
      let notifications = this.props.notifications;
      notifications.map(function(notify,index){
        Meteor.call('updateNotification',notify._id,(err)=>{
          console.log(err);
        });
      });
      return(
        <div>
        <h3 className="center-align">Upcoming Jobs</h3>
        <div className="container">

          <br/>
          {jobz.map(function(job, index){

            return(
              <ConJobPostComponent

                key={job._id}
                jobinfo = {job}
                events = {job.eventInfo}
                title={job.jobTypes.texts}
                startAt={job.startAt}
                endAt={job.endAt}
                description={job.description.text}
                location={job.location}
                pay={job.pay}
              />

            )
          }.bind(this))}
        </div>
      </div>
      );
    }
    else{
      return(
          <EmployerNoJobs message={"upcoming"}/>
      );
    }
  }
}
export default ConUpcoming = withTracker(props => {
  let user = Meteor.user();
  let jobPost =[];
  let notifications = [];
  let loading = false;
  let notifiloading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('upcoming-job-con');
    let notificationHandle = Meteor.subscribe('notifications-for-user');
    loading = handle.ready();
    notifiloading = notificationHandle.ready();

    notifications = Notification.find({typeNotifi:'APPLIED'}).fetch();
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading:loading,
    jobPost:jobPost,
    notifications:notifications
  };
})(ConUpcomingPage);
