import React from 'react';
import ReactDOM from 'react-dom';
import ApplyDeclineButton from './EmployeeMatchedPageComponents/ApplyDeclineButton';
import Requirements from './EmployeeMatchedPageComponents/JobRequirments';
import SuperVisor from  './EmployeeMatchedPageComponents/SupervisorInfo';
import { withTracker } from 'meteor/react-meteor-data';
import JobLocation from './EmployeeMatchedPageComponents/JobLocation';

class EmpJobPost extends React.Component{
  componentDidMount(){

    let select = ReactDOM.findDOMNode(this.refs.jobEvent);
    $(select).ready(()=>{
      $('select').material_select();
    });
    $(this.refs.jobEvent).on('change',(e)=>{
      this.changeEventDate(e);
    });

    Meteor.call('getEventInfo',this.props.events[0],(err,res)=>{
      if(err){
        console.log(err);
      }else{
        const  oneDay = 24*60*60*1000;
        let endtime = res.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let starttime = res.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let enddate = (res.endAt.getMonth() + 1) + "/" + res.endAt.getDate()  + "/" + res.endAt.getFullYear();
        let startdate = (res.startAt.getMonth() + 1) + "/" + res.startAt.getDate()  + "/" + res.startAt.getFullYear();
        let startAt = startdate+','+starttime;
        let endAt = enddate+','+endtime;
        console.log(res.endAt.getDate());
        console.log(res.startAt.getDate());
        let duration = Math.round(Math.abs((res.endAt.getTime() - res.startAt.getTime())/(oneDay))) + ' days, '+
        (res.endAt.getHours()-res.startAt.getHours()) + ' hours';
        this.setState({
          endAt: endAt,
          startAt: startAt,
          duration:duration
        });
      }
    });


  }
  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;

