import React from 'react';

export default class EmployeeComponent extends React.Component{
  handleDecline(){
    let job = this.props.jobInfo;
    let declineemployeeIds = [];
    let employeeId = this.props.employeeId;
    let jobId = job._id;
    if(job.admitemployeeIds.includes(employeeId)){
      let idx = job.admitemployeeIds.indexOf(employeeId);
      job.admitemployeeIds.splice(idx, 1);
    }
    if(job.applyemployeeIds.includes(employeeId)){
      let idx = job.applyemployeeIds.indexOf(employeeId);
      job.applyemployeeIds.splice(idx, 1);
    }
    declineemployeeIds = job.declineemployeeIds;
    declineemployeeIds[declineemployeeIds.length] = this.props.employeeId;
    let set = new Set(declineemployeeIds);
    declineemployeeIds = Array.from(set);
    let empolyeeIds ={
      apply: job.applyemployeeIds,
      decline: job.declineemployeeIds,
      admit: job.admitemployeeIds
    };
    Meteor.call('updateEmployeeIds',jobId,empolyeeIds,(err)=>{
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
    let applyemployeeIds = [];
    let jobId = job._id;
    if(job.applyemployeeIds.includes(employeeId)){
      let idx = job.applyemployeeIds.indexOf(employeeId);
      job.applyemployeeIds.splice(idx, 1);
      console.log(job.applyemployeeIds);
    }
    admitemployeeIds = job.admitemployeeIds;
    admitemployeeIds[admitemployeeIds.length] = employeeId;
    let set = new Set(admitemployeeIds);
    admitemployeeIds = Array.from(set);

    let empolyeeIds ={
      apply: job.applyemployeeIds,
      decline: job.declineemployeeIds,
      admit: job.admitemployeeIds
    };

    Meteor.call('updateEmployeeIds',jobId,empolyeeIds,(err)=>{
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
                  <h4>Name</h4>
                  <p>Adress</p>
                </div>
              </div>
              <div className="row">
                <p>Certifications</p>
                <p>About</p>
                <p>Payments accepted</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
              <button className="waves-effect waves-teal teal lighten-3 btn-flat">
                View profile
              </button>
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
