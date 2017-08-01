import React from 'react';

import GeneralInfo from './Components/GeneralInfo';

export default class ConProfile extends React.Component {
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col s4">
            <GeneralInfo />
          </div>
          <div className="col s8">
            <div className="row">
              <div className="col">
                <a className="waves-effect waves-light btn">About</a>
              </div>
              <div className="col">
                <a className="waves-effect waves-light btn">Contact</a>
              </div>
              <div className="col">
                <a className="waves-effect waves-light btn">Certifications</a>
              </div>
              <div className="col">
                <a className="waves-effect waves-light btn">Payment</a>
              </div>
              <div className="col">
                <a className="waves-effect waves-light btn">Reviews</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
