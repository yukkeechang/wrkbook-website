import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlesscYesClick=()=>{
    $("#taxDisplay").css("display","none"); //keeps tax display hidden on yes click for ssc
    $("#taxYes").prop('checked',true);  //checks appropriate tax field for ssc yes click
  }
  handlesscNoClick=()=>{
    $("#taxDisplay").css("display","block");  //shows tax display on no click for ssc
  }
  value(){
    return {
      social: $("#sscYes").prop('checked'),
      taxID: $("#taxYes").prop('checked'),
    };

  }
  render() {
    return (

          <div>
          <div className="col s4">
            <label>Is Social Security required?</label>
            <div>
              <input name="group1" type="radio" id="sscYes" onClick={this.handlesscYesClick}/>
              <label htmlFor="sscYes">Yes</label>
            </div>
            <div>
              <input name="group1" type="radio" id="sscNo" onClick={this.handlesscNoClick}/>
              <label htmlFor="sscNo">No</label>
            </div>
          </div>
          <div id="taxDisplay" style={{display:'none'}} className="col s4">
            <label>Is Tax Id required?</label>
            <div>
              <input name="group2" type="radio" id="taxYes"/>
              <label htmlFor="taxYes">Yes</label>
            </div>
            <div>
              <input name="group2" type="radio" id="taxNo"/>
              <label htmlFor="taxNo">No</label>
            </div>
          </div>
          </div>

    );
  }
}
