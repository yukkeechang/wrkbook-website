import React from 'react';
import ReactDOM from 'react-dom';
import ApplyDeclineButton from './EmployeeMatchedPageComponents/ApplyDeclineButton';
import Requirements from './EmployeeMatchedPageComponents/JobRequirments';
import SuperVisor from  './EmployeeMatchedPageComponents/SupervisorInfo';
import { withTracker } from 'meteor/react-meteor-data';

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
        let endtime = res.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let starttime = res.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let enddate = (res.endAt.getMonth() + 1) + "/" + res.endAt.getDate()  + "/" + res.endAt.getFullYear();
        let startdate = (res.startAt.getMonth() + 1) + "/" + res.startAt.getDate()  + "/" + res.startAt.getFullYear();
        let startAt = startdate+' - '+enddate;
        let endAt = starttime+' - '+endtime;
        this.setState({
          endAt: endAt,
          startAt: startAt
        });
      }
    });

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
        let endtime = res.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let starttime = res.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let enddate = (res.endAt.getMonth() + 1) + "/" + res.endAt.getDate()  + "/" + res.endAt.getFullYear();
        let startdate = (res.startAt.getMonth() + 1) + "/" + res.startAt.getDate()  + "/" + res.startAt.getFullYear();
        let startAt = startdate+' - '+enddate;
        let endAt = starttime+' - '+endtime;
        this.setState({
          endAt: endAt,
          startAt: startAt,
          index:index,

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
    return(
    <div ref={this.state.id+"11"}>

      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="col l12 m12 s12">

              <SuperVisor jobTitle={this.props.jobinfo.jobTitle.text}
                        jobId= {this.props.jobinfo._id}
                        isAdmitted={this.props.jobinfo.admitemployeeIds.includes(Meteor.userId())}
                        supervisorName={this.props.jobinfo.supervisor.name}
                        supervisorPhone={this.props.jobinfo.supervisor.phone}/>

              <div className="row">
                <div className="col s6">
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
                <div className="col l6 m6 s12">
                  <div className="row">
                    <div className="col l6 m6 s12">
                      <p><b>Start time: </b>{this.state.startAt}</p>
                      <p><b>End time: </b>{this.state.endAt}</p>
                      {this.props.jobinfo.requirements.weekendExcluded ? <p>Weekends are excluded for this job*</p> : <p>Weekends are not excluded for this job*</p>}
                      <p><b>Pay: </b>${this.props.jobinfo.professionals[this.state.index].pay}/hr</p>
                      <p><b>Location: </b>{parsedAddress}</p>
                    </div>
                    <Requirements osha10={this.state.osha10} osha30={this.state.osha30} license={this.state.license}/>
                  </div>
                  <div>
                    <p><b>Professionals needed: </b>{this.props.jobinfo.professionals[this.state.index].numWorkers}</p>
                    <p><b>Additional information: </b>{this.props.jobinfo.additionText}</p>
                  </div>
                </div>
                <div className="col l5 m5 s12 offset-l1 offset-m1">
                  <p><b>Description: </b>{this.props.jobinfo.description.text}</p>
                  <p><b>Responsibilities: </b>{this.props.jobinfo.professionals[this.state.index].responsibilities}</p>
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
