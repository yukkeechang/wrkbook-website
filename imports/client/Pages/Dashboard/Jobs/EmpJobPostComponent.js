import React from 'react';
import ReactDOM from 'react-dom';

export default class EmpJobPostComponent extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
      $('select').material_select();
    });
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
    $(this.refs.titles).on('change',(e)=>{
      this.selectedApply(e);
    })
  }
  constructor(props){
    super(props);
    let apply = false;
    let dropButton = this.props.isAdmitted;
    apply = this.props.jobinfo.applyemployeeIds.includes(Meteor.userId())||this.props.jobinfo.admitemployeeIds.includes(Meteor.userId());
    let label = apply ? 'Applied': 'Apply';
    let disable = apply ? 'disabled': '';
    let employeeThings = Meteor.user().profile.employeeData;
    this.state={
      id: this.props.jobinfo._id,
      name: '',
      endAt: '',
      startAt: '',
      load: true,
      label: label,
      showapply: disable,
      dropButton: dropButton,
      selectedApply: '',
      employeeObject: employeeThings,
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
          console.log(this.props.jobinfo);
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
    Meteor.call('declineJob', this.state.id, (err)=>{
    if(err){
      console.log(err);
    }
    else{
          $('#declineModal').modal('close');
    }
    });
  }
  handleApply(){
    let job = this.props.jobinfo;
    let jobId = job._id;
    Meteor.call('applyForJob',jobId,this.state.selectedApply,(err)=>{
      if(err){
        console.log(err);
      }
      else{
        this.setState({
          label: 'Applied',
          showapply: 'disabled'
        });
        $('#applyModal').modal('close');
      }
    });
  }
  selectedApply(){
      this.setState({
        selectedApply: this.refs.titles.value
      });
      console.log(this.refs.titles.value);
      console.log(this.state.selectedApply);
  }
  openApplyModal(){
    $('#applyModal').modal('open');
  }
  openDeclineModal(){
    $('#declineModal').modal('open');
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
                  <p>Supervisor: {this.props.jobinfo.supervisor.name}</p>
                  <p>Phone: {this.props.jobinfo.supervisor.phone}</p>
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
                  <a id="disabledButton" className={"waves-effect green lighten-3 btn-flat "+ this.state.showapply}  onClick={this.openApplyModal.bind(this)}>
                    {this.state.label}
                  </a>
                  <a id="disabledButton" className="waves-effect red lighten-3 btn-flat" onClick={this.openDeclineModal.bind(this)}>
                    Decline
                  </a>
                </div>
              </div>
              <div id="applyModal" className="modal">
                <div className="modal-content" style={{ overflowY: 'scroll'}}>
                  <div className="col s12">
                    <div className="row">

                        <select ref="titles" id="jobTitles" onChange={this.selectedApply.bind(this)}>
                          <option value="" disabled selected>Choose employee type to apply as</option>
                          {this.state.employeeObject.jobTitle.map((title, index)=>{
                            return(
                              <option value={title}>{title}</option>
                            )
                          })}
                        </select>

                    </div>
                  </div>
                </div>
                <br/>
                <div className="modal-footer">
                  <button className="waves-effect waves-green green lighten-3 btn-flat" onClick={this.handleApply.bind(this)}>
                    Confirm apply.
                  </button>
                </div>
              </div>

              <div id="declineModal" className="modal">
                <div className="modal-content">
                  <h4>Are you sure you want to decline this job? <br/>Once deleted you can not get this job back.</h4>
                </div>
                <div className="modal-footer">
                  <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.handleDecline.bind(this)}>
                    I am sure.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
