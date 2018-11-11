import React from 'react';
import ReactDOM from 'react-dom';

import EditReviewForPro from './EditReviewForPro';
import EditReviewForCon from './EditReviewForCon';
export default class EditReview extends React.Component{
  constructor(props){
    super(props);
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
  submitReview=()=>{
    let reviewPage = this.refs.reviewPage.returnReview();
    let review = reviewPage.review;
    let reviewId =review._id;
    delete review._id;

      Meteor.call('updateReview',reviewId,review,(err)=>{
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
         <button style={{width:'55%'}}className="teal lighten-2 roundish-button-flat" onClick={this.openModal}>
           <div className="white-text">
               Edit Review
           </div>
         </button>
          <div ref="modal1" className="modal modal-fixed-footer">
           <div className="modal-content">
            {this.props.isProReview ?
               <EditReviewForPro ref="reviewPage"
               review={this.props.oldReview}
               />
               :
               <EditReviewForCon ref="reviewPage"
                review={this.props.oldReview}
                />
              }
           </div>
           <div className="modal-footer">
             <a onClick={this.submitReview} style={{width:'50%'}} className="center-align modal-action modal-close teal lighten-2 roundish-button-flat">Submit</a>
           </div>
          </div>
      </div>
    );
  }
}
