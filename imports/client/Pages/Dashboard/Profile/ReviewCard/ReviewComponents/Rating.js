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
    //console.log("unfilled: "+unfilledStars);
    let ratingArr = [];

    // Draw full and half stars
    for (let i = filledStars; i > 0; i--) {
      // If i is 0.5, push half star into array
      if (i <= 0.5) {
        ratingArr.push(
          <i
            className="material-icons left"
            style = {{ color: "#00897b", margin: 0, padding: 0, fontSize: this.props.starSize }}
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
          style={{ color: "#00897b", margin: 0, padding: 0, fontSize: this.props.starSize }}
          key={i}
        >
          star
        </i>
      );
    }
    //Round down to whole number
    var wholeUnfilledStar = Math.floor(unfilledStars);
    //Get the difference between actual rating and rounded down whole number rating
    let leftOver = unfilledStars - wholeUnfilledStar;
    //If it's almost at 1, include another full star. ie: 3.9 should be 4 stars
    if(leftOver > .9) {
      wholeUnfilledStar = unfilledStars;
    }
    // Draw empty stars
    //if rating is less than .25, give 0 stars
    for (let i = wholeUnfilledStar; i > 0; i--) {
      if (i < 0.25) {
        break;
      }
      // Push empty star into array
      ratingArr.push(
        <i
          className="material-icons left"
          style={{ color: "#00897b", margin: 0, padding: 0, fontSize: this.props.starSize }}
          key={i}
        >
          star_border
        </i>
      );
    }

    return (
      <div
        style={{fontSize: this.props.textSize }}
      >
        {ratingArr}
        <p style={{ display: "inline", margin: 0, padding: 0, marginLeft: 5 }}>{this.props.rating}</p>
      </div>

    )
  }
}
