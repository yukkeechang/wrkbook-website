import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';

import ReviewSchema from '../../../../api/Schemas/reviewSchema';

export default class CreateReview extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          hasRated: false,
          proFirstName: '',
          proLastName: '',
          onTime: false,
          neatJob: false,
          recommend: false,
          companyName: ' ',
          conObj: {}
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

      //get job object
      //stringify
      //get company name
      Meteor.call('findUserbyId', this.props.conId, function(err,res) {
        if(err) {
          console.log("error finding a con user object in CreateReviewForPro: "+err)
        } else {
          this.setState({companyName: res.profile.employerData.companyName.text, conObj: res })
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
    console.log("handle submit")
    console.log(this.state.companyName)
    event.preventDefault();
    let review=ReviewSchema.clean({});
    review.reviewerId = this.props.conId;
    review.revieweeId = this.props.proId;
    review.jobId = this.props.jobId;
    review.conReview.onTime = this.state.onTime;
    review.conReview.neatJob = this.state.neatJob;
    review.conReview.wouldRecommend = this.state.recommend;
    review.companyName.text = this.state.companyName ;
    review.rating = this.state.rating;
    review.review.text = this.refs.reviewText.value();


    console.log(review)

    Meteor.call('createReview', review, function(err, res) {
      console.log(err);
    });

  }

  componentDidMount(){
      Materialize.updateTextFields();
  }

  handleOnTime() {
    this.setState({onTime: true});
  }
  handleNeatJob() {
    this.setState({neatJob: true});
  }
  handleRecommend() {
    this.setState({recommend: true});
  }





  render() {
    let jobObj = JSON.stringify(this.state.companyName);
    console.log(jobObj)
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
                            <input type="checkbox" className="filled-in" id="onTime"  value={this.state.onTime} onChange={this.handleOnTime.bind(this)}/>
                            <label htmlFor="onTime">Shows up on time</label>
                          </p>
                          <p>
                            <input type="checkbox" className="filled-in" id="neatJob" value={this.state.neatJob} onChange={this.handleNeatJob.bind(this)} />
                            <label htmlFor="neatJob">Neat Job</label>
                          </p>
                        <p>
                          <input type="checkbox" className="filled-in" id="recommend" value={this.state.recommend} onChange={this.handleRecommend.bind(this)}/>
                          <label htmlFor="recommend">Recommended</label>
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
