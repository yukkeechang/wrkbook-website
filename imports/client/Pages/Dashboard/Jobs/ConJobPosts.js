import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import EmployerNoUpcomingJobs from '../../EmployerNoUpcomingJobs';

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

    }
  }
  render(){
    if(!isEmpty(this.props.jobPost)){
      let jobz = this.props.jobPost;
      return(
        <div className="container">
          <br/>
          {jobz.map(function(job, index){
            return(
              <ConJobPostComponent
                key={index}
                jobinfo ={job}
                title={job.jobTypes.texts}
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
    else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
        <div>
        <EmployerNoUpcomingJobs/>
        <h1>You have no current jobs</h1>
        </div>
      );
    }
  }
}
export default ConJobPosts = createContainer(({ params }) => {
  let user = Meteor.user();
  let jobPost =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-employer',user._id);
    loading = handle.ready();
    jobPost = Job.find({}).fetch();
    console.log(jobPost);
  }
  return {
    user: user,
    loading:loading,
    jobPost:jobPost
  };
}, ContractorJobPosts);
