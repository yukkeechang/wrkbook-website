import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class WkEnd extends Component {
  constructor(props) {
    super(props);
  }
  value(){
    return {
      weekendExcluded: this.refs.eweekend.checked,


    };

  }
  render() {

    return (
      <div className="col s4">
        <label htmlFor="weekend">Exclude Weekends?</label>
        <div>
          <input  ref="eweekend" name="eweekend" type="radio" id="excludeYes"/>
          <label htmlFor="excludeYes" >Yes</label>
        </div>
        <div>
          <input  ref="iweekend"  name="eweekend" type="radio" id="excludeNo" defaultChecked={true}/>
          <label htmlFor="excludeNo" >No</label>
        </div>
      </div>
    );
  }
}
