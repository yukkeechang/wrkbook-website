import React from 'react';

export default class EmpJobPostComponent extends React.Component{
  constructor(props){
    super(props);
    let apply = false;
    let dropButton = this.props.isAdmitted;
    apply = this.props.jobinfo.applyemployeeIds.includes(Meteor.userId());
    let label = apply ? 'Applied': 'Apply';
    this.state={
      name: '',
      load: true,
      label: label,
      showapply: apply,
      dropButton: dropButton
    };
    Meteor.call('findUserbyId', this.props.jobinfo.employerId, function(err,res){
      if(err){
        console.log(err);
      }
      else{
        if(res){
          let crap = res.profile.employerData.companyName.text;
          console.log(crap);
          this.setState({
            name:crap,
            load: false
          });
        }
      }
    }.bind(this));
  }
  handleApply(){
  let job = this.props.jobinfo;
  let applyemployeeIds = [];
  let jobId = job._id;
  applyemployeeIds = job.applyemployeeIds;
  applyemployeeIds[applyemployeeIds.length] = Meteor.userId();
  let set = new Set(applyemployeeIds);
  applyemployeeIds = Array.from(set);

  let empolyeeIds ={
    apply: applyemployeeIds,
    decline: job.declineemployeeIds,
    admit: job.admitemployeeIds
  };
  
  Meteor.call('updateEmployeeIds',jobId,empolyeeIds,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      this.setState({
        label: 'Applied',
        showapply: !this.state.showapply
      });
    }
  });
}
  render(){
    return(
      <div className="col l12 m12 s12">
        <div className="row">
          <div className="col l8 m8 s8">
            <h1>title</h1>
          </div>
        </div>
        <div className="row">
          <div className="col l6 m6 s12">
            <div className="row">
              <div className="col l6 m6 s12">
                <p><b>Start time: </b>startAt</p>                   //none of these probably work just saying
                <p><b>End time: </b>endAt</p>
                <p><b>Pay: </b>pay per hr</p>
                <p><b>Location: </b>{this.props.location.locationName}</p>
              </div>
              <div className="col l6 m6 s12">
                <p><b>OSHA: </b>osha</p>
                <p><b>Driver license: </b>driverLicense</p>
                <p><b>Vehicle: </b>car</p>
                <p><b>Education: </b>highGed</p>
              </div>
            </div>
            <div>
              <p><b>Professionals needed: </b>numWorkers</p>
              <p><b>Additional information: </b>aditionText</p>
            </div>
          </div>
          <div className="col l5 m5 s12 offset-l1 offset-m1">
            <p><b>Description: </b>description</p>
            <p><b>Responsibilities: </b>description</p>                             //dont have this
          </div>
        </div>
        <div className="col s12">
          <a id="disabledButton" className="waves-effect waves-teal btn-flat " onClick={this.handleApply.bind(this)}>
            {this.state.label}
          </a>
        </div>
      </div>
    )
  }
}
