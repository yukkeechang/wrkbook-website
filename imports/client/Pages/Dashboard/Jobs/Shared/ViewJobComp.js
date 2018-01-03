// Component holds user image, user first and last name and rating for the
// company or the indivudal and displays on EmployeeComponentInner.js
import React from 'react';
import MSpinner from '../../../Shared/MSpinner';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import EmpJobPostComponent from '../EmpJobPostComponent';
import ConJobPostComponent from '../ConJobPostComponent';
class ViewJob extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);
    console.log(this.props);
  }
  render(){

    if(!this.props.ready){
      return(
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      )
    }
    else if(!!this.props.jobPost){
      if(Roles.userIsInRole(this.props.userId,"CON")){
        let job = this.props.jobPost;
        return(
          <div>
          <ConJobPostComponent

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
          </div>

        )
      } else if (Roles.userIsInRole(this.props.userId,"PRO")) {
          let job = this.props.jobPost;

          return(
            <div>
              <EmpJobPostComponent
                key={job._id}
                jobinfo = {job}
                events = {job.eventInfo}
                title={job.jobTitle.text}
                startAt={job.startAt}
                endAt={job.endAt}
                description={job.description.text}
                location={job.location}
                pay={job.pay}
              />
            </div>
            )
      }else{
        return (
          <h1>LOL WHAT IS U DOING</h1>
        )
      }
    }
    else{
      return(
      <h1> GG</h1>
    );
    }
  }
}

export default ViewJobComp = withTracker(props=>{
  const handle = Meteor.subscribe('one-job',props.match.params.value);
  const ready  = handle.ready();
  let jobPost = Job.find({}).fetch()[0];
  return {
      loggingIn: Meteor.loggingIn(),
      ready: ready,
      userId: Meteor.userId(),
      jobPost: jobPost,
  };
})(ViewJob);
