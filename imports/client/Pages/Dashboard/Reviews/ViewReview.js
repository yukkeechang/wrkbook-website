import React,  { Component } from 'react'
import Rating from 'react-rating';
export default class ViewReview extends React.Component {

  constructor(props) {
    super(props);
    // if(this.props.review) {console.log("hi")}
    // console.log("review objct: "+this.props.review)
    // console.log("review rate val: "+this.props.ratingValue)
    // console.log("review rate txt: "+this.props.ratingText)
}



  renderCheckboxes() {
    if(this.props.review) {
      let wouldRecommend = this.props.review.conReview.wouldRecommend ? true : false;
      let  neatJob = this.props.review.conReview.neatJob ? true : false;
      let onTime = this.props.review.conReview.onTime ? true : false;

      let safeWorkSpace = this.props.review.proReview.safeWorkSpace ? true : false;
      let paidOnTime = this.props.review.proReview.paidOnTime ? true : false;


      if(wouldRecommend || neatJob || onTime ) {
        return (
          <div>
            <div>Other Comments: </div>
            <div>{this.props.review.conReview.wouldRecommend ? "- Would Recommend" : null}</div>
            <div>{this.props.review.conReview.neatJob ? "- Neat Job" : ''}</div>
          </div>
        )
      }
      if(safeWorkSpace || paidOnTime) {
        return (
          <div>
            <div>Other Comments: </div>
            <div>{this.props.review.proReview.safeWorkSpace ? "-Safe Workspace" : null}</div>
            <div>{this.props.review.proReview.paidOnTime ? "- Paid on Time" : ''}</div>
          </div>
        )
      }
    //  if(safeWorkSpace || paidOnTime) {
    //    return (
    //      <div>Other Comments: <div/>
    //      <div>{this.props.review.proReview.safeWorkSpace ? "- Would Recommend" : null}</div>
    //      <div>{this.props.review.proReview.paidOnTime ? "- Neat Job" : ''}</div>
    //   )
    // }
  }
}
//----doing if/else doesn't work
//   renderCheckboxes() {
//     if(this.props.review) {
//       let wouldRecommend = this.props.review.conReview.wouldRecommend ? true : false
//       let  neatJob = this.props.review.conReview.neatJob ? true : false
//
//       let safeWorkSpace = this.props.review.proReview.safeWorkSpace ? true : false
//       let paidOnTime = this.props.review.proReview.safeWorkSpace ? true : false
//       let onTime = this.props.review.conReview.onTime ? true : false
//
//       if(wouldRecommend || neatJob) {
//         return (
//           <div>Other Comments: <div/>
//           <div>{this.props.review.conReview.wouldRecommend ? "- Would Recommend" : null}</div>
//           <div>{this.props.review.conReview.neatJob ? "- Neat Job" : ''}</div>
//         )
//       // } else if(safeWorkSpace || paidOnTime) {
//       //   console.log("bruh")
//       //   return (
//       //     <div>Other Comments: <div/>
//       //     <div>{this.props.review.proReview.safeWorkSpace ? "- Would Recommend" : null}</div>
//       //     <div>{this.props.review.proReview.paidOnTime ? "- Neat Job" : ''}</div>
//       //   )
//       // }
//     }
//     // else {
//     //     console.log("problem")
//     //   }
//    else {
//       console.log("no boxes")
//     }
//   }
// }


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
          {this.renderCheckboxes()}
        </div>
      </div>
    )
}


}
