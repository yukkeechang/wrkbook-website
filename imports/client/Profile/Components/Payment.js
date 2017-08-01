import React from 'react';

export default class Payment extends React.Component {
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
            <h5>Payments Accepted</h5>
            <div className="row">
              <div className="col s6">
                <p>Direct Deposit</p>
              </div>
              <div className="col s6">
                <p>WRKBOOK Pay</p>
              </div>
              <div className="col s6">
                <p>Check</p>
              </div>
              <div className="col s6">
                <p>Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
