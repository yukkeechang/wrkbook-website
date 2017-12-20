import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ConComponent from '../Shared/ConComponent';
import { Link } from 'react-router-dom';
import EmployerNoJobs from '../Shared/EmployerNoJobs';
// import ConProfile from './ConProfile/ConProfile';
// import ProProfile from './ProProfile/ProProfile';

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ConCurrentPage extends React.Component {
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
      <div  className="container">
        {this.props.jobPost.map(function(job, index){
          return(
            <ConComponent
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
      })
    }
      </div>

    )
  }
  else {
    return (
        <EmployerNoJobs message={"current"}/>
    )
  }
 }
}



export default ConCurrent = createContainer((props) => {
  let jobPost=[]
  let loading = false
  let user = Meteor.user();
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('current-job-con');
    loading = handle.ready();
    console.log("loading "+loading);
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading: loading,
    jobPost: jobPost
  };
}, ConCurrentPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
