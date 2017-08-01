import React from 'react';

export default class ConProfile extends React.Component{
  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <h4>John Grego</h4>
              <div className="row">
                <div className="col s8">
                  <p>4.0</p>
                </div>
                <div className="col s4">
                  <p>View all</p>
                </div>
              </div>
              <h5>Painter</h5>
              <p>Brooklyn, New York</p>
            </div>
            <div className="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
