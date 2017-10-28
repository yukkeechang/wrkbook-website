import React from 'react';
import Rating from './Rating';

export default class ReviewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div
            className="card-panel"
            style={{ margin: 0, paddingTop: 10, paddingBottom: 0, paddingLeft: 10, paddingRight: 10 }}
          >
            <div className="row">
              <div className="col s4">
                <img
                  className="review-img"
                  src="http://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                />
              </div>
              <div className="col s8">

                  <div className="col s12" style={{ margin: 0, padding: 0, fontSize: 16 }}>
                    {this.props.companyName} {this.props.date}
                  </div>


                <div className="row" style={{ margin: 0, padding: 0 }}>
                  <div className="col s12" style={{ margin: 0, padding: 0 }}>
                    <Rating
                      rating={4.5}
                      starSize={20}
                      textSize={15} />
                  </div>
                </div>
                <div className="row" style={{ margin: 0, padding: 0 }}>
                  <div className="col s12" style={{ margin: 0, padding: 0 }}>
                    {this.props.details}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
