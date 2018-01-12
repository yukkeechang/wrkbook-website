import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ProComponent from '../Shared/ProComponent';
import EmployeeNoJobs from '../Shared/EmployeeNoJobs';

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ProCompletedJobsPage extends React.Component {
  constructor(props) {
    super(props);
  }



render() {
  let jobz = this.props.jobPost;
  if(!this.props.loading) {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
        <MSpinner />
      </div>
    )
  }

  else if(!(isEmpty(jobz))) {
    return (
      <div>
      <h3 className="center-align">Completed Jobs</h3>
      {jobz.map(function(job, index){
        return(
          <ProComponent
            key = {job._id}
            job = {job}
            events = {job.eventInfo}
            title = {job.jobTitle.text}
            startAt = {job.startAt}
            endAt = {job.endAt}
            description = {job.description.text}
            location = {job.location}
            pay = {job.pay}
            current = {true}
          />
        )
      })}
      </div>
    )
  }
  else {
    return (
      <EmployeeNoJobs
      message={"completed"}/>
      )
    }
  }
}



export default ProCompleted = withTracker(props => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('completed-job-pro');
    loading = handle.ready();
    jobPost = Job.find({isOpen:false}).fetch();
    console.log("JOB POST: "+jobPost)
  }
  return {
    user: user,
    loading: loading,
    jobPost: jobPost
  };
})(ProCompletedJobsPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
//Put all job posts in an array, map through the array and send job info as props to the child component
