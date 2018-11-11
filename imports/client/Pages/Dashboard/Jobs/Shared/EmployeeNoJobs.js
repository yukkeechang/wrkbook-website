import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EmployeeNoUpJobs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card-panel  center-align">
        <img src="/images/hardhat.png" height="150" width="150" />
        <h5>You don't have any {this.props.message} jobs yet</h5>
      </div>
    );
  }
}
