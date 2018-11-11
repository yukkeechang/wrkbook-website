import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class EmployeeCheckBoxs extends Component{
  constructor(props){
    super(props);
    this.state={
      paidOnTime: false,
      safeWorkSpace: false,
    }
  }
  value(){
    return{
      paidOnTime: this.state.paidOnTime,
      safeWorkSpace: this.state.safeWorkSpace,

    };

  }
  handlePaidOnTime=()=> {
    this.state.paidOnTime ? this.setState({paidOnTime:false}):  this.setState({paidOnTime:true});
  };

  handlesafeWorkSpace=()=>{
    this.state.safeWorkSpace ? this.setState({safeWorkSpace:false}):this.setState({safeWorkSpace:true});
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
            <label>
              <input type="checkbox" className="filled-in" id="paid-on-time" value={this.state.paidOnTime} onChange={this.handlePaidOnTime}/>
               <span>Paid on time</span>
             </label>
          </div>

          <div className="col s12 m6 ">
          <label>
            <input type="checkbox" className="filled-in" id="safe-workspace" value={this.state.safeWorkSpace} onChange={this.handlesafeWorkSpace}/>
            <span>Safe workspace</span>
          </label>
          </div>

        </div>
      </div>
    )
  }
}
