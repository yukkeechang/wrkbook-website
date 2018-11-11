import React,  { Component } from 'react'
import Rating from 'react-rating';
export default class ViewReview extends React.Component {
  constructor(props) {
    super(props);

  }

render() {
  let ConComments =(props)=>{
    if(!!props.review){
      return(
      <div>
        <div>Other Comments: </div>
        <div>{props.review.conReview.wouldRecommend ? <span>Would Recommend<i className="tiny material-icons">check</i></span> : null}</div>
        <div>{props.review.conReview.neatJob ?  <span>Neat Job<i className="tiny material-icons">check</i></span>: null}</div>
        <div>{props.review.conReview.onTime ?  <span>On Time<i className="tiny material-icons">check</i></span> : null}</div>
      </div>
      );
    }else{
      return(
        <div> </div>
      )
    }
  };
  let ProComments = (props)=>{
    if(!!props.review){
      return (
        <div>
          <div>Other Comments: </div>
          <div>{props.review.proReview.safeWorkSpace ?  <span>Safe Workspace<i className="tiny material-icons">check</i></span> : null}</div>
          <div>{props.review.proReview.paidOnTime ? <span>Paid on Time<i className="tiny material-icons">check</i></span> : null }</div>
        </div>
      )
    }else{
      return(
        <div> </div>
      )
    }
  };

  return(
      <div>
        <div className="row">

            <Rating
              initialRate={this.props.ratingValue}
              readonly={true}
              empty={<i className="material-icons" style={{fontSize: "20px", color: "#26a69a"}}>star_border</i>}
              full={<i className="material-icons" style={{fontSize: "20px", color: "#26a69a"}}>star</i>}
              fractions={2}
            />

        </div>
        <div className="row">
          <h6>{this.props.ratingText}</h6>
            {
              !this.props.isProReview && !!this.props.review ?
              <ProComments review={this.props.review}/>
              :
              <ConComments review={this.props.review}/>
            }
        </div>
      </div>
    )
}


}
