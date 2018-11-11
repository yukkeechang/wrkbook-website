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
              <label>
              <input name="group1" type="radio" id="sscYes" onClick={this.handlesscYesClick}/>
              <span>Yes</span>
              </label>
            </div>
            <div>
            <label>
              <input name="group1" type="radio" id="sscNo" onClick={this.handlesscNoClick}/>
              <span>No</span>
              </label>
            </div>
          </div>
          <div id="taxDisplay" style={{display:'none'}} className="col s4">
            <label>Is Tax Id required?</label>
            <div>
              <label>
              <input name="group2" type="radio" id="taxYes"/>
              <span>Yes</span>
              </label>
            </div>
            <div>
              <label>
              <input name="group2" type="radio" id="taxNo"/>
              <span>No</span>
              </label>
            </div>
          </div>
          </div>

    );
  }
}
