import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';
import { formatSingleDate,formatSingleTime,getDurationDayHour} from './formatTime';
import UserInfoComp from './UserInfoComp';
import DetailsComp from './ProJobListingComponents/DetailsComp';
import ReviewComp from './ProJobListingComponents/ReviewComp';
import { Link } from 'react-router-dom';



export default class ProJobListingPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {


   }

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
   const {hours,days} = getDurationDayHour(this.props.event.startAt,this.props.event.endAt);
   let totalPay = hours * days * this.props.job.professionals[this.props.jobTypesIndex].pay;
   let jobDate = `${formatSingleDate(this.props.event.startAt)}-${formatSingleDate(this.props.event.endAt)}`;
   let jobTime = `${formatSingleTime(this.props.event.startAt)}-${formatSingleTime(this.props.event.endAt)}`;
      return (
        <div className="card">

          <div className="row">
            <div className="card grey lighten-1">
              <div  className="row">
                <div className="col s12 center-align">
                  <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'2em', margin:'0px'}}>Job Title: {this.props.job.jobTitle.text}</p></Link>
                </div>
              </div>
              <div className="row">
                <div className="col s12 center-align">
                  <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'1.5em', margin:'0px'}} >Location: <u>{this.props.job.location.locationName}</u></p></Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row card-content">
              <UserInfoComp
                size={100}
                isPro={true}
                name={this.props.employerInfo.profile.employerData.companyName.text}
                ratingValue={this.props.employerRating}
                imageId={this.props.employerInfo.profile.employerData.image}
              />


              <DetailsComp
                isCompeleted={this.props.isCompeleted}
                pay={totalPay}
                jobDate={jobDate}
                jobTime={jobTime}
                weekendExcluded={this.props.job.requirements.weekendExcluded}
                responsibilities={this.props.event.responsibilities.text}
              />

              <ReviewComp
                jobId={this.props.job._id}
                proId={this.props.userId}
                conId={this.props.employerInfo._id}
                hourPay={ this.props.job.professionals[this.props.jobTypesIndex].pay}
                dayPay={hours*this.props.job.professionals[this.props.jobTypesIndex].pay}
                isCompeleted={this.props.isCompeleted}

              />


          </div>
        </div>
      )
    }
 }
