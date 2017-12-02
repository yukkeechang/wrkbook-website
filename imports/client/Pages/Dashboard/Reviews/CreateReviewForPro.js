import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';

export default class CreateReview extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          hasRated: false,
          proFirstName: '',
          proLastName: ''
      }

      Meteor.call('findUserbyId', this.props.proId, function(err, res){
        if (err) {
          console.log("error finding user: "+err)
        } else {
          this.setState({
            proFirstName: res.profile.firstName,
            proLastName: res.profile.lastName
          })
        }
      }.bind(this));

  }

  // Callback after rating the employer. rate is the star value out of 5 stars
  handleRate(rate) {
    this.setState({
      hasRated: true,
      rating: rate,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let review=ReviewSchema.clean({});
    review.reviewerId = this.props.conId;
    review.revieweeId = this.props.proId;
    review.jobId = this.props.jobId;
    review.proReview.onTime = false;
    review.proReview.neatJob = false;
    review.proReview.wouldRecommend = false;
    review.companyName = 'placeholder text' ;
    review.rating = this.state.rating;
    review.review = 'v'
    //this.refs.reviewText.value();

    console.log(review.review)
    console.log(review)
    Meteor.call('validateReview', review, function(err) {
      if(err) {
        console.log(err.reason)
      } else {
        Meteor.call('createReview', review, function(err, res) {
          console.log("review sent in")
        })
      }
    })
    // Meteor.call('createReview', review, function(err, res){
    //   if(err) {
    //     console.log("error in sending reviews, "+err)
    //   } else {
    //     console.log("review sent in")
    //   }
    // })
  }

  componentDidMount(){
      Materialize.updateTextFields();
  }


  render() {
    console.log(this.props.conId)
      return (
        <div className="card">
            <div className="card-content">
                <div className="row">
                    <span className="col s10 card-title">
                        Thank you for using WrkBook!
                    </span>
                    <span className="col s10 card-title">
                        Please take a second to review {this.state.proFirstName} {this.state.proLastName} to help other contractors in the future
                    </span>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="col s12 m6">
                        <p>Please select the categories that describe {this.state.proFirstName}</p>
                          <p>
                            <input type="checkbox" className="filled-in" id="shows-up-on-time"/>
                            <label htmlFor="filled-in-box">Shows up on time</label>
                          </p>

                          <p>
                            <input type="checkbox" className="filled-in" id="clean"/>
                            <label htmlFor="filled-in-box">Clean</label>
                          </p>
                        <p>
                          <input type="checkbox" className="filled-in" id="has-tools"/>
                          <label htmlFor="filled-in-box">Has tools</label>
                        </p>
                        <p>
                          <input type="checkbox" className="filled-in" id="recommended"/>
                          <label htmlFor="filled-in-box">Recommended</label>
                        </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                        <p>Please rate {this.state.proFirstName} </p>
                        <Rating
                          initialRate={this.state.rating}
                          empty={<i className="material-icons" style={{"fontSize": "40px", color: "#26a69a"}}>star_border</i>}
                          full={<i className="material-icons" style={{"fontSize": "40px", color: "#26a69a"}}>star</i>}
                          fractions={2}
                          onChange={this.handleRate.bind(this)}
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s18 m8">
                            <MTextField ref="reviewText" id="reviewText"  label="Anything else we should know?" />
                        </div>
                    </div>
                    <input type="submit" className="btn blue-grey " data-html="true" value="Submit" />
                </form>
            </div>
        </div>
    )
  }
}
