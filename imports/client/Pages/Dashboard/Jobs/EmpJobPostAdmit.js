import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import EmpJobPosts from './EmpJobPosts';

function isEmpty(obj) {
   for (var x in obj) { return false; }
   return true;
}
class JobPostsAdmit extends Component {
  constructor(props){
    super(props);
  }
  render(){
    if(!isEmpty(this.props.jobPost)){
      let jobz = this.props.jobPost;
      return(
        <div>
          {jobz.map(function(job, index){
            return(
              <EmpJobPosts
                key={index}
                isAdmitted={true}
                jobinfo ={job}
                title={job.title.text}
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
    }else if(!this.props.loading){
      return(
        console.log("insert spinner")

      );
    }
    else{
      return(
        <h1>Sorry No Jobs</h1>
      );
    }
  }
}
export default EmpJobPostsAdmit= createContainer(({ params }) => {
  let user = Meteor.user();
  let jobPost =[];
  let loading = false;
  let hackIdThing =[];
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-admitted',user._id);
    loading = handle.ready();
    hackIdThing[0] = user._id;
    jobPost = Job.find({admitemployeeIds: {$in: hackIdThing}}).fetch();
    console.log(jobPost);
  }
  return{
    user: user,
    loading:loading,
    jobPost:jobPost
  };
}, JobPostsAdmit);
