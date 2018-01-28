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
  handlePaidOnTime() {
    //----this is to handle check box changes in edit review
    //when it's not checked, set it to true now because now it's changing from unchecked to checked
    if(this.state.paidOnTime == false) {
      this.setState({paidOnTime: true})
    }
    //when it's checked, set it to false now because now it's changing from checked to unchecked
    if(this.state.paidOnTime == true) {
      this.setState({paidOnTime: false})
    }
  };

  handlesafeWorkSpace(){
    //when it's not checked, set it to true now because now it's changing from unchecked to checked
    if(this.state.safeWorkSpace == false) {
      this.setState({safeWorkSpace: true})
    }
    //when it's checked, set it to false now because now it's changing from checked to unchecked
    if(this.state.safeWorkSpace == true) {
      this.setState({safeWorkSpace: false})
    }
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
          <input type="checkbox" className="filled-in" id="paid-on-time" value={this.state.paidOnTime} onChange={this.handlePaidOnTime.bind(this)}/>
             <label htmlFor="paid-on-time">Paid on time</label>
          </div>

          <div className="col s12 m6 ">
          <input type="checkbox" className="filled-in" id="safe-workspace" value={this.state.safeWorkSpace} onChange={this.handlesafeWorkSpace.bind(this)}/>
          <label htmlFor="safe-workspace">Safe workspace</label>
          </div>

        </div>
      </div>
    )
  }
}
