import React, { Component } from "react";
import ReactDOM from "react-dom";


export default class Osha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      osha10: false,
      osha30:false
    };
  }
  value(){
    return {
      osha10:this.state.osha10,
      osha30:this.state.osha30

    };

  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
    });
    $(this.refs.osha).on('change',(e)=>{
      this.handleSelect(e);
    });
  }
  handleSelect = () =>{
    if($('#osha').val() == 2){
      this.setState({osha10:true,osha30:false});
    }else if($('#osha').val() ==3){
      this.setState({osha30:true,osha10:false});
    }
  };
  render() {

    return (
      <form>
        <div className="row">
          <div className="input-field col  s12">
            <select id="osha" ref="osha" defaultValue={[""]} onClick={(e)=>this.handleSelect(e)}>
              <option value="" disabled selected>OSHA preference</option>
              <option value="1">No preference</option>
              <option value="2">OSHA 10</option>
              <option value="3">OSHA 30</option>
            </select>
          </div>
        </div>
      </form>
    );
  }
}
