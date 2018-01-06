import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MSpinner from '../../Shared/MSpinner';
import EmployerNoUpcomingJobs from './Shared/EmployerNoJobs';
import ConJobPostComponent from './ConJobPostComponent';

function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class ContractorJobPosts extends React.Component{
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
      return(
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
      );
    }
    else{
      return(
        <div>
        <EmployerNoUpcomingJobs
        message={"upcoming"}/>
        </div>
      );
    }
  }
}
export default ConJobPosts = withTracker(props => {
  let user = Meteor.user();
  let jobPost =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-employer');
    loading = handle.ready();
    console.log(loading);
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading:loading,
    jobPost:jobPost
  };
})(ContractorJobPosts);
