import React from 'react';
import ReactDOM from 'react-dom';
import ApplyDeclineButton from './EmployeeMatchedPageComponents/ApplyDeclineButton';
import Requirements from './EmployeeMatchedPageComponents/JobRequirments';
import SuperVisor from  './EmployeeMatchedPageComponents/SupervisorInfo';
export default class EmpJobPostComponent extends React.Component{
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
        // console.log(res);
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
        // console.log(res);
        console.log(index);
        let startAt = res.startAt.toLocaleString();
        let endAt = res.endAt.toLocaleString();
        this.setState({
          endAt: endAt,
          startAt: startAt,
          index:index,

        });
      }
    });
  }


  render(){
    let isApplied = this.props.jobinfo.applyemployeeIds.includes(this.props.userId)|| this.props.jobinfo.admitemployeeIds.includes(this.props.userId);
    let isDecline = this.props.jobinfo.declineemployeeIds.includes(this.props.userId);
    console.log(isApplied);
    let addArr = this.props.location.split(",");
    let parsedAddress = addArr[1]+","+addArr[2]+","+addArr[4];
    return(
    <div ref={this.state.id+"11"}>

      <div className="container">
        <div className="card">
          <div className="card-content">
            <div className="col l12 m12 s12">

              <SuperVisor jobTitle={this.props.jobinfo.jobTitle.text}
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
                      <p><b>Pay: </b>{this.props.jobinfo.professionals[this.state.index].pay}</p>
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

              <ApplyDeclineButton
                jobID={this.state.id}
                isApplied={isApplied}
                isDecline={isDecline}
                jobTitles={this.props.jobinfo.jobTypes.texts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
