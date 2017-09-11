import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import EmployeeComponent from './EmployeeComponent';

//detailed job view with professionals that applied and admitted professionals

export default class ConJobPostComponent extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
    });
    $(this.refs.titles).on('change',(e)=>{
      this.handleProChange(e);
    })
  }
  componentWillMount(){
    console.log(this.props.jobinfo);
    console.log('NU');
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
    nothing1: true,
    nothing2: true,
    value: "0"
  };
  console.log(this.props.jobinfo);
  }
  handleProChange(e){
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  handleEdit(e){
    <Link to="/editjob"></Link>
  }
  handleMember(e){
    let job = this.props.jobinfo;
    let Admitted = [];
    let Applied =[];
    let crap =job.admitemployeeIds;
    console.log(job);
    if(job.admitemployeeIds.length > 0){
      job.admitemployeeIds.map((_id,i)=>{
        Meteor.call('findUserbyId',_id,(err,res)=>{
          if(err)console.log(err);
          else{
            Admitted.push(res);
            this.setState({
              admit: Admitted,
              nothing2: false
            })
          }
        });
      });
    }
    if(job.applyemployeeIds.length > 0){
      job.applyemployeeIds.map((_id,i)=>{
        Meteor.call('findUserbyId',_id,(err,res)=>{
          console.log('halp');
          if(err){
            console.log(err);
          }
          else{
            Applied.push(res);
            this.setState({
              applied: Applied,
              nothing1: false
            })
          }
        });
      });
    }
    let nothing2 = Admitted.length > 0 ? false: true;
    console.log(nothing2);
    this.setState({
      nothing2:nothing2,
      job:job
    });
    console.log(this.state.job);
    console.log(this.state.applied);
    console.log(Admitted);
  }

  render(){
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
            <button className="waves-effect waves-teal  lighten-3 btn-flat" onClick={this.handleMember.bind(this)}>
              <i className="small material-icons">people</i>
            </button>
            <button className="waves-effect waves-teal lighten-3 btn-flat" onClick={this.handleEdit.bind(this)}>
              <i className="small material-icons">edit</i>
            </button>
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
                  <p><b>Driver license: </b>driverLicense</p>
                  <p><b>Vehicle: </b>car</p>
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
                  this.state.nothing1 &&
                  <h3>No Professionals have applied</h3>
                }
                {
                  !this.state.nothing1 &&
                  <h3>Professionals that applied</h3>
                }
              </div>
              <ul className="collection">
                {
                  this.state.applied.map(function(user,index){
                    return(
                      <li className="collection-item">
                        <EmployeeComponent
                          key = {index}
                          jobInfo = {this.state.job}
                          employeeId = {user._id}
                          profile = {user.profile}
                          isAdmitted = {false}
                        />
                      </li>
                    )
                  }.bind(this))
                }
                </ul>
            </div>
            <div className="col m6 s12">
              <div>
                {
                  this.state.nothing2 &&
                  <h3>No admitted Professionals</h3>
                }
                {
                  !this.state.nothing2 &&
                  <h3>Admitted Professionals</h3>
                }
              </div>
              <ul className="collection">
                {
                  this.state.applied.map(function(user,index){
                    return(
                      <li className="collection-item">
                        <EmployeeComponent
                          key = {index}
                          jobInfo = {this.state.job}
                          employeeId = {user._id}
                          profile = {user.profile}
                          isAdmitted = {true}
                        />
                      </li>
                    )
                  }.bind(this))
                }
                </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
