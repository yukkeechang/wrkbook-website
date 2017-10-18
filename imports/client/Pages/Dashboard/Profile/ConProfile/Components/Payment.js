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
              <div className="col  s12 m6">
                <p>
                  <i
                    className="material-icons left"
                    style={{ color: "green" }}
                  >
                    check
                  </i>
                  Direct Deposit
                </p>
              </div>
              <div className="col s12 m6 l6">
                <p>
                  <i
                    className="material-icons left"
                    style={{ color: "green" }}
                  >
                    check
                  </i>
                  Check
                </p>
              </div>
              <div className="col s12 m6 l6">
                <p>
                  <i
                    className="material-icons left"
                    style={{ color: "green" }}
                  >
                    check
                  </i>
                  Cash
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
