import React, { Component } from "react";
import ReactDOM from "react-dom";
import MTextField from "../../../Shared/MTextField";
import { Link } from 'react-router-dom';
import { initGA, logPageView } from "../../../Shared/GoogleAnalytics";

export default class CreateJobOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visorName: false,
      visorNumb: false,
      jobTitle: false,
      jobDesc : false
    };
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
      description:{
        text: this.refs.jd.value()
      },
      supervisor: {
        name: this.refs.sname.value(),
        phone: this.refs.snum.value()
      }
    };
    Meteor.call('validateJobTitleSupervisor',job,(err)=>{
      if(err){
        this.setState(err.reason);
      }else{
        this.props.next(2, job);
      }
    });
  }


  render() {
    let phrase = 'Must be between 1 and 250 characters';
    let phErr = 'Not a valid phone number';
    return (
    <div className="container">
      <div className="card">
        <div className="row card-content">
          <span className="col s12 card-title">Step 1: Basic Information</span>
            <div className="row">
              <div className="col s12">
                <MTextField ref="jt" label="Job Title *" error={this.state.jobTitle ? phrase: '' }/>
                <MTextField ref="jd" label="Job Description *" error={this.state.jobDesc ? phrase: '' }/>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                <MTextField ref="sname" label="Supervisor Name *" error={this.state.visorName ? phrase: '' }/>
              </div>
              <div className="col s12 m6">
                <MTextField ref="snum" label="Supervisor Number *"  error={this.state.visorNumb ? phErr: '' } />
              </div>
            </div>
            <Link to="/" className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>Cancel</Link>
            <a onClick={e => this.handleNext(e)} className="btn-flat teal lighten-5 col s5 offset-s2 m3 offset-m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}} >Next</a>
          </div>
        </div>
      </div>
    );
  }
}
