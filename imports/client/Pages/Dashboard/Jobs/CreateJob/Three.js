import React, { Component } from "react";
import ReactDOM from "react-dom";
import Empl from './Employees'
export default class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleNext(e) {
    let job ={
      professionals: this.refs.employee.value().professionals,
      jobTypes: this.refs.employee.value().jobTypes,
      additionText: this.refs.employee.value().additionText
    }
    Meteor.call('validateEmployees',job,(err,res)=>{
      if(err)console.log(err);
      else{
        let completeJob = {...job,...this.props.job};
        this.props.next(4,completeJob);
      }
    });
  }
  handleCancel(){
    this.props.next(2,this.props.job);
  }
  render() {
    return (
    <div className="container">
      <div className="card">
        <div className="row card-content">


          <span className="col s12 card-title">Step 3: Employee Information</span>


           <Empl ref="employee"/>

            <a onClick={e => this.handleCancel(e)} className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>back</a>
            <a onClick={e => this.handleNext(e)} className="btn-flat teal lighten-5 col s5 offset-s2 m3 offset-m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>Next</a>

          </div>
        </div>
      </div>
    );
  }
}
