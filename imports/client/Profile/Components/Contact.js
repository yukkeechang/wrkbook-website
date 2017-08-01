import React from 'react';

export default class Contact extends React.Component {
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
            <h5>Contact</h5>
            <div className="row">
              <div className="col s12">
                <p>Phone number: 718 678 1343</p>
              </div>
              <div className="col s12">
                <p>Email: Johngrego@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
