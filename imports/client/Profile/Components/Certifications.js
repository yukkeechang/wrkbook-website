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
        <div className="col s12 m6">
          <div className="card-panel">
            <h5>Certifications</h5>
            <div className="row">
              <div className="col s6">
                <p>Background Check</p>
              </div>
              <div className="col s6">
                <p>Apex Painting School</p>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <p>Driver's License</p>
              </div>
              <div className="col s6">
                <p>OSHA 30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
