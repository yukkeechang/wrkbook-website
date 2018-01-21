import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeCheckBoxs from './EmployeeReviewComponents/EmployeerCheckBox';
import EmployeerTitle from './EmployeeReviewComponents/EmployeerTitle';
import MTextField from '../../Shared/MTextField';
import Rating from 'react-rating';


export default class EditReviewForPro extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rating: this.props.review.rating
    }
  }
  componentDidMount(){
    let select = ReactDOM.findDOMNode();
    $(select).ready(()=>{
      $('.modal').modal();
    });
  }
  openModal=()=>{
      $(this.refs.modal1).modal('open');
  }
  handleRate(rate) {
    this.setState({
      rating: rate,
    });
  };



  submitReview=()=>{
    let review=ReviewSchema.clean({});
    review.revieweeId = this.props.conId;
    review.reviewerId = this.props.proId;
    review.jobId = this.props.jobId;
    review.proReview = this.refs.checkbox.value();
    review.rating = this.state.rating;
    review.review = this.refs.reviewText.value();
    let reviewId = this.props.review._id;
    //console.log(review);
    Meteor.call('updateReview', reviewId, review,(err)=>{
          if(err){
            console.log(err);
          }else{
              $(this.refs.modal1).modal('close');
          }

        });
    }


  render(){
    return(
      <div>
         <button className="waves-effect waves-teal teal btn-flat" onClick={this.openModal}>
           <div className="white-text">
               Edit Rating
           </div>
         </button>
          <div ref="modal1" className="modal modal-fixed-footer">
          {/*MODAL CONTENT*/}
           <div className="modal-content">
            <div className="card">
               <div className="card-content">
                   <EmployeerTitle conId={this.props.conId}/>
                   <EmployeeCheckBoxs ref="checkbox"/>
                     <div className="row">
                         <div className="col s12 m6 offset-m3">
                         <p>Please rate </p>
                         <Rating
                           initialRate={this.state.rating}
                           empty={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star_border</i>}
                           full={<i className="material-icons" style={{fontSize: "40px", color: "#26a69a"}}>star</i>}
                           fractions={2}
                           onChange={this.handleRate.bind(this)}
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
          {/*MODAL CONTENT END*/}
           </div>
           <div className="modal-footer">
             <a onClick={this.submitReview} style={{width:'100%'}} className="modal-action modal-close waves-effect waves-green btn-flat">Submit</a>
           </div>
          </div>

      </div>
    );
  }
}
