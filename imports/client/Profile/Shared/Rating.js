import React from 'react';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const filledStars = Number(this.props.rating);
    let unfilledStars = 5 - filledStars;
    let ratingArr = [];

    for (let i = filledStars; i > 0 ; i--) {
      if (i == 0.5) {
        ratingArr.push(
          <i className="material-icons left" style={{ color: "green", margin: 0, padding: 0, fontSize: this.props.size }}>star_half</i>
        );
        break;
      }
      ratingArr.push(
        <i className="material-icons left" style={{ color: "green", margin: 0, padding: 0, fontSize: this.props.size }}>star</i>
      );
    }

    // if (filledStarsLeft > 0) {
    //   <i className="material-icons left" style={{ color: "green" }}>star_half</i>
    //   unfilledStars -= 0.5;
    // }

    for (let i = unfilledStars; i > 0; i--) {
      if (i == 0.5) {
        break;
      }
      ratingArr.push(
        <i className="material-icons left" style={{ color: "green", margin: 0, padding: 0, fontSize: this.props.size }}>star_border</i>
      );
    }

    return (
      <div className="row">
        <div className="col s12">
          {ratingArr}
        </div>
      </div>
    )
  }
}
