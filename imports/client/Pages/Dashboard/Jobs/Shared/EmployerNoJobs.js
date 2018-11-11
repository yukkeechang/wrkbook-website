import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EmployerNoJobs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card-panel  center-align">
        <img src="/images/hardhat.png" height="150" width="150" />
        <h5>You dont have any {this.props.message} jobs!</h5>
        <Link to={"/createjob"} className="btn">
          <div className="col s12 m12 l12">Create a New Job!</div>
        </Link>
      </div>
    );
  }
}
