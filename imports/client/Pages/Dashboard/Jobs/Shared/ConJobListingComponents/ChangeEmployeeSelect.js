import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

export default class EmployeeSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {


    }

  }

  componentDidMount(){
    let select = ReactDOM.findDOMNode(this.refs.employeeType);
    $(select).ready(()=>{
      $('select').material_select();
    });
    $(this.refs.employeeType).on('change',(e)=>{
      this.handleProChange(e);
    });


  }
  handleProChange(e){
    let jobTitles = this.props.jobTypes;
    let index = jobTitles.indexOf(this.refs.employeeType.value);
    this.props.handleClick(index)
  }

  render(){
    console.log(this.props);
    return(
    <div className="row">
      <div className="col s12 m6 center-align">
        <h6  className="flow-text"> Show Employees Admitted as </h6>
      </div>
      <div className="col s12 m5 center-align">
        <select ref="employeeType" id="employeeType">
          {this.props.jobTypes.map((title, index)=>{

            return(
              <option key={index} value={title} >{title}</option>
            )
          })}
        </select>
      </div>
    </div>
  );
  }
}
