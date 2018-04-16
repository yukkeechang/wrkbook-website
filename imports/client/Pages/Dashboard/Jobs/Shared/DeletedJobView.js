import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EmployeeNoUpJobs extends Component {
  constructor(props){
    super(props);

  }
    render() {
        return (
          <div className="container">
            <div className="card-panel  center-align">

                <h4>{this.props.job.jobTitle.text}</h4>

            </div>
          </div>
        );
    }
}
