import React from 'react';
import Rating from './Rating';
import { createContainer } from 'meteor/react-meteor-data';
import ReviewCard from './ReviewCard';
import MSpinner from '../../../../Shared/MSpinner';


function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class ARatingPage extends React.Component {
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

                <Rating
                  rating={review.rating}
                  starSize={20}
                  textSize={15}
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
          No Ratings
        </div>
      );
    }
  }
}

export default ARating = createContainer(({ params }) => {

  let reviews =[];
  let loading = false;
  let handle = Meteor.subscribe('reviews-for-you');
  loading = handle.ready();
  reviews = Review.find({}).fetch();
  // console.log("################1");
  // console.log(reviews);



  return {
    loading:loading,
    reviews:reviews
  };
}, ARatingPage);
