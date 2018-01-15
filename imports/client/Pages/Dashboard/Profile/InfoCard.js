import { Link } from 'react-router-dom';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import Rating from 'react-rating';
class InfoCardU extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="card-panel">
        <div className="row">
          <div className="center-align">
            <div  className="col s12 ">
              <h5>{this.props.name}</h5>
            </div>
          </div>
          <div  className="col s12 center-align">
            <h6>{this.props.subTopic}</h6>
          </div>
        </div>
        <div className="row">
            <div className="col s12 center-align">
                 {this.props.ready&&
                                  <Rating
                                   initialRate={this.props.reviewAverage}
                                   readonly={true}
                                   empty={<i className="material-icons" style={{fontSize: "25px", color: "#26a69a"}}>star_border</i>}
                                   full={<i className="material-icons" style={{fontSize: "25px", color: "#26a69a"}}>star</i>}
                                   fractions={2}
                                 />
                    }
            </div>
            <div  className="col s12 center-align">
              <Link to={this.props.Url+"reviews"}>View All</Link>
            </div>
        </div>
        <div className="row">
          <div  className="col s12 center-align">
            <h6>{this.props.location}</h6>
          </div>
        </div>




        </div>

    );
  }
}
export default InfoCard =  withTracker(props=>{
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
    };
})(InfoCardU);
