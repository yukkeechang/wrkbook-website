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
import { formatSingleDate,formatSingleTime,getDurationDayHour} from './formatTime';
class ConJobListingPageComp extends React.Component {
 constructor(props) {
   super(props);
   this.state = {


   }

  }
  componentWillUnmount(){
    this.props.handle.stop();
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
   const {hours,days} = getDurationDayHour(this.props.event.startAt,this.props.event.endAt);
   let totalPay = hours * days * this.props.job.professionals[this.props.jobTypesIndex].pay;
   let jobDate = `${formatSingleDate(this.props.event.startAt)}-${formatSingleDate(this.props.event.endAt)}`;
   let jobTime = `${formatSingleTime(this.props.event.startAt)}-${formatSingleTime(this.props.event.endAt)}`;

   let profession = this.props.job.jobTypes.texts[this.props.jobTypesIndex];

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
    handle:handle,
    ready: eventReady&&reviewReady,
    employeeRating:avg,
    jobTypesIndex: idxx2,
    jobId: props.job._id,

  };
})(ConJobListingPageComp);
