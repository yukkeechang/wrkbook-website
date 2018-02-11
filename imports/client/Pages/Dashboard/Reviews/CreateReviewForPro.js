import React, {Component}  from 'react';
import Rating from 'react-rating';
import EmployeeTitle from './EmployeeReviewComponents/EmployeeTitle';
import EmployeeCheckBoxs from './EmployeeReviewComponents/EmployeeCheckBox';
import ReviewSchema from '../../../../api/Schemas/reviewSchema';
import MTextField from '../../Shared/MTextField';
export default class CreateReview extends Component {
  constructor(props) {
      super(props);
      this.state = {
          rating: 0,
          hasRated: false,
      }

  }

  // Callback after rating the employer. rate is the star value out of 5 stars
  handleRate(rate) {
    this.setState({
      hasRated: true,
      rating: rate,
    });
  }

  returnReview(e) {


    let review=ReviewSchema.clean({},{mutate:true});
    review.revieweeId = this.props.proId;
    review.jobId = this.props.jobId;
    review.conReview = this.refs.checkbox.value();

    review.rating = this.state.rating;
    review.review = this.refs.reviewText.value();
        console.log(review);
    return{
      review: review,
      valid: this.state.hasRated,
    }

  }

  componentDidMount(){
      Materialize.updateTextFields();
  }





  render() {
      return (
        <div className="card">
            <div className="card-content">
                <EmployeeTitle proId={this.props.proId}/>
                <EmployeeCheckBoxs ref="checkbox"/>

                  <div className="row">
                      <div className="col s12 m6 offset-m3">
                      <p>Please rate </p>
                      <Rating
                        initialRate={this.state.rating}
                        empty={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star_border</i>}
                        full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
                        fractions={2}
                        onChange={this.handleRate.bind(this)}
                      />
                      </div>
                  </div>
                  <div className="row">
                      <div className="col s12 m6 offset-m3">
                          <MTextField ref="reviewText" id="reviewText"  label="Anything else we should know?" />
                      </div>
                  </div>


            </div>
        </div>
    )
  }
}
