import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import reviewSchema from '../../../api/Schemas/reviewSchema';

export default class SendReviews extends React.Component {
  constructor(props){
  super(props);
    this.state = {
    }
  }

  sendReview() {
    let areview = reviewSchema.clean({});

     areview.revieweeId = 'FErhEKCBjcrn5Hz34'
     areview.rating = 3
     areview.review.text = "test review text"

    Meteor.call('createReview', areview, (err) =>{
      if(err) {
        console.log(err)
      }
    })

  }

  render() {
    console.log("review page!")
    return(
      <div className="container">
      <div>
        <a className="waves-effect waves-teal btn-flat" onClick={this.sendReview()}>Send review</a>
      </div>
      </div>
    )
  }

}
