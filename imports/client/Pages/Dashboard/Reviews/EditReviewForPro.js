import React from 'react';
import EmployeerCheckBox from './ContractorReviewComponents/EmployeerCheckBox';
import EmployeerTitle from './ContractorReviewComponents/EmployeerTitle';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';
import ReviewSchema from '../../../../api/Schemas/reviewSchema';

//professional is calling this
export default class EditReviewForPro extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rating: this.props.review.rating
    }
  }

  handleRate=(rate)=>{
    this.setState({
      rating: rate,
    });
  };
  componentDidMount(){
      M.updateTextFields();
  }

  returnReview(e){
    let review = this.props.review;
    review.proReview = this.refs.checkbox.value();
    review.rating = this.state.rating;
    review.review = this.refs.reviewText.value();
    return{
      review:review
    }
  }


  render(){
    return(
            <div className="card">
               <div className="card-content">
                   <EmployeerTitle conId={this.props.review.revieweeId}/>
                   <EmployeerCheckBox ref="checkbox"/>
                     <div className="row">
                         <div className="col s12 m6 offset-m3">
                         <p>Please rate </p>
                         <Rating
                           initialRate={this.state.rating}
                           empty={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star_border</i>}
                           full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
                           fractions={2}
                           onChange={this.handleRate}
                         />
                         </div>
                     </div>
                     <div className="row">
                         <div className="col s12 m6 offset-m3">
                             <MTextField ref="reviewText" id="reviewText" value={this.props.review.reviewText} label="Anything else we should know?" />
                         </div>
                     </div>
                  </div>
               </div>

    );
  }
}
