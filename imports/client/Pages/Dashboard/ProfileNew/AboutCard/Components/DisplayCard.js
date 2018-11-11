import React from "react";

export default class AboutCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-content">
        <div className="row ">
          <div className="col s12">
            <h5 className="center-align card-title to-bold no-margin">About</h5>
          </div>
        </div>
        <div className="divider"/>
        <div className="row">
          <div className="col s12">
            <p className="card-title center-align">{this.props.bio}</p>
          </div>
        </div>
        <div className="row no-margin">
          <div className="col s3">
            <p className="card-title center-align to-bold no-margin">Languages Spoken</p>
          </div>
          <div className="col s9">
            <p className="card-title no-margin">{this.props.languages}</p>
          </div>
        </div>
        <div className="row no-margin">
          <div className="col s3">
            <p className="card-title center-align to-bold no-margin">Skills</p>
          </div>
          <div className="col s9">
            <p className="card-title  no-margin">{this.props.skills}</p>
          </div>
        </div>
        <div className="row no-margin">
          <div className="col s3">
            <p className="card-title center-align to-bold no-margin">Education</p>
          </div>
          <div className="col s9">
            <p className="card-title  no-margin">{this.props.education}</p>
          </div>
        </div>
      </div>
    );
  }
}
