import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import UserInfoComp from './UserInfoComp';
import DetailsComp from './ConJobListingComponents/EmployeeDetailComp';
import DateComp from './ConJobListingComponents/DateComp';
import ReviewComp from './ConJobListingComponents/ReviewComp';
import { Link } from 'react-router-dom';

class ConJobListingPageComp extends React.Component {
 constructor(props) {
   super(props);
   this.state = {


   }

  }
  componentWillMount(){

  }
  componentDidMount(){

  }

 textSize() {
  let width = document.body.scrollWidth;
  if (width >= 600) {
    this.setState({
      labelFontSize: 30
    });
   }  else if (width >= 375){
    this.setState({
      labelFontSize: 20
    });
   }  else {
    this.setState({
      labelFontSize: 18
     });
   }
 }

 render() {

   if(!this.props.ready){
     return(
       <MSpinner/>
     )
   }else{
   let hours = Math.abs(this.props.event.endAt.getHours() - this.props.event.startAt.getHours());
   let timediff = Math.abs(this.props.event.endAt.getTime() - this.props.event.startAt.getTime());
   let days = Math.ceil(timediff / (1000 * 3600 * 24));
   let totalPay = hours * days * this.props.job.professionals[this.props.jobTypesIndex].pay;
   let endtime = this.props.event.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   let starttime = this.props.event.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   let enddate = (this.props.event.endAt.getMonth() + 1) + "/" + this.props.event.endAt.getDate()  + "/" + this.props.event.endAt.getFullYear();
   let startdate = (this.props.event.startAt.getMonth() + 1) + "/" + this.props.event.startAt.getDate()  + "/" + this.props.event.startAt.getFullYear();
   let jobDate = startdate+" - "+ enddate ;
   let jobTime = starttime+ " - "+endtime;
   //console.log( this.props.job.jobTypes);
   let profession = this.props.job.jobTypes.texts[this.props.jobTypesIndex];

   //console.log(this.props);
      return (
        <div className="card-content">

          <div className="row">
              <UserInfoComp
                size={100}
                isPro={false}
                name={this.props.employeeInfo.profile.firstName+" "+this.props.employeeInfo.profile.lastName}
                ratingValue={this.props.employeeRating}
                imageId={this.props.employeeInfo.profile.employeeData.image}
              />

              {
                !this.props.isCompeleted ?
                <DateComp
                    profession={profession}
                    jobDate={jobDate}
                    jobTime={jobTime}
                    />
                :
                <EmployeeDetail
                  profession={profession}
                  jobDate={jobDate}
                  jobTime={jobTime}
                  weekendExcluded={this.props.job.requirements.weekendExcluded}
                  hourPay={ this.props.job.professionals[this.props.jobTypesIndex].pay}
                  dayPay={hours*this.props.job.professionals[this.props.jobTypesIndex].pay}
                  />

              }

              <ReviewComp
                jobId={this.props.job._id}
                proId={this.props.employeeInfo._id}
                conId={this.props.userId}
                hourPay={ this.props.job.professionals[this.props.jobTypesIndex].pay}
                dayPay={hours*this.props.job.professionals[this.props.jobTypesIndex].pay}
                isCompeleted={this.props.isCompeleted}

              />


          </div>
          <div className="divider"/>
        </div>
      )
    }
  }
}

export default ConJobListingPage = withTracker(props =>  {
  let job = props.job;

  let reviews =[];
  let event = [];
  let idxx2 = -1;
  let dataArray = [];
  let avg = 0;

  let userId = Meteor.userId();


  let handleReview = Meteor.subscribe('reviews-for-user',props.employeeInfo._id);
  let handle = Meteor.subscribe('get-event',job._id);


  let reviewReady = handleReview.ready();
  let eventReady = handle.ready();

  reviews = Review.find({revieweeId:props.employeeInfo._id}).fetch();

  //console.log(reviews);
  for(let index in reviews) {
      dataArray.push(reviews[index].rating);
  }
  let sum =  dataArray.length > 0 ?  dataArray.reduce(function(a, b) { return a + b; }) : 0;
  avg = dataArray.length > 0 ? (sum / dataArray.length): 0;

  for (let indx in job.admitAsIDs)  {
    if (job.admitAsIDs[indx].ids.indexOf(props.employeeInfo._id) != -1) {
      idxx2 = indx;
    }
  }
  event = Event.find({_id:props.job.eventInfo[idxx2]}).fetch()[0];

  return {
    userId:userId,
    event:event,
    ready: eventReady&&reviewReady,
    employeeRating:avg,
    jobTypesIndex: idxx2,
    jobId: props.job._id,

  };
})(ConJobListingPageComp);
