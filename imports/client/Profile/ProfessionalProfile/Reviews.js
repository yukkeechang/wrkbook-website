import React from 'react';
import Rating from '../Shared/Rating';

import ReviewCard from './ReviewCard';

export default class Reviews extends React.Component {
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
            <div className="row">
              <div className="col s5">
                <h5>Ratings and Reviews</h5>
              </div>
              <div className="col s5">
              <Rating
                rating={4.5}
                starSize={25}
                textSize={19} />
              </div>
              <div className="col s2">
                <h5></h5>
              </div>
            </div>
            <ReviewCard
              companyName={"Ziggy's Painting Corporation"}
              date={"6/3/17"}
              rating={4.0}
              details={"John was very efficient with his job. He did a decent job with the plastering and was very neat with her work. Will definitely hire him again!"}
            />
          </div>
        </div>
      </div>
    )
  }
}
