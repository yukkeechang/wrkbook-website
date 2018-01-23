import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class JobCreateComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      pay: 0
    }
  }
  value(){
    let numEmp = parseInt(this.refs.numberEmployees.value);
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
  }

  render(){
    return(
      <div className="card">
        <div className="card-content">
        <span className="card-title">{this.props.title}</span>
        <div className="row">
          <div className="col s12 m8">
          <div className="input-field">
            <input id="numberEmployees" ref="numberEmployees" type="number"/>
            <label htmlFor="numberEmployees">Number of {this.props.title}s</label>
          </div>
          </div>
          <div className="col s12 m4">
          <div className="input-field">
            <input id="employeePay" onChange={(e) => {this.setState({pay: parseInt(e.target.value.length <= 0 ? 0.00 : e.target.value)})}}ref="employeePay" type="number"/>
            <label htmlFor="employeePay">Pay (${this.state.pay}.00 / Hour)</label>
          </div>
          </div>
          <div className="col s6">
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="startDate">Start Date</label>
            <input ref="startDate" id="startDate"type="text" className="datepicker"/>
          </div>
          <div className="col s6">
          <label htmlFor="startTime">Start Time</label>
            <input ref="startTime" id="startTime"type="text" className="timepicker"/>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="endDate">End Date</label>
            <input ref="endDate" id="endDate"type="text" className="datepicker"/>
          </div>
          <div className="col s6">
            <label htmlFor="endTime">End Time</label>
            <input ref="endTime" id="endTime"type="text" className="timepicker"/>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="input-field">
              <input id="responsibilities" ref="responsibilities" type="text"/>
              <label htmlFor="responsibilities">Responsibilities for the employee</label>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
