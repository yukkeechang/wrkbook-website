import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeCheckBoxs from './EmployeeReviewComponents/EmployeeCheckBox';
import EmployeeTitle from './EmployeeReviewComponents/EmployeeTitle';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';
import ReviewSchema from '../../../../api/Schemas/reviewSchema';


//contractor is calling this
export default class EditReviewForCon extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rating: this.props.review.rating
    }
  }
  componentDidMount(){
      M.updateTextFields();
  }

  handleRate=(rate)=> {
    this.setState({
      rating: rate,
    });
  };



  returnReview(e){
    let review = this.props.review;
    review.conReview = this.refs.checkbox.value();
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
                   <EmployeeTitle proId={this.props.review.revieweeId}/>
                   <EmployeeCheckBoxs ref="checkbox"/>
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
