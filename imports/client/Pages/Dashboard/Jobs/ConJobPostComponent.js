import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import EmployeeComponent from './EmployeeComponent';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
//detailed job view with professionals that applied and admitted professionals

class ConJobPost extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
    });
    $(this.refs.titles).on('change',(e)=>{
      this.handleProChange(e);
    })
    let tooltip = ReactDOM.findDOMNode(this.refs.tool);
    $(tooltip).tooltip({delay: 50});
  }
  constructor(props){
  super(props);
  let job = this.props.jobinfo;
  this.state={
    applied: [],
    admit: [],
    events: [],
    job: job,
    osha10: this.props.jobinfo.requirements.osha.osha10,
    osha30: this.props.jobinfo.requirements.osha.osha30,
    license: this.props.jobinfo.requirements.driverLicense,
    nothing1: true,
    nothing2: true,
    value: "0"
  };

  }
  handleProChange(e){
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  handleMember(){

  }


  render(){

    if(!this.props.ready)return(<h1> H </h1>);
    else{
    return(
      <div className="card">
        <div className="card-content">
          <div className="row">
            <div className="col s8">
              <span className="card-title">{this.props.jobinfo.jobTitle.text}</span>
              <br/>
              <p>{this.props.description}</p>
            </div>
            <div className="col s2 offset-l2 offset-m2 offset-s2">
            <button className="waves-effect waves-teal lighten-3 btn-flat"onClick={this.handleMember.bind(this)}>
              <i ref="tool" className="small material-icons tooltipped" data-html="true" data-background-color="#888"data-tooltip="Manage workers">people</i>
            </button>
            <Link to={"/editjob/"+ this.state.job._id}>
              <a className="waves-effect waves-teal lighten-3 btn-flat">
                <i ref="tool" className="small material-icons tooltipped" data-html="true" data-background-color="#888"data-tooltip="Edit job">edit</i>
              </a>
            </Link>
            </div>
          </div>
          <div className="row">
            <div className="col m8 s12">
              <div className="input-field col s12">
                <div className="row">
                  <span></span>
                  <select ref="titles" value={this.state.value} id="jobTitles" onChange={()=>{}}>
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
                  <p><b>Start time: </b>startAt</p>
                  <p><b>End time: </b>endAt</p>
                  <p><b>Pay: </b>{this.props.jobinfo.professionals[this.state.value].pay}</p>
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
                  <div>
                    {
                      this.props.applyPeople.length < 1 ?
                      <h3>No Professionals have applied</h3>
                        :
                      <h3>Professionals that applied</h3>
                    }
                  </div>
                  <ul className="collection">
                    {
                      !!this.props.applyPeople ?
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
                      null
                    }
                    </ul>
              </div>
              <div className="col m6 s12">
                <div>
                  {
                    this.props.admitPeople.length < 1 ?
                    <h3>No admitted Professionals</h3>
                    :
                      <h3>Admitted Professionals</h3>
                  }

                </div>
                <ul className="collection">
                  {
                    !!this.props.admitPeople ?
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
                    null
                  }
                  </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
}
export default ConJobPostComponent = createContainer((props)=>{

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


},ConJobPost);
