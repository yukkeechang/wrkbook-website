import React from 'react';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    // filledStars is the rating
    const filledStars = Number(this.props.rating);
    let unfilledStars = 5 - filledStars;
    let ratingArr = [];

    // Draw full and half stars
    for (let i = filledStars; i > 0; i--) {
      // If i is 0.5, push half star into array
      if (i == 0.5) {
        ratingArr.push(
          <i
            className="material-icons left"
            style = {{ color: "green", margin: 0, padding: 0, fontSize: this.props.starSize }}
            key={i}
          >
            star_half
          </i>
        );
        break;
      }
      // Push full star into array
      ratingArr.push(
        <i
          className="material-icons left"
          style={{ color: "green", margin: 0, padding: 0, fontSize: this.props.starSize }}
          key={i}
        >
          star
        </i>
      );
    }

    // Draw empty stars
    for (let i = unfilledStars; i > 0; i--) {
      if (i == 0.5) {
        break;
      }
      // Push empty star into array
      ratingArr.push(
        <i
          className="material-icons left"
          style={{ color: "green", margin: 0, padding: 0, fontSize: this.props.starSize }}
          key={i}
        >
          star_border
        </i>
      );
    }

    return (
      <div className="row">
        <div
          className="col s12"
          style={{fontSize: this.props.textSize }}
        >
          {ratingArr}
          {this.props.rating}
        </div>
      </div>
    )
  }
}
