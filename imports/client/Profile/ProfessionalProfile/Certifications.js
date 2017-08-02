import React from 'react';

export default class Certifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5>Certifications</h5>
            <div className="row">
              <div className="col s6">
                <p><i className="material-icons left" style={{ color: "green" }}>check</i>Background Check</p>
              </div>
              <div className="col s6">
                <p><i className="material-icons left" style={{ color: "green" }}>check</i>Apex Painting School</p>
              </div>
              <div className="col s6">
                <p><i className="material-icons left" style={{ color: "green" }}>check</i>Driver's License</p>
              </div>
              <div className="col s6">
                <p><i className="material-icons left" style={{ color: "green" }}>check</i>OSHA 30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
