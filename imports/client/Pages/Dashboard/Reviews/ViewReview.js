import React,  { Component } from 'react'
import Rating from 'react-rating';


const ConComments =(props)=>{
  return(
  <div>
    <div>Other Comments: </div>
    <div>{props.review.conReview.wouldRecommend ? "- Would Recommend" : null}</div>
    <div>{props.review.conReview.neatJob ? "- Neat Job" : ''}</div>
  </div>
  );
};
const ProComments = (props)=>{
  return (
    <div>
      <div>Other Comments: </div>
      <div>{props.review.proReview.safeWorkSpace ? "-Safe Workspace" : null}</div>
      <div>{props.review.proReview.paidOnTime ? "- Paid on Time" : ''}</div>
    </div>
  )
}


export default class ViewReview extends React.Component {

  constructor(props) {
    super(props);

}


render() {

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
              !this.props.isProReview ?
              <ProComments review={this.props.review}/>
              :
              <ConComments review={this.props.review}/>
            }
        </div>
      </div>
    )
}


}
