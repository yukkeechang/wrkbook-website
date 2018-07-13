import React, { Component } from "react";
import ReactDOM from "react-dom";
import JobCreateComponent from './MultiProComponent';
import MTextField from "../../../Shared/MTextField";

export default class Empl extends Component {
  constructor(props) {
    super(props);
    this.state={
      jobTypes: true,
      titles: [],
    }
  }
  value(){


  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
    });
    $(this.refs.titles).change(()=>{
      this.setState({titles:$(this.refs.titles).val()})
    });
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: true, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function(){} //Function for after opening timepicker
    });
  }
  render() {

    return (
  <div>
    <div className="row">
      <div className="input-field col s12">
        <select className={this.state.jobTypes? '':"Invalid"} multiple ref="titles" id="jobTitles" defaultValue={[""]}>
          <option value="" disabled selected>Type of employee(s)</option>
          <option value="Painter">Painter</option>
          <option value="Demolitioner">Demolitioner</option>
          <option value="Glazer">Glazer</option>
          <option value="Masonry/Stone worker">Masonry/Stone worker</option>
          <option value="Concrete finisher">Concrete finisher</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Heat/Air conditioning worker">Heat/Air conditioning worker</option>
        </select>
      </div>
    </div>
      {this.state.titles.map((title, index)=>{
        return(
          <JobCreateComponent ref={title} title={title} key={title} fromEditJob={false}/>
        )
      })}
      <div className="row">
        <div className="input-field col s12">
          <MTextField ref="at" id="additionalText" label="Additional Information"/>
        </div>
      </div>
    </div>
    );
  }
}
