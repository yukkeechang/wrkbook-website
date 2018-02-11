import React from 'react';
import JobButton from '../Shared/ConJobListingComponents/CreateJobButton';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import SelectConJobList from '../Shared/SelectConJobListView';
import { Link } from 'react-router-dom';
import EmployerNoJobs from '../Shared/EmployerNoJobs';

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ConCurrentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index:0
    }
  }


render() {
  console.log(this.props);
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
        <div className="row">
          <h1 className="center-align">Current Jobs</h1>
        </div>

        {this.props.jobPost.map((job, index)=>{
          return(
            <SelectConJobList
              key={job._id}
              job = {job}
              isCompeleted={false}
              isUpcoming={false}
            />
          )
      })
    }
      <JobButton/>
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



export default ConCurrent = withTracker(props => {
  let jobPost=[]
  let loading = false



  let handle = Meteor.subscribe('current-job-con');
  loading = handle.ready();
  jobPost = Job.find({}).fetch();

  return {
    loading: loading,
    jobPost: jobPost
  };
})(ConCurrentPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
