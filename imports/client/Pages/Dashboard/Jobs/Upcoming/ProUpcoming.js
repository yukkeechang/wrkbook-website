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

class ProUpcomingJobsPage extends React.Component {
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
      <h3 className="center-align">Upcoming Jobs</h3>
      {jobz.map(function(job, index){
        return(
          <ProComponent

            key={job._id}
            jobinfo = {job}
            events = {job.eventInfo}
            title={job.jobTypes.texts}
            startAt={job.startAt}
            endAt={job.endAt}
            description={job.description.text}
            location={job.location}
            pay={job.pay}
            upcoming = {true}
          />
        )
      })}
      </div>
    )
  }
  else {
    return (
        <EmployeeNoJobs/>
      )
    }
  }
}



export default ProUpcoming = withTracker(props => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('upcoming-job-pro');
    loading = handle.ready();
    jobPost = Job.find({}).fetch();
    console.log(jobPost)
  }
  return {
    user: user,
    loading: loading,
    jobPost: jobPost
  };
})(ProUpcomingJobsPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
//Put all job posts in an array, map through the array and send job info as props to the child component
