import React, { Component } from "react";
import ReactDOM from "react-dom";
import Empl from './Employees'
export default class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }
  handleNext(e) {
  }
  handleCancel(){
    this.props.next(2,{});
  }
  render() {
    return (
    <div className="container">
      <div className="card">
        <div className="row card-content">


          <span className="col s12 card-title">Step 3: Employee Information</span>


           <Empl />

            <a onClick={e => this.handleCancel(e)} className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>back</a>
            <a onClick={e => this.handleNext(e)} className="btn-flat teal lighten-5 col s5 offset-s2 m3 offset-m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}}type="submit">Next</a>

          </div>
        </div>
      </div>
    );
  }
}
