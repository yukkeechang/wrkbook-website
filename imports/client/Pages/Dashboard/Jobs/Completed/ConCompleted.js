
/**
 *
 * @class
 * @classdesc This file will render all completed jobs. job details are renderend in ConComponent
 *
 */
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import SelectConJobList from '../Shared/SelectConJobListView';
import { Link } from 'react-router-dom';
import EmployerNoJobs from '../Shared/EmployerNoJobs';
import JobButton from '../Shared/ConJobListingComponents/CreateJobButton';




function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ConCompletedJobsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      titleFontSize: 40,
      index:0
    }
  }

  textSize() {
    let width = document.body.scrollWidth;
    if (width >= 600) {
      this.setState({
        titleFontSize: 40

      });
    } else if (width >= 375){
      this.setState({
        titleFontSize: 30

      });
    } else {
      this.setState({
        titleFontSize: 25

      });
    }
  }
  handleChangeIndex(index){
    this.setState({index:index});
  }

  componentWillUnmount(){
    this.props.handle.stop();
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
  else if(!(isEmpty(this.props.job))) {
    let jobz = this.props.job;
    console.log("NUTTT");
    return (
      <div>
        <div className="row" style={{paddingTop: '10px'}}>
          <div>
          <h1 className="center-align" style={{fontSize: this.state.titleFontSize}}>Completed Jobs</h1>
        </div>
        </div>
        {jobz.map((job, index)=>{
          return (
            <SelectConJobList
              key={job._id}
              job = {job}
              isCompeleted={true}
              isUpcoming={false}
            />
          )

        })}
        <JobButton/>
      </div>
    )
  }
  else {
    return (
        <EmployerNoJobs message={"completed"}/>
      )
    }
  }
}



export default ConCompleted = withTracker(props => {

  let jobPost=[]
  let loading = false
  let handle = Meteor.subscribe('closed-job-con');
  loading = handle.ready();
  jobPost = Job.find({}).fetch();

  return {
    handle:handle,
    loading: loading,
    job: jobPost
  };
})(ConCompletedJobsPage);
