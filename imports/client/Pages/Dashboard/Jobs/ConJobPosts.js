import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import EmployerNoUpcomingJobs from './Upcoming/EmployerNoUpcomingJobs';

import MSpinner from '../../Shared/MSpinner';
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
        <EmployerNoUpcomingJobs/>
        </div>
      );
    }
  }
}
export default ConJobPosts = createContainer(( {props} ) => {
  let user = Meteor.user();
  let jobPost =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-employee',user._id);
    loading = handle.ready();
    console.log(loading);
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading:loading,
    jobPost:jobPost
  };
}, ContractorJobPosts);
