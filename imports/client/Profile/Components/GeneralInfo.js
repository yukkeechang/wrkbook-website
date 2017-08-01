import React from 'react';

export default class GeneralInfo extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h4>John Grego</h4>
            <div className="row">
              <div className="col s7">
                <p>4.0</p>
              </div>
              <div className="col s5">
                <a href="#">View all</a>
              </div>
            </div>
            <h5>Painter</h5>
            <p>Brooklyn, New York</p>
          </div>
        </div>
      </div>
    )
  }
}
