import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../Shared/MSpinner';
import ReviewCard from './ReviewComponents/ReviewCard';
import Rating from 'react-rating';
class ReviewCompU extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    if(!this.props.ready){
      return(
        <MSpinner/>
      )
    }else if (this.props.reviews.length>0) {

      return(
        <div className="card-panel">

          <div className="right-align row">
          <div className="center-align s12">
                <Rating
                  initialRate={this.props.reviewAverage}
                  readonly={true}
                  empty={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star_border</i>}
                  full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
                  fractions={2}
                />
            </div>
          </div>
          <div className="row center-align">
            <h5>
                Reviews
            </h5>
          </div>
          {this.props.reviews.map((reviews,index)=>{
            return(
              <ReviewCard  size={100} review={reviews}/>
            );
          })}
        </div>
      )

    }else{
      return(
        <div>
          <h1>No Reviews </h1>
        </div>
      )
    }
  }

}
export default ReviewForCurrent = withTracker( props  => {
  let handle = Meteor.subscribe('reviews-for-you');
  let ready = handle.ready();
  let userId = Meteor.userId();
  let dataArray = [];
  let avg = 0;
  let reviews = Review.find({revieweeId:userId}).fetch();
  for(let index in reviews) {
      dataArray.push(reviews[index].rating);
  }
  let sum =  dataArray.length > 0 ?  dataArray.reduce(function(a, b) { return a + b; }) : 0;
  avg = dataArray.length > 0 ? (sum / dataArray.length): 0;


    return {
      reviewAverage:avg,
      ready:ready,
      reviews:reviews
    };
})(ReviewCompU);
