import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

import UserInfoComp from './UserInfoComp';
import DetailsComp from './ProJobListingComponents/DetailsComp';
import ReviewComp from './ProJobListingComponents/ReviewComp';
import { Link } from 'react-router-dom';


//Rendered in ConComponent

//Can't set res aas a state, not sure why
export default class ProJobListingPage extends React.Component {
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
   console.log(hours);
      return (
        <div className="card">

          <div className="row card grey lighten-1">
            <div className="col s12 center-align">
              <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'150%', margin:'0px'}} className="flow-text">Job Title: {this.props.job.jobTitle.text}</p></Link>
            </div>
            <div  className="col s12 left-align">
              <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'100%', margin:'0px'}} className="flow-text">Location: <u>{this.props.job.location.locationName}</u></p></Link>
            </div>
          </div>

          <div className="row">
              <UserInfoComp
                size={100}
                isPro={true}
                name={this.props.employerInfo.profile.firstName+" "+this.props.employerInfo.profile.lastName}
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
