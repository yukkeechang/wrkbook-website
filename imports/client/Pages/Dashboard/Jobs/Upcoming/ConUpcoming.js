import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import MSpinner from '../../../Shared/MSpinner';
// import ConJobPostComponent from '../ConJobPostComponent';
import SelectConJobList from '../Shared/SelectConJobListView';
import JobButton from '../Shared/ConJobListingComponents/CreateJobButton';
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
      loading1: false,
      index:0
    }
  }
  componentWillUnmount(){
    this.props.handle.stop();
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

      return(
        <div className="row">
          <div className="row" style={{paddingTop: '10px'}}>
            <div className="center-align " style={{fontSize: '50px'}}>
            Upcoming Jobs
            </div>

        </div>
        <div>
          <br/>
          {jobz.map(function(job, index){

            return(
            <SelectConJobList
              key={job._id}
              job = {job}
              isCompeleted={false}
              isUpcoming={true}
            />

            )
          }.bind(this))
        }
        </div>
        <JobButton/>
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

    let handle = Meteor.subscribe('upcoming-job-con');
    // let notificationHandle = Meteor.subscribe('notifications-for-user');
    loading = handle.ready();
    // notifiloading = notificationHandle.ready();
    //
    // notifications = Notification.find({typeNotifi:'APPLIED'}).fetch();
    jobPost = Job.find({}).fetch();

  return {
    user:user,
    handle:handle,
    loading:loading,
    jobPost:jobPost,
    // notifications:notifications
  };
})(ConUpcomingPage);
