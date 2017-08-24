import React from 'react';

export default class ConfirmationsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onViewJobClick = () => {
    console.log("View Job clicked...");
  }

  render() {
    return (
      <div className="card-panel" style={{ padding: 10, marginBottom: 10 }}>
        <div className="row" style={{ margin: 0, padding: 0 }}>
          <div className="col s3" style={{ margin: 0, padding: 0 }}>
            <div style={{ height: 60, width: 60, backgroundColor: "gray", borderRadius: "50%", padding: 0, marginLeft: 0, marginTop: 10 }}>
            </div>
          </div>
          <div className="col s9" style={{ margin: 0, padding: 0 }}>
            <p style={{ margin: 0, padding: 0 }}>{this.props.jobTitle}</p>
            <p style={{ margin: 0, padding: 0 }}>{this.props.matchType}</p>
            <a
              onClick={this.onViewJobClick}
              style={{ margin: 0, padding: 0 }}
            >
              View Job
            </a>
          </div>
        </div>
      </div>
    )
  }
}
