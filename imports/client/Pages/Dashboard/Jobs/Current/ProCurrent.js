//make page for emp con import React from 'react';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';

// import ConProfile from './ConProfile/ConProfile';
// import ProProfile from './ProProfile/ProProfile';
function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ProCurrentPage extends React.Component {
  constructor(props) {
    super(props);
  }





render() {
  if(!this.props.loading) {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
        <MSpinner />
      </div>
    )
  }
  else if(!(isEmpty(this.props.jobPost))) {
    return (
      <div>
        job post goes here
      </div>
    )
  }
  else {
    return (
      <div>
      no current jobs
      </div>
    )
  }
 }
}



export default ProCurrent = createContainer((props) => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('current-job-pro',user._id);
    loading = handle.ready();
    console.log("loading "+loading);
    jobPost = Job.find({}).fetch();
    // console.log("job");
    // console.log(jobPost);
  }
  return {
    user: user,
    loading: loading,
    jobPost: jobPost
  };
}, ProCurrentPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
