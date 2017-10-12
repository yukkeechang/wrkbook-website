import React from 'react';
import Rating from './Rating';
import { createContainer } from 'meteor/react-meteor-data';
import ReviewCard from './ReviewCard';
import MSpinner from '../../../Shared/MSpinner';


function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class DisplayReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    if(!isEmpty(this.props.reviews)){
      let reviewz = this.props.reviews;
      return(
        <div className="container">
          <br/>
          {reviewz.map(function(review, index){
            return(

                <ReviewCard
                  companyName={"Mike Construction Corporation"}
                  date={"5/1/17"}
                  rating={review.review}
                  details={"Mike was very efficient with his job. He did a decent job with the plastering and was very neat with her work. Will definitely hire him again!"}
                />

            )
          })}
        </div>
      );
    }
    else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
        <div>
        //<EmployerNoUpcomingJobs/>
        No jobs
        </div>
      );
    }
  }
}

export default Reviews = createContainer(({ params }) => {
  let user = Meteor.user();
  let reviews =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('reviews-for-user',user._id);
    loading = handle.ready();
    reviews = Review.find({}).fetch();
    console.log("################1");
    console.log(reviews);
  }
  return {
    user: user,
    loading:loading,
    reviews:reviews
  };
}, DisplayReviews);
