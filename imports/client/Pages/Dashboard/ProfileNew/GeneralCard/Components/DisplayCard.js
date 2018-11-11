import React from "react";

export default class InfoCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-content">
        <div className="row no-margin">
          <div className="col s12">
            <p className="center-align card-title to-bold no-margin">{this.props.name}</p>
            <p className="center-align no-margin">{this.props.jobTypes}</p>
          </div>
        </div>

          <div className="row">
            <div className="col s12">
              <p className="card-title center-align grey-text no-margin">{this.props.location}</p>
            </div>
          </div>
          <div className="divider"/>
          <div className="row">
            <div className="col s12">
              <p style={{marginTop:'10px'}} className=" no-margin card-title to-bold center-align" >Contact</p>
              <p className=" no-margin center-align">{this.props.phone}</p>
              <p className="no-margin center-align">{this.props.email}</p>
            </div>
          </div>

      </div>
    );
  }
}
