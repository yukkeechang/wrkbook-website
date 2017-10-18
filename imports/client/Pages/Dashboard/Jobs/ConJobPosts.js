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
      loading1: false
    }


  }
  handleChildLoad(isDone){

    this.setState({loading1:isDone && true});
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
<<<<<<< HEAD
                key= {index}
                jobinfo = {job}
                index = {index}
=======
                handleChildLoad={this.handleChildLoad.bind(this)}
                key={job._id}
                jobinfo = {job}
>>>>>>> 4170e989449958c53477b7255eafaee404db309f
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
    let handle = Meteor.subscribe('job-post-employer',user._id);
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
