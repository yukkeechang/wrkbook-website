import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import EmployerNoUpcomingJobs from './EmployerNoUpcomingJobs';
import { Link } from 'react-router-dom';
import MSpinner from '../../../Shared/MSpinner';
import ConComponent from './ConComponent';

function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class ConUpcomingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading1: false
    }
  }

  NoUpcomingJob() {
    return (
      <div className="card-panel  center-align">
          <img src="/images/hardhat.png" height="150" width="150" />
          <h5>You dont have any upcoming jobs!</h5>
          <Link to={"/createjob"} className="btn">
            <div className="col s12 m12 l12">
                  Create a New Job!
            </div>
            </Link>
      </div>
    )
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
        <div>
        <h3 className="center-align">Upcoming Jobs</h3>
        <div className="container">

          <br/>
          {jobz.map(function(job, index){

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
          }.bind(this))}
        </div>
      </div>
      );
    }
    else{
      return(
        <div>
        {this.NoUpcomingJob()}
        </div>
      );
    }
  }
}
export default ConUpcoming = createContainer(( {props} ) => {
  let user = Meteor.user();
  let jobPost =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('upcoming-job-con',user._id);
    loading = handle.ready();
    console.log(loading);
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading:loading,
    jobPost:jobPost
  };
}, ConUpcomingPage);
