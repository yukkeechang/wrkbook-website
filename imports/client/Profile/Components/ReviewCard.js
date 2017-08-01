import React from 'react';

export default class ReviewCard extends React.Component {
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
            <div className="row">
              <div className="col s8">
                <h5>{this.props.companyName}</h5>
              </div>
              <div className="col s4">
                <p>{this.props.date}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <p>**** {this.props.rating}</p>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <p>{this.props.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
