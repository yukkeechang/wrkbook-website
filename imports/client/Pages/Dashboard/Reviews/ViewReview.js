import React from 'react'
import Rating from 'react-rating';
export default ViewReview =(props)=>{
  return(
      <div>
        <div className="row">

            <Rating
              initialRate={props.ratingValue}
              readonly={true}
              empty={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star_border</i>}
              full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
              fractions={2}
            />

        </div>

        <div className="row">
          <h6>{props.ratingText}</h6>
        </div>
      </div>
  )
}
