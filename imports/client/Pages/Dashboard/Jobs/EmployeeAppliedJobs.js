import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import MSpinner from '../../Shared/MSpinner';
import EmployeeMatch from './EmployeeMatch/EmployeeMatch';
import EmployeeNoJobs from './Shared/EmployeeNoJobs';

class EmployeeJob extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){

    if(this.props.jobPost.length > 0){
      let jobz = this.props.jobPost;
      return(
        <div>
          <br/>
          {jobz.map(function(job, index){
            return(
              <EmployeeMatch
                userId={this.props.userId}
                key={job._id}
                jobinfo = {job}
                events = {job.eventInfo}
                title={job.jobTitle.text}
                description={job.description.text}
                location={job.location.locationName}
              />
            )
          }.bind(this))}
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
          <EmployeeNoJobs
          message={"applied"}/>
      );
    }
  }
}
export default Applied = withTracker( params  => {
  let userId = Meteor.userId();
  let jobPost =[];
  let loading = false;
  let handle = Meteor.subscribe('job-post-applied');
  loading = handle.ready();
  jobPost = Job.find({}).fetch();
  return{
    handle:handle,
    userId: userId,
    loading:loading,
    jobPost:jobPost
  };
})(EmployeeJob);
