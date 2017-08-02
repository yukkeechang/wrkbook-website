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
              <div className="col s9">
                <Rating rating={4.5}
                  size={15} />
                <p style={{ fontSize: 15 }}>4.5</p>
              </div>
              <div className="waves-effect waves-teal btn-flat col s3">
                <a style={{ fontSize: 12 }}
                  onClick={this.props.onReviewsClick}>View all</a>
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
