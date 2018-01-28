import React from 'react';
import MSpinner from '../../Shared/MSpinner';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import EmployeeView from './EmployeeMatch/EmployeeMatch';
import ContractorView from './JobDetailView/ConDetailJobView';
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
          <ContractorView
            userId={this.props.userId}
            isUpcoming={job.generalStart > new Date() ? true : false}
            isCompleted={job.generalEnd < new Date() ? true : false}
            key={job._id}
            jobinfo = {job}
            events = {job.eventInfo}
            title={job.jobTypes.texts}
            description={job.description.text}
            location={job.location}
          />


        )
      } else if (Roles.userIsInRole(this.props.userId,"PRO")) {
          let job = this.props.jobPost;

          return(
            <EmployeeView
              userId={this.props.userId}
              key={job._id}
              ref={job._id+"123"}
              jobinfo = {job}
              events = {job.eventInfo}
              title={job.jobTitle.text}
              description={job.description.text}
              location={job.location.locationName}
              isCompleted={job.generalEnd < new Date() ? true : false}
            />
            )
      }else{
        return (
          <h1>NOT AUTHORIZED</h1>
        )
      }
    }
    else{
      return(
      <h1> JOB DONT EXIST </h1>
    );
    }
  }
}

export default DetailView = withTracker(props=>{
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
