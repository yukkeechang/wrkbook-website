import React from 'react';
import MSpinner from '../../../Shared/MSpinner';
import ProJobListingComp from './ProJobListingComponent';
import { withTracker } from 'meteor/react-meteor-data';
class ProView extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (!this.props.ready) {
      return(
        <MSpinner/>
      );
    }else if (!!this.props.event) {
      return(
        <div className="container">
          <ProJobListingComp
            key={this.props.event._id}
            event={this.props.event}
            job={this.props.job}
            userId={this.props.userId}
            isCompeleted={this.props.isCompeleted}
            employerInfo={this.props.employerInfo}
            employerRating={this.props.employerRating}
            jobTypesIndex={this.props.jobTypesIndex}
          />
        </div>
      )
    }else{
      return(
        <h1> HALP</h1>
      )
    }
  }
}
export default ProJobListingView = withTracker(props =>  {
  //console.log(props);
  let job = props.job
  let employerId = props.job.employerId;
  let employerInfo={};
  let event = [];
  let reviews = [];
  let idxx2 = -1;

  for (let indx in job.admitAsIDs)  {
    if (job.admitAsIDs[indx].ids.indexOf(props.userId) != -1) {
      idxx2 = indx;
    }
  }

  let handle = Meteor.subscribe('get-event',job._id);
  let handleUser = Meteor.subscribe('other-user',employerId);
  let handleReview = Meteor.subscribe('reviews-for-user',employerId);
  let userReady = handleUser.ready();
  let ready = handle.ready();
  let readyReview = handleReview.ready();

  event = Event.find({_id:props.job.eventInfo[idxx2]}).fetch()[0];
  reviews = Review.find({revieweeId:employerId}).fetch();
   employerInfo = Meteor.users.findOne({_id:employerId});

  let dataArray = [];
  let avg = 0;
  //console.log(reviews);
  for(let index in reviews) {
      dataArray.push(reviews[index].rating);
  }
  let sum =  dataArray.length > 0 ?  dataArray.reduce(function(a, b) { return a + b; }) : 0;
  avg = dataArray.length > 0 ? (sum / dataArray.length): 0;


  return {
    ready: ready&&readyReview&&userReady,
    event: event,
    userId:Meteor.userId(),
    employerInfo:employerInfo,
    employerRating: avg,
    jobTypesIndex: idxx2,
    jobId: props.job._id,
    employerId:employerId,
  };
})(ProView);
