import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MTextField from '../../../Shared/MTextField';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';

export default class CreateJobOne extends Component{
  constructor(props) {
    super(props);
      this.state = {

      }
  }
  componentDidMount() {
    initGA()
    logPageView()

  }


  createJobObject() {
    jobTitle = this.refs.jt.value();
    superName = this.refs.sname.value();
    superNumber = this.refs.snum.value();

      let job = {
        jobTitle: jobTitle,
        superName: superName,
        superNumber: superNumber
      }
      return job;
  }

  handleNext(e) {
    e.preventDefault();
    let job = this.createJobObject();
    this.props.next(2)
    console.log(job.jobTitle)
  }



  render() {
    return (
      <div>
        <div className="container">
        <h5>Make a Job Post</h5>
          <div className="card">
            <div className="container">
            <p>Step 1: Basic Information</p>
            <MTextField ref= "jt" label="Job Title"/>
            <MTextField ref= "sname" label="Supervisor Name"/>
            <MTextField ref= "snum" label="Supervisor Number"/>
            <a onClick={(e) => this.handleNext(e)} className="btn-flat teal lighten-5 col s12 m6" type="submit">Next</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
