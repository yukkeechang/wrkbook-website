//make page for emp con import React from 'react';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ConComponent from './ConComponent';
import { Link } from 'react-router-dom';

//This file will render all completed jobs. job details are renderend in ConComponent


function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ConCompletedJobsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      titleFontSize: 40
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

  NoCompleteJob() {
    return (
      <div className="card-panel  center-align">
          <img src="/images/hardhat.png" height="150" width="150" />
          <h5>You dont have any completed jobs!</h5>
          <Link to={"/createjob"} className="btn">
            <div className="col s12 m12 l12">
                  Create a New Job!
            </div>
            </Link>
      </div>
    )
  }


render() {
  let jobz = this.props.jobPost;
  str = JSON.stringify(jobz);
//  console.log("jobs: "+str)
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
        <div>
          <h1 className="center-align" style={{fontSize: this.state.titleFontSize}}>Completed Jobs</h1>
        </div>
        {jobz.map(function(job, index){
          return (
            <ConComponent
            key={job._id}
            jobinfo = {job}
            events = {job.eventInfo}
            title={job.jobTitle.text}
            startAt={job.startAt}
            endAt={job.endAt}
            description={job.description.text}
            location={job.location.locationName}
            pay={job.pay}

            />
          )

        })}

      </div>
    )
  }
  else {
    return (
      <div>
      {this.NoCompleteJob()}
      </div>
      )
    }
  }
}



export default ConCompleted = createContainer(({props}) => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('closed-job-con');
    loading = handle.ready();
    //console.log("loading: "+loading);
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
