import React from 'react'
import Rating from 'react-rating';
export default ViewReview =(props)=>{
  return(
      <div>
        <div className="row">

            <Rating
              initialRate={props.ratingValue}
              readonly={true}
              empty={<i className="material-icons" style={{fontSize: "20px", color: "#26a69a"}}>star_border</i>}
              full={<i className="material-icons" style={{fontSize: "20px", color: "#26a69a"}}>star</i>}
              fractions={2}
            />

        </div>

        <div className="row">
          <h6>{props.ratingText}</h6>
        </div>
        <div>
        {/*
          this.props.review ?
        {this.props.review.conReview.onTime ? "- On Time" : ''}
        {this.props.review.conReview.neatjob ? "- Neat Job" : ''}
        {this.props.review.conReview.wouldRecommend ? "- Would Recommend" : ''}
        {this.props.review.proReview.paidOnTime ? "Paid on time" : ''}
        {this.props.review.proReview.safeWorkSpace ? "Safe workspace" : ''}
        : ''

    */  }

        </div>
      </div>
  )
}
