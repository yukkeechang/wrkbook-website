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
          conFirstName: '',
          conLastName: '',
          companyName: '',
          paidOnTime: false,
          safeWorkspace: false,
          review: ''
      }

      Meteor.call('findUserbyId', this.props.conId, function(err,res) {
        if(err) {
          console.log("error finding a con user object in CreateReviewForPro: "+err)
        } else {
          this.setState({
            companyName: res.profile.employerData.companyName.text,
            conFirstName: res.profile.firstName,
            conLastName: res.profile.lastName

           })
        }
      }.bind(this));
  };

  // Callback after rating the employer. rate is the star value out of 5 stars
  handleRate(rate) {
    this.setState({
      hasRated: true,
      rating: rate,
    });
  };

  componentDidMount(){
      Materialize.updateTextFields();
  };

  handlePaidOnTime() {
    this.setState({paidOnTime: true})
  };

  handleSafeWorkspace() {
    this.setState({safeWorkspace: true})
  };


  handleSubmit (event) {
    event.preventDefault();
    let review = ReviewSchema.clean({});
    review.proReview.paidOnTime = this.state.paidOnTime;
    review.proReview.safeWorkspace = this.state.safeWorkspace;
    review.rating = this.state.rating
    review.review.text = this.refs.reviewText.value();
    review.reviewerId = this.props.proId;
    review.revieweeId = this.props.conId;
    review.companyName.text = this.state.companyName;
    review.jobId = this.props.jobId;
    //console.log(JSON.stringify(review));
    Meteor.call('createReview', review, function(err, res) {
      if(err) {
        console.log("error: " + err);
      } else {
        console.log("review made")
      }

    })

  };



  render() {
      return (
        <div className="card">
            <div className="card-content">
                <div className="row">
                    <span className="col s10 card-title">
                        Thank you for using WrkBook!
                    </span>
                    <span className="col s10 card-title">
                        Please take a second to review {this.state.conFirstName} {this.state.conLastName} at the company {this.state.companyName} to help other professionals like yourself
                    </span>
                </div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                        <div className="col s12 m6">
                        <p>Please select the categories that describe {this.state.conFirstName} {this.state.conLastName} and the job.</p>
                          <p>
                            <input type="checkbox" className="filled-in" id="paid-on-time" value={this.state.paidOnTime} onChange={this.handlePaidOnTime.bind(this)}/>
                            <label htmlFor="paid-on-time">Paid on time</label>
                          </p>
                        <p>
                          <input type="checkbox" className="filled-in" id="safe-workspace" value={this.state.safeWorkspace} onChange={this.handleSafeWorkspace.bind(this)}/>
                          <label htmlFor="safe-workspace">Safe workspace</label>
                        </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 m6">
                        <p>Please rate {this.state.companyName}</p>
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
