import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class EmployeeCheckBoxs extends Component{
  constructor(props){
    super(props);
    this.state={
      paidOnTime: false,
      safeWorkspace: false,
    }
  }
  value(){
    return{
      paidOnTime: this.state.paidOnTime,
      safeWorkSpace: this.state.safeWorkspace,

    };

  }
  handlePaidOnTime=()=> {
    this.setState({paidOnTime: true})
  };

  handleSafeWorkspace=()=>{
    this.setState({safeWorkspace: true})
  };



  render(){
    return(

      <div className="row">
        <div className="row">
          <div className="col s12">
              <p>Please select the categories that apply</p>
          </div>
        </div>
        <div className="row">

          <div className="col s12 m6 ">
          <input type="checkbox" className="filled-in" id="paid-on-time" value={this.state.paidOnTime} onChange={this.handlePaidOnTime}/>
             <label htmlFor="paid-on-time">Paid on time</label>
          </div>

          <div className="col s12 m6 ">
          <input type="checkbox" className="filled-in" id="safe-workspace" value={this.state.safeWorkspace} onChange={this.handleSafeWorkspace}/>
          <label htmlFor="safe-workspace">Safe workspace</label>
          </div>

        </div>
      </div>
    )
  }
}
