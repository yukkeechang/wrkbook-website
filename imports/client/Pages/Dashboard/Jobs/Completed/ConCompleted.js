//make page for emp con import React from 'react';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import ConComponent from './ConComponent';

class ConCompletedJobsPage extends React.Component {
  constructor(props) {
    super(props);
  }

render() {
  return (
    <div>
    Con completed component
    </div>
  )
 }
}

export default ConCompleted = createContainer((props) => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-employer',user._id);
    loading = handle.ready();
    console.log("loading "+loading);
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading: loading,
    jobPost: jobPost
  };
}, ConCompletedJobsPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
