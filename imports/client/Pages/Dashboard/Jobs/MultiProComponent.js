import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class JobCreateComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      pay: '0',
      numWorkers: '',
      responsibilities: '',
      startdate: '',
      enddate: '',
      starttime: '',
      endtime: '',
      index: '',
      events: ''
    }
  }
  value(){
    if(this.props.fromEditJob){
      let numEmp = this.state.numWorkers;
      let payEmp = this.state.pay;
      let startTime = this.convertTo24Hour(this.refs.startTime.value.toLowerCase());
      let endTime = this.convertTo24Hour(this.refs.endTime.value.toLowerCase());
      let startDate = this.refs.startDate.value;
      let endDate = this.refs.endDate.value;
      if(this.refs.startTime.value == ''){
        startTime = this.state.starttime;
      }
      if(this.refs.endTime.value == ''){
        endTime = this.state.endtime;
      }
      if(this.refs.endDate.value == ''){
        endDate = this.state.enddate;
      }
      if(this.refs.startDate.value == ''){
        startDate = this.state.startdate;
      }
      console.log(startDate);
      console.log(endDate);
      const startAt = new Date(startDate +" "+ startTime);
      const endAt = new Date(endDate +" "+ endTime);
      let responsibilities = this.refs.responsibilities.value;
      let Jobs = {
        title: this.props.title,
        pay: payEmp,
        numWorkers: numEmp,
        startAt: startAt,
        endAt: endAt,
        responsibilities: responsibilities
      }
      return Jobs;
    }
    else{
      let numEmp = this.state.numWorkers;
      let payEmp = this.state.pay;
      const startTime = this.convertTo24Hour(this.refs.startTime.value.toLowerCase());
      const endTime = this.convertTo24Hour(this.refs.endTime.value.toLowerCase());
      const startAt = new Date(`${this.refs.startDate.value} ${startTime}`);
      const endAt = new Date(`${this.refs.endDate.value} ${endTime}`);
      let responsibilities = this.refs.responsibilities.value;
      let Jobs = {
        title: this.props.title,
        pay: payEmp,
        numWorkers: numEmp,
        startAt: startAt,
        endAt: endAt,
        responsibilities: responsibilities
      }
      return Jobs;
    }
  }
  convertTo24Hour(time) {
    var hours = parseInt(time.substr(0, 2));
    if(time.indexOf('am') != -1 && hours == 12) {
        time = time.replace('12', '0');
    }
    if(time.indexOf('pm')  != -1 && hours < 12) {
        time = time.replace(hours, (hours + 12));
    }
    return time.replace(/(am|pm)/, '');
  }
  componentDidMount(){
    let st = ReactDOM.findDOMNode(this.refs.startTime);
    $(st).pickatime();
    let sd = ReactDOM.findDOMNode(this.refs.startDate);
    $(sd).pickadate({
      format: 'mmm dd yyyy'
    });
    let et = ReactDOM.findDOMNode(this.refs.endTime);
    $(et).pickatime();
    let ed = ReactDOM.findDOMNode(this.refs.endDate);
    $(ed).pickadate({
      format: 'mmm dd yyyy'
    });
    if(this.props.fromEditJob){
      this.setState({
        index: this.props.index,
        events: this.props.events,
        jobinfo: this.props.jobInfo,
        pay: this.props.jobInfo.professionals[this.props.index].pay,
        numWorkers: this.props.jobInfo.professionals[this.props.index].numWorkers
      });
      Meteor.call('getEventInfo',this.props.events[this.props.index],(err,res)=>{
        if(err){
          console.log(err);
        }else{
          let responsibilities = res.responsibilities.text;
          let endtime = res.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          let starttime = res.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          let enddate = (res.endAt.getMonth() + 1) + "/" + res.endAt.getDate()  + "/" + res.endAt.getFullYear();
          let startdate = (res.startAt.getMonth() + 1) + "/" + res.startAt.getDate()  + "/" + res.startAt.getFullYear();
          this.setState({
            endtime: endtime,
            enddate: enddate,
            starttime: starttime,
            startdate: startdate,
            responsibilities: responsibilities
          });
        }
      });
    }
  }
  render(){
    return(
      <div className="card">
        <div className="card-content">
        <span className="card-title">{this.props.title}</span>
        <div className="row">
          <div className="col s12 m8">
          <div className="input-field">
            <input id="numberEmployees" onChange={(e) => {this.setState({numWorkers: parseInt(e.target.value.length <= 0 ? 0 : e.target.value)})}} ref="numberEmployees" type="number"/>
            <label htmlFor="numberEmployees">Number of {this.props.title}s: {this.state.numWorkers}</label>
          </div>
          </div>
          <div className="col s12 m4">
          <div className="input-field">
            <input id="employeePay" onChange={(e) => {this.setState({pay: parseInt(e.target.value.length <= 0 ? 0.00 : e.target.value)})}} ref="employeePay" type="number"/>
            <label htmlFor="employeePay">Pay (${this.state.pay}.00 / Hour)</label>
          </div>
          </div>
          <div className="col s6">
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="startDate">Job Start Date: {this.state.startdate}</label>
            <input ref="startDate" id="startDate"type="text" className="datepicker"/>
          </div>
          <div className="col s6">
            <label htmlFor="endDate">Job End Date: {this.state.enddate}</label>
            <input ref="endDate" id="endDate"type="text" className="datepicker"/>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="startTime">Daily Start Time: {this.state.starttime}</label>
            <input ref="startTime" id="startTime"type="text" className="timepicker"/>
          </div>
          <div className="col s6">
            <label htmlFor="endTime">Daily End Time: {this.state.endtime}</label>
            <input ref="endTime" id="endTime"type="text" className="timepicker"/>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="input-field">
              <input id="responsibilities" ref="responsibilities" type="text"/>
              <label htmlFor="responsibilities">Responsibilities for the employee: {this.state.responsibilities}</label>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
