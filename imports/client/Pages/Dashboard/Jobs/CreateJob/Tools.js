import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handletoolYesClick=()=>{
    $("#toolDisplay").css("display","inline"); //displays tool input on yes click
  }
  handletoolNoClick=()=>{
    $("#toolDisplay").css("display","none");  //hides tool input on no click
  }
  value(){
    return{
      toolsRequired: $("#toolYes").prop('checked'),
      toolsName:  $('#tools').val()
    }
  }
  render() {
    return (
      <form>
        <div className="row">
          <div className="col m2 s4">
            <label>Are tools required?</label>
            <div>
              <label>
              <input name="group1" type="radio" id="toolYes"  onClick={this.handletoolYesClick} />
              <span>Yes</span>
              </label>
            </div>
            <div>
            <label>
              <input name="group1" type="radio" id="toolNo" onClick={this.handletoolNoClick} />
              <span>No</span>
            </label>
            </div>
          </div>
          <div id="toolDisplay" style={{display:'none'}} className="input-field col m10 s8">
            <label>
            <input id="tools" ref="tools" type="text"/>
            <span>Required tools:</span>
            </label>
          </div>
        </div>
      </form>
    );
  }
}
