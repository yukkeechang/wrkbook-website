import React ,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import MSpinner from '../../../../Shared/MSpinner';
import ReviewModal from '../../../Reviews/ReviewModal';
import EditReviewForCon from '../../../Reviews/EditReviewForCon';
import ViewReview from '../../../Reviews/ViewReview';
import EditReviewModal from '../../../Reviews/EditReviewModal';

import Rating from 'react-rating';

class ReviewC extends Component{
   constructor(props){
     super(props);
   }
   componentWillUnmount(){
     this.props.handle.stop();
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
                  <div>
                    <ViewReview
                    ratingValue={this.props.reviews[0].rating}
                    ratingText={this.props.reviews[0].review}
                    review={this.props.reviews[0]}
                    isProReview={true}
                    />
                    <EditReviewModal
                    oldReview={this.props.reviews[0]}
                    isProReview={false}
                    />
                  </div>

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
                      <Link to={`/user/${this.props.proId}`}><a style={{width:'50%'}} className="waves-effect waves-teal teal lighten-1 roundish-button-flat">View Profile</a></Link>
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

  let reviews = Review.find({jobId:props.jobId}).fetch();
  return {
      handle:handle,
      ready : handle.ready(),
      reviews: reviews ,
  };
})(ReviewC);
