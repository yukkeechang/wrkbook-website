import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ReviewCard from './ReviewComponents/ReviewCard';
import Rating from 'react-rating';
import RefForOther from '../../References/RefForOther';

class ReviewCompU extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(!this.props.ready){
      return(
        <MSpinner/>
      )
    }else if (this.props.reviews.length>0) {

      return(
        <div>
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
                  Reviews({this.props.numReviews})
              </h5>
            </div>
            {this.props.reviews.map((reviews,index)=>{
              return(
                <ReviewCard  key={reviews._id} size={100} review={reviews}/>
              );
            })}

          </div>
          <RefForOther userId={this.props.userId}/>
        </div>
      )

    }else{
      return(
        <div>
          <div className="card-panel">
            <div className="row center-align">
                <h5>No Reviews </h5>
            </div>
          </div>
          <RefForOther userId={this.props.userId}/>
        </div>
      )
    }

  }

}
export default ReviewForOther = withTracker( props  => {
  let handle = Meteor.subscribe('reviews-for-user',props.userId);
  let ready = handle.ready();
  let dataArray = [];
  let avg = 0;
  let reviews = Review.find({revieweeId:props.userId}).fetch();
  for(let index in reviews) {
      dataArray.push(reviews[index].rating);
  }
  let sum =  dataArray.length > 0 ?  dataArray.reduce(function(a, b) { return a + b; }) : 0;
  avg = dataArray.length > 0 ? (sum / dataArray.length): 0;

    return {
      reviewAverage:avg,
      numReviews:dataArray.length,
      ready:ready,
      reviews:reviews
    };
})(ReviewCompU);
