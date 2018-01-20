
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import Employees from './ConComponents/AppliedEmployees';
import ApplyAndHired from './ConComponents/ApplyAndHiredEmployees';
import JobInfo from './ConComponents/JobInfo';
import MSpinner from '../../../Shared/MSpinner';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
//detailed job view with professionals that applied and admitted professionals

class ConComponentPage extends React.Component{
  componentDidMount(){
    let page = ReactDOM.findDOMNode(this.refs.detailedView);

    $(page).ready(()=>{
      $('.modal').modal();
      $('select').material_select();
      $('.tooltipped').tooltip({delay: 50});
    });
    $(this.refs.titles).on('change',(e)=>{
      this.handleProChange(e);
    });



    Meteor.call('getEventInfo',this.props.events[0],(err,res)=>{
      console.log(this.props.events[0]);
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
  let job = this.props.jobinfo;

  this.state={
    job: job,
    startAt: '',
    endAt: '',
    osha10: this.props.jobinfo.requirements.osha.osha10,
    osha30: this.props.jobinfo.requirements.osha.osha30,
    license: this.props.jobinfo.requirements.driverLicense,
    value: "0"
  };
  // console.log(this.props.handleChildLoad)

  }
  handleProChange(e){
    let jobTitles = this.props.jobinfo.jobTypes.texts;
    let index = jobTitles.indexOf(this.refs.titles.value);
    this.setState({
      value: index,
    });
  }
  deleteModal=()=>{
    $(this.refs.deleteModal).modal('open');
  }
  deleteJob=()=>{
    Meteor.call('removeJob', this.state.job._id, (err) => {
      if(err){
        console.log(err);
      }
      else{
          $(this.refs.deleteModal).modal('close');
      }
    });
  }
  componentWillUnmount(){
    console.log("removing tooltip");
        $('.tooltipped').tooltip('remove');
        $(this.refs.deleteModal).modal('close');
  }


  render(){
    console.log(this.props);
    let notifications = this.props.notifications;
    notifications.map(function(notify,index){
      Meteor.call('updateNotification',notify._id,(err)=>{
        console.log(err);
      });
    });
    return(
    <div className="container">
      <div ref="detailedView" className="card">
        <div className="card-content">
          <div className="row">
            <div className="col m10 s8">
              <span className="card-title">{this.props.jobinfo.jobTitle.text}</span>
              <p>{this.props.description}</p>
              <p>Supervisor: {this.props.jobinfo.supervisor.name}</p>
              <p>Phone: {this.props.jobinfo.supervisor.phone}</p>
            </div>

            <div className="col m2  s2">
              <div className="row center-align">
                <a  style={{padding:'10px'}} onClick={this.deleteModal} className="waves-effect tooltipped" data-position="right" data-tooltip="Delete Job" style={{ fontSize:'30px', color:'red'}}><div style={{height:'40px',width:'40px'}} className="circle blue-grey lighten-5"><i className="material-icons">delete_forever</i></div></a>
              </div>
              <div className="row center-align">
                <Link style={{padding:'0px'}} to={"/editjob/"+ this.state.job._id}>
                  <a style={{padding:'0px',fontSize:'30px', color:'black'}} className="waves-effect tooltipped"  data-position="right" data-tooltip="Edit Job Info" ><div style={{height:'40px',width:'40px'}} className="circle blue-grey center-align lighten-5"> <i className="material-icons">edit</i></div></a>
                </Link>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col m8 s12">
              <div className="input-field col s12">
                <div className="row">
                  <span></span>
                  <select  id="jobTitles" ref="titles" value={this.state.value} onChange={this.handleProChange.bind(this)}>
                    {this.props.jobinfo.jobTypes.texts.map((title,i)=>{
                      return(
                        <option value={title} key={i}>{title}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <JobInfo osha10={this.state.osha10} osha30={this.state.osha30} license={this.state.license}
            location={this.props.jobinfo.location.locationName}
            pay={this.props.jobinfo.professionals[this.state.value].pay} endAt={this.state.endAt} startAt={this.state.startAt} numWorkers={this.props.jobinfo.professionals[this.state.value].numWorkers}
            responsibilities={this.props.jobinfo.professionals[this.state.value].responsibilities} />

            {

                  (this.props.isUpcoming ?
                    <ApplyAndHired
                      job={this.props.jobinfo}
                      applyemployees={this.props.jobinfo.applyAsIDs[this.state.value].ids}
                      admitemployees={this.props.jobinfo.admitAsIDs[this.state.value].ids}
                    />
                    :
                    <div className="col m12 s12">
                        <Employees
                        isAdmitted={true}
                        job={this.props.jobinfo}
                        filterIds={this.props.jobinfo.admitAsIDs[this.state.value].ids}/>
                    </div>
                  )
            }


        </div>
        <div ref="deleteModal" className="modal">
          <div className="modal-content">
            <h4>Are you sure you want to delete this job? Once deleted you can not get this job back.</h4>
          </div>
          <div className="modal-footer">
            <Link to={"/"} onClick={this.deleteJob}>
              <button className="waves-effect waves-red red lighten-3 btn-flat" >
                I am sure.
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );

  }
}

export default ConComponent = withTracker(props=>{

  let handleApply = Meteor.subscribe('apply-employee-job',props.jobinfo._id);
  let handleAdmit = Meteor.subscribe('admit-employee-job',props.jobinfo._id);
  let applyPeople = [];
  let admitPeople = [];
  let readyApply = handleApply.ready();
  let readyAdmit = handleAdmit.ready();
  let notifications =[];
  let notifiloading =false;

  let notificationHandle = Meteor.subscribe('notifications-for-user')
  notifiloading = notificationHandle.ready();

  notifications = Notification.find({typeNotifi:'APPLIED',jobId:props.jobinfo._id}).fetch();

  if(!!Meteor.users.find({_id: {$in: props.jobinfo.applyemployeeIds}}).fetch()){
    applyPeople =  Meteor.users.find({_id: {$in: props.jobinfo.applyemployeeIds}}).fetch();
  }
  if (!!Meteor.users.find({_id: {$in: props.jobinfo.admitemployeeIds}}).fetch()) {
    admitPeople =  Meteor.users.find({_id: {$in: props.jobinfo.admitemployeeIds}}).fetch();
  }

  return {
    applyPeople : applyPeople,
    admitPeople : admitPeople,
    notifications:notifications,
    ready : readyApply && readyAdmit,
  };


})(ConComponentPage);
