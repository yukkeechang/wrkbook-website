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
    let professionals = this.state.titles.map((title, index)=>{
      return this.refs[title].value();
    });
    let jobtypes = $('#jobTitles').val();

    return {
      professionals: professionals,
      additionText:  this.refs.at.value(),
      jobTypes:{
        texts: Object.values(jobtypes)
      }
    };
  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').formSelect();
    });
    $(this.refs.titles).change(()=>{
      this.setState({titles:$(this.refs.titles).val()})
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