    let dLat = this.degreesToRadians(lat2-lat1);
    let dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
  }
  constructor(props){
    super(props);
    this.state={
      id: this.props.jobinfo._id,
      index: 0,
      endAt: '',
      startAt: '',
      osha10: this.props.jobinfo.requirements.osha.osha10,
      osha30: this.props.jobinfo.requirements.osha.osha30,
      license: this.props.jobinfo.requirements.driverLicense,
    };

  }
  changeEventDate=()=>{
    let jobTitles = this.props.jobinfo.jobTypes.texts;
    let index = jobTitles.indexOf(this.refs.jobEvent.value);
    console.log(index);
    Meteor.call('getEventInfo',this.props.events[index],(err,res)=>{
      if(err){
        console.log(err);
      }else{
        console.log(index);
        const  oneDay = 24*60*60*1000;
        let endtime = res.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let starttime = res.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let enddate = (res.endAt.getMonth() + 1) + "/" + res.endAt.getDate()  + "/" + res.endAt.getFullYear();
        let startdate = (res.startAt.getMonth() + 1) + "/" + res.startAt.getDate()  + "/" + res.startAt.getFullYear();
        let startAt = startdate+','+starttime;
        let endAt = enddate+','+endtime;
        let duration = Math.round(Math.abs((res.endAt.getTime() - res.startAt.getTime())/(oneDay))) + ' days, '+
        (res.endAt.getHours()-res.startAt.getHours()) + ' hours';
        this.setState({
          endAt: endAt,
          startAt: startAt,
          index:index,
          duration:duration

        });
      }
    });
  }


  render(){
    let isAdmitted = this.props.jobinfo.admitemployeeIds.includes(this.props.userId);
    let isApplied = this.props.jobinfo.applyemployeeIds.includes(this.props.userId)|| isAdmitted;
    let isDecline = this.props.jobinfo.declineemployeeIds.includes(this.props.userId);
    console.log(isApplied);
    let addArr = this.props.location.split(",");

    let parsedAddress = addArr[1]+","+addArr[2]+","+addArr[4];
    this.props.notifications.map(function(notify,index){
      Meteor.call('updateNotification',notify._id,(err)=>{
        console.log(err);
      });
    });
    let userLocation = Meteor.user().profile.employeeData.location;
    console.log(userLocation);
    let distance = this.distanceInKmBetweenEarthCoordinates(userLocation.latitude,
                    userLocation.longitude,this.props.jobinfo.location.latitude,
                  this.props.jobinfo.location.longitude);
    distance *= 0.62;
    let distanceFormat = Math.round(distance);
    return(
    <div ref={this.state.id+"11"}>

      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="col l12 m12 s12">

              <SuperVisor jobTitle={this.props.jobinfo.jobTitle.text}
                        jobID= {this.props.jobinfo._id}
                        isAdmitted={this.props.jobinfo.admitemployeeIds.includes(Meteor.userId())}
                        isDecline={isDecline}
                        supervisorName={this.props.jobinfo.supervisor.name}
                        supervisorPhone={this.props.jobinfo.supervisor.phone}/>

              <div className="row">
                <div className="col s8">
                  <select ref="jobEvent" id="jobEvent">
                    {this.props.jobinfo.jobTypes.texts.map((title, index)=>{
                      return(
                        <option key={index} value={title} >{title}</option>
                      )
                    })}
                  </select>
                </div>
              </div>

              <div className="row">
                  <div className="col l4 m4 s12">
                    <p><b>Start time: </b>{this.state.startAt}</p>
                    <br/>
                    <p><b>End time: </b>{this.state.endAt}</p>
                    <br/>
                    <p><b>Job Duration: </b> {this.state.duration}</p>
                        {this.props.jobinfo.requirements.weekendExcluded ? <p><i>Weekends are excluded for this job*</i></p> : <p><i>Weekends are not excluded for this job*</i></p>}
                  </div>

                  <div className="col l4 m4 s12">
                    <p><b>Pay: </b>${this.props.jobinfo.professionals[this.state.index].pay}/hourly</p>
                    <br/>
                    <p><b>Location: </b>{parsedAddress}</p>
                    <br/>
                    <p><b>Distance From You:</b> {distanceFormat} miles</p>
                  </div>

                  <div className="col l4 m4 s12">
                    <p><b>Professionals needed: </b>{this.props.jobinfo.professionals[this.state.index].numWorkers}</p>
                  </div>

                </div>
              <div className="row">
                <div className="col l4 m6 s12">
                  <p><b>Description: </b>{this.props.jobinfo.description.text}</p>
                  <br/>
                  <p><b>Responsibilities: </b>{this.props.jobinfo.professionals[this.state.index].responsibilities}</p>
                  <br/>
                  <p><b>Certifications Required: </b></p>
                    <Requirements osha10={this.props.jobinfo.requirements.osha.osha10}
                    osha30={this.props.jobinfo.requirements.osha.osha30}
                    license={this.props.jobinfo.requirements.driverLicense}/>


                </div>
                <div className="col l7 m6 s12 ">
                  <JobLocation latitude={this.props.jobinfo.location.latitude} longitude={this.props.jobinfo.location.longitude} height={'350px'}/>
                </div>


              </div>

              {!this.props.isCompleted ?
              <ApplyDeclineButton
                jobID={this.state.id}
                isApplied={isApplied}
                isDecline={isDecline}
                jobTitles={this.props.jobinfo.jobTypes.texts}
              />
              :
              <div className="center-align">
                <a className="btn disabled">Job Completed</a>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default EmpJobPostPage = withTracker(props=>{
  let notifications =[];
  let notifiloading =false;

  let notificationHandle = Meteor.subscribe('notifications-for-user')
  notifiloading = notificationHandle.ready();

  notifications = Notification.find({$or:[{typeNotifi:'HIRED',seen:false,jobId:props.jobinfo._id},{typeNotifi:'MATCH',seen:false,jobId:props.jobinfo._id}]}).fetch();


  return {
    notifications:notifications,
    ready : notifiloading,
  };


})(EmpJobPost);
