
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import EmployeeComponent from './EmployeeComponent';
import MSpinner from '../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
//detailed job view with professionals that applied and admitted professionals

class ConComponentPage extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();

    $(dropdowns).ready(()=>{
      $('.modal').modal();
      $('select').material_select();
      $('.tooltipped').tooltip({delay: 50});
    });
    $(this.refs.titles).on('change',(e)=>{
      this.handleProChange(e);
    })
    this.getEventInfo();
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
      nothing1: true,
      nothing2: true,
      value: "0"
    }
  }

  handleProChange(e){

    this.setState({
      value: e.target.value,
    });
    this.getEventInfo();
  }
  getEventInfo(){
    Meteor.call('getEventInfo',this.props.events[this.state.value],(err,res)=>{
      if(err){
        console.log(err);
      }else{

        let startAt = res.startAt.toLocaleString();
        let endAt = res.endAt.toLocaleString();
        this.setState({
          endAt: endAt,
          startAt: startAt
        });
      }
    });
  }
  deleteModal(){
    $('#deleteModal').modal('open');
  }
  deleteJob(){
    Meteor.call('removeJob', this.state.job._id, (err) => {
      if(err){
        console.log(err);
      }
      else{
        $('#deleteModal').modal('close');
        console.log('job delet');
      }
    });
  }
  tooltip(){
    $('#edit').tooltip('remove');
  }


  render(){
    return(
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="col m10 s8">
              <span className="card-title">{this.props.jobinfo.jobTitle.text}</span>
              <p>{this.props.description}</p>
              <p>Supervisor: {this.props.jobinfo.supervisor.name}</p>
              <p>Phone: {this.props.jobinfo.supervisor.phone}</p>
            </div>

            <div className="col m2  s1">
              <div className="row right-align">
                <a className="waves-effect waves-light blue-grey  lighten-3 btn-flat tooltipped" data-position="right" data-tooltip="Delete Job" onClick={this.deleteModal.bind(this)}><i className="small material-icons left">delete_forever</i></a>
              </div>
              <div className="row right-align">
                <Link to={"/editjob/"+ this.state.job._id}>
                  <a className="waves-effect waves-light teal lighten-3 btn-flat tooltipped" id="edit" data-position="right" data-tooltip="Edit Job Info" onClick={this.tooltip.bind(this)}><i className="small material-icons left">edit</i></a>
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
                        <option value={i} key={i}>{title}</option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col l6 m6 s12">
              <div className="row">
                <div className="col l6 m6 s12">
                  <p><b>Start time: </b>{this.state.startAt}</p>
                  <p><b>End time: </b>{this.state.endAt}</p>
                  <p><b>Pay: </b>${this.props.jobinfo.professionals[this.state.value].pay}/hr</p>
                  <p><b>Location: </b>{this.props.jobinfo.location.locationName}</p>
                </div>
                <div className="col l6 m6 s12">
                  {!this.state.osha10 && !this.state.osha30 && <p><b>OSHA: </b>No preference</p>}
                  {this.state.osha10 && <p><b>OSHA: </b>OSHA 10</p>}
                  {this.state.osha30 && <p><b>OSHA: </b>OSHA 30</p>}
                  {this.state.license && <p><b>Driver license: </b>Yes</p>}
                  {!this.state.license && <p><b>Driver license: </b>None</p>}
                </div>
              </div>
            </div>
            <div className="col l5 m5 s12 offset-l1 offset-m1">
              <p><b>Professionals needed: </b>{this.props.jobinfo.professionals[this.state.value].numWorkers}</p>
              <p><b>Responsibilities: </b>{this.props.jobinfo.professionals[this.state.value].responsibilities}</p>
            </div>
          </div>
          <div className="row">
            <div className="col m6 s12">
                  <div className='z-depth-0'>
                    {
                      this.props.applyPeople.length < 1 ?
                      <h5>No Professionals have applied</h5>
                        :
                      <h5>Professionals that applied</h5>
                    }
                  </div>
                  <div style={{height:'250px',overflow:'auto'}}>
                    <ul className="collection">
                      {
                        this.props.ready ?
                        this.props.applyPeople.map(function(user,index){
                          return(
                            <li className="collection-item">
                              <EmployeeComponent
                                key = {user._id}
                                jobInfo = {this.state.job}
                                employeeId = {user._id}
                                profile = {user.profile}
                                isAdmitted = {false}
                              />
                            </li>
                          )
                        }.bind(this))
                        :
                        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
                          <MSpinner />
                        </div>
                      }
                      </ul>
                    </div>
              </div>
              <div className="col m6 s12">
                <div>
                  {
                    this.props.admitPeople.length < 1 ?
                    <h5>No admitted Professionals</h5>
                    :
                    <h5>Admitted Professionals</h5>
                  }

                </div>
                  <div style={{height:'250px',overflow:'auto'}}>
                <ul className="collection">
                  {
                    this.props.ready ?
                    this.props.admitPeople.map(function(user,index){
                      return(
                        <li className="collection-item">
                          <EmployeeComponent
                            key = {user._id}
                            jobInfo = {this.state.job}
                            employeeId = {user._id}
                            profile = {user.profile}
                            isAdmitted = {true}
                          />
                        </li>
                      )
                    }.bind(this))

                    :
                    <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
                      <MSpinner />
                    </div>
                  }
                  </ul>
                  </div>
            </div>
          </div>

        </div>
        <div id="deleteModal" className="modal">
          <div className="modal-content">
            <h4>Are you sure you want to delete this job? Once deleted you can not get this job back.</h4>
          </div>
          <div className="modal-footer">
            <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.deleteJob.bind(this)}>
              I am sure.
            </button>
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
  if(!!Meteor.users.find({_id: {$in: props.jobinfo.applyemployeeIds}}).fetch()){
    applyPeople =  Meteor.users.find({_id: {$in: props.jobinfo.applyemployeeIds}}).fetch();
  }
  if (!!Meteor.users.find({_id: {$in: props.jobinfo.admitemployeeIds}}).fetch()) {
    admitPeople =  Meteor.users.find({_id: {$in: props.jobinfo.admitemployeeIds}}).fetch();
  }

  return {
    applyPeople : applyPeople,
    admitPeople : admitPeople,
    ready : readyApply && readyAdmit,
  };


})(ConComponentPage);
