import React from 'react';
import { Link } from 'react-router-dom';
export default class EmployeeComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  handleDecline(){
    let job = this.props.jobInfo;
    let employeeId =  this.props.employeeId;
    let jobId = job._id;

    Meteor.call('declineEmployee',jobId,employeeId,(err)=>{
      if(err){
        console.log(err);
      }
      else{

      }
    });
  }
  handleAdmit(){
    let job = this.props.jobInfo;
    let employeeId =  this.props.employeeId;
    let jobId = job._id;

    Meteor.call('admiteEmployee',jobId,employeeId,(err)=>{
      if(err){
        console.log(err);
      }
      else{

      }
    });
  }

  render(){
    return(
      <div className="card">
        <div className="card-content">
          <div className="row valign-wrapper ec" style={{width:'100%'}}>
            <div className="col m4 s12" style={{display:'flex', justifyContent:'center'}}>
              <img className="circle" src='/images/facebook.png' height='100px' width='100px'/>
            </div>
            <div className="col m8 s12">
              <div className="row">
                <div className="col s12">
                  <h4>{this.props.profile.firstName + " " + this.props.profile.lastName}</h4>
                  <p>{this.props.profile.employeeData.location.locationName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
              <Link to={"user/" + this.props.employeeId}>
                  <button className="waves-effect waves-teal teal lighten-3 btn-flat">
                    View profile
                  </button>
              </Link>
            </div>
            {
              !this.props.isAdmitted &&
              <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
                <button className="waves-effect waves-teal teal lighten-3 btn-flat" onClick={this.handleAdmit.bind(this)}>
                  Hire
                </button>
              </div>
            }
            <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
              <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.handleDecline.bind(this)}>
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
