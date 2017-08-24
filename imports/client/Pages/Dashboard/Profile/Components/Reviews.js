import React from 'react';
import Rating from './Rating';

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
              <div className="col s12 m12 l6">
                <h5>Ratings and Reviews</h5>
              </div>
              <div className="col s12 m12 l6">
                <Rating
                  rating={4.5}
                  starSize={25}
                  textSize={19}
                />
              </div>
            </div>
            <ReviewCard
              companyName={"Ziggys Painting Corporation"}
              date={"6/3/17"}
              rating={4.0}
              details={"John was very efficient with his job. He did a decent job with the plastering and was very neat with her work. Will definitely hire him again!"}
            />
            <ReviewCard
              companyName={"Mike Construction Corporation"}
              date={"5/1/17"}
              rating={5.0}
              details={"Mike was very efficient with his job. He did a decent job with the plastering and was very neat with her work. Will definitely hire him again!"}
            />
            <ReviewCard
              companyName={"Eukee Plumbing Company"}
              date={"4/22/17"}
              rating={3.5}
              details={"Mike was very efficient with his job. He did a decent job with the plastering and was very neat with her work. Will definitely hire him again!"}
            />
          </div>
        </div>
      </div>
    )
  }
}
