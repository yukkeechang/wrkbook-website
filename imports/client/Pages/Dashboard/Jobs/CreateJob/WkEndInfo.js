import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class WkEnd extends Component {
  constructor(props) {
    super(props);
  }
  value(){
    return  this.refs.eweekend.checked;

  }
  render() {

    return (
      <div className="col s4">
        <label htmlFor="weekend">Exclude Weekends?</label>
        <div>
          <label>
          <input  ref="eweekend" name="eweekend" type="radio" id="excludeYes"/>
          <span >Yes</span>
          </label>
        </div>
        <div>
          <label>
          <input  ref="iweekend"  name="eweekend" type="radio" id="excludeNo" defaultChecked={true}/>
          <span >No</span>
          </label>
        </div>
      </div>
    );
  }
}
