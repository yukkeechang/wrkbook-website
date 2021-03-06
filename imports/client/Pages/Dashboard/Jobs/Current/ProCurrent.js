//make page for emp con import React from 'react';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ListingView from '../Shared/ProJobListingView';
import EmployeeNoJobs from '../Shared/EmployeeNoJobs';


class ProCurrentPage extends React.Component {
  constructor(props) {
    super(props);
  }


  componentWillUnmount(){
    this.props.handle.stop();
  }
  render() {
    let jobz = this.props.job;
    if(!this.props.loading) {
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      )
    }

    else if(this.props.job.length > 0) {
      return (
        <div>
          <h3 className="center-align">Current Jobs</h3>
        {jobz.map((job, index)=>{
          return(
            <ListingView
              key={job._id}
              job = {job}
              userId={this.props.userId}
              isCompeleted = {false}
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



export default ProCurrent = withTracker(props => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false

    let handle = Meteor.subscribe('current-job-pro');
    loading = handle.ready();
    jobPost = Job.find({}).fetch();

  return {
    handle:handle,
    userId: user._id,
    loading: loading,
    job: jobPost

  };
})(ProCurrentPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
