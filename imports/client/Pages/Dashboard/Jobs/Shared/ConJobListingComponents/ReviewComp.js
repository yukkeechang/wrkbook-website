import React ,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import MSpinner from '../../../../Shared/MSpinner';
import ReviewModal from '../../../Reviews/ReviewModal';
import ViewReview from '../../../Reviews/ViewReview';
import Rating from 'react-rating';

class ReviewC extends Component{
   constructor(props){
     super(props);
   }
   render(){
    return (
      <div className="col s12 m4">
        <div className="center-align">
          <div className="row" style={{fontWeight:'bold'}}>
            {this.props.isCompeleted ? "Rating and Reviews" : "Pay"}
          </div>
          <div className="row">
            {
              this.props.isCompeleted ?(
                this.props.ready  ? (
                    this.props.reviews.length >0 ?
                    <ViewReview ratingValue={this.props.reviews[0].rating}
                    ratingText={this.props.reviews[0].review.text}/>
                    :
                    <ReviewModal isProReview={true}
                        conId={this.props.conId}
                        proId={this.props.proId}
                        jobId={this.props.jobId}/>
                  )
                  :
                  <MSpinner/>
                )
                :
                <div>
                  <div className= "row">
                    <h6>${this.props.hourPay}/hr</h6>
                    <h6>${this.props.dayPay}/day</h6>
                  </div>
                  <div className= "row">
                      <Link to={"/user/"+ this.props.proId}><a className="waves-effect waves-teal teal accent-1 btn-flat">View Profile</a></Link>
                  </div>

                </div>


            }

          </div>

        </div>
      </div>
    )
  }
}
export default ReviewComp =  withTracker(props=>{
  const handle = Meteor.subscribe('reviews-for-job',props.jobId);
  const ready = handle.ready();

  let reviews = Review.find({}).fetch();
  return {
      ready : handle.ready(),
      reviews: reviews ,
  };
})(ReviewC);
