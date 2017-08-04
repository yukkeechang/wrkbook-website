import React from 'react';

import Rating from '../Shared/Rating';

export default class GeneralInfo extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h4>John Grego</h4>
            <div className="row">
              <div
                className="col s8 valign-wrapper"
              >
                <Rating
                  rating={4.5}
                  starSize={15}
                  textSize={12}
                />
              </div>
              <div className="col s4 valign-wrapper">
                <a
                  style={{ fontSize: 12 }}
                  onClick={this.props.onReviewsClick}
                >
                  View all
                </a>
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
