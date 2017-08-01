import React from 'react';

import GeneralInfo from './Components/GeneralInfo';

export default class ConProfile extends React.Component{
  render() {
    return (
      <div class="container">
        <div className="row">
          <div className="col s4">
            <GeneralInfo />
          </div>
          <div className="col s8">
            <ul className="tabs">
              <li className="tab col s3"><a className="active" href="#">About</a></li>
              <li className="tab col s3"><a href="#">Contact</a></li>
              <li className="tab col s3"><a href="#">Certifications</a></li>
              <li className="tab col s3"><a href="#">Payment</a></li>
              <li className="tab col s3"><a href="#">Reviews</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
