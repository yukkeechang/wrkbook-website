import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ReviewCard from './ReviewComponents/ReviewCard';
import Rating from 'react-rating';
import References from '../../References/References';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';

class ReviewCompU extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    initGA()
    logPageView()
  }

  render(){

    if(!this.props.ready){
      return(
        <MSpinner/>
      )
    }else if (this.props.reviews.length>0) {

      return(
        <div >
          <div className="card-panel z-depth-0">

            <div className="right-align row" style={{marginBottom: '0px'}}>
            <div className="center-align s12" style={{marginBottom: '0px'}}>
                  <Rating
                    initialRate={this.props.reviewAverage}
                    readonly={true}
                    empty={<i className="material-icons" style={{fontSize: "40px", color: "#ABB2AE"}}>star</i>}
                    full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
                    fractions={2}
                  />
              </div>
            </div>
            <div className="row center-align">
              <h5 style={{margin: '0px'}}>
                  Reviews ({this.props.numReviews})
              </h5>
              <div className="divider" style={{marginTop: '7px'}}></div>
            </div>
            <div style={{height:'200px',overflowY: 'scroll',overflowX: 'hidden'}}>
              {this.props.reviews.map((reviews,index)=>{
                return(
                  <ReviewCard key={reviews._id} size={100} review={reviews}/>
                );
              })}
            </div>
          </div>
          {this.props.isPro &&
          <div className="card-panel z-depth-0">
            <div className="center-align row">
              <References/>
            </div>
          </div>
        }
        </div>
      )

    }else{
      return(
        <div>
          <div className="card-panel z-depth-0">
            <div className="row center-align">
                <h5>No Reviews </h5>
            </div>
          </div>
            {this.props.isPro&&
              <References/>
            }
        </div>
      )
    }
  }

}
export default ReviewForCurrent = withTracker( props  => {
  let handle = Meteor.subscribe('reviews-for-you');
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
