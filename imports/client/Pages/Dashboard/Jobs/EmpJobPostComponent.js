import React from 'react';

export default class EmpJobPostComponent extends React.Component{
  componentDidMount(){
    Meteor.call('getEventInfo',this.props.events[0],(err,res)=>{
      if(err){
        console.log(err);
      }else{
        console.log(res);
        let startAt = res.startAt.toLocaleString();
        let endAt = res.endAt.toLocaleString();
        this.setState({
          endAt: endAt,
          startAt: startAt
        });
      }
    });
  }
  constructor(props){
    super(props);
    let apply = false;
    let dropButton = this.props.isAdmitted;
    apply = this.props.jobinfo.applyemployeeIds.includes(Meteor.userId())||this.props.jobinfo.admitemployeeIds.includes(Meteor.userId());
    let label = apply ? 'Applied': 'Apply';
    let disable = apply ? 'disabled': '';
    this.state={
      name: '',
      endAt: '',
      startAt: '',
      load: true,
      label: label,
      showapply: disable,
      dropButton: dropButton,
      osha10: this.props.jobinfo.requirements.osha.osha10,
      osha30: this.props.jobinfo.requirements.osha.osha30,
      license: this.props.jobinfo.requirements.driverLicense,
    };
    Meteor.call('findUserbyId', this.props.jobinfo.employerId, function(err,res){
      if(err){
        console.log(err);
      }
      else{
        if(res){
          console.log(res);
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
  handleDecline(){
    let job = this.props.jobInfo;
    let jobId = job._id;

    Meteor.call('declineJob',jobId,(err)=>{
    if(err){
      console.log(err);
    }
    else{

    }
    });
  }
  handleApply(){
  let job = this.props.jobinfo;
  let jobId = job._id;

  Meteor.call('applyForJob',jobId,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      this.setState({
        label: 'Applied',
        showapply: 'disabled'
      });
    }
  });
}
  render(){
    return(
      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="col l12 m12 s12">
              <div className="row">
                <div className="col l8 m8 s8">
                  <h1>{this.props.jobinfo.jobTitle.text}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col l6 m6 s12">
                  <div className="row">
                    <div className="col l6 m6 s12">
                      <p><b>Start time: </b>{this.state.startAt}</p>
                      <p><b>End time: </b>{this.state.endAt}</p>
                      <p><b>Pay: </b>{this.props.jobinfo.professionals[0].pay}</p>
                      <p><b>Location: </b>{this.props.location.locationName}</p>
                    </div>
                    <div className="col l6 m6 s12">
                      <p>
                        {!this.state.osha10 && !this.state.osha30 && <p><b>OSHA: </b>No preference</p>}
                        {this.state.osha10 && <p><b>OSHA: </b>OSHA 10</p>}
                        {this.state.osha30 && <p><b>OSHA: </b>OSHA 30</p>}
                      </p>
                      <p>
                        {this.state.license && <p><b>Driver license: </b>Yes</p>}
                        {!this.state.license && <p><b>Driver license: </b>None</p>}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p><b>Professionals needed: </b>{this.props.jobinfo.professionals[0].numWorkers}</p>
                    <p><b>Additional information: </b>{this.props.jobinfo.additionText}</p>
                  </div>
                </div>
                <div className="col l5 m5 s12 offset-l1 offset-m1">
                  <p><b>Description: </b>{this.props.jobinfo.description.text}</p>
                  <p><b>Responsibilities: </b>{this.props.jobinfo.professionals[0].responsibilities}</p>
                </div>
              </div>
              <div className="col s12">
                <div className="row">
                  <a id="disabledButton" className={"waves-effect green lighten-3 btn-flat "+ this.state.showapply}  onClick={this.handleApply.bind(this)}>
                    {this.state.label}
                  </a>
                  <a id="disabledButton" className="waves-effect red lighten-3 btn-flat" onClick={this.handleDecline.bind(this)}>
                    Decline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
