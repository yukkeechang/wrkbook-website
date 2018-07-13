import React, { Component } from "react";
import ReactDOM from "react-dom";
import MTextField from "../../../Shared/MTextField";
import Location from '../../../Shared/Location';
import Tools from './Tools';
import SocialS from './SocialS';
import { initGA, logPageView } from "../../../Shared/GoogleAnalytics";

export default class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    initGA();
    logPageView();
  }
  handleNext(e) {
    e.preventDefault();
    let job = {
      jobTitle: {
        text: this.refs.jt.value()
      },
      supervisor: {
        name: this.refs.sname.value(),
        phone: this.refs.snum.value()
      }
    };

    console.log(this.props.job);
  }
  handleCancel(){

  }
  render() {
    return (
    <div className="container">
      <div className="card">
        <div className="row card-content">


          <span className="col s12 card-title">Step 2: Basic Job Information</span>
                <Location/>
                <Tools/>
                <SocialS/>



            <a onClick={e => this.handleCancel(e)} className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>Cancel</a>
            <a onClick={e => this.handleNext(e)} className="btn-flat teal lighten-5 col s5 offset-s2 m3 offset-m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}}type="submit">Next</a>

          </div>
        </div>
      </div>
    );
  }
}
