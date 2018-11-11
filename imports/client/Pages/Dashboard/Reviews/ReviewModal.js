import React from 'react';
import ReactDOM from 'react-dom';

import CreateReviewForPro from './CreateReviewForPro';
import CreateReviewForCon from './CreateReviewForCon';
export default class ProModalReview extends React.Component{
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

    if (reviewPage.valid) {
        let review = reviewPage.review;
        Meteor.call('createReview',review,(err)=>{
          if(err){
            console.log(err);
          }else{
              $(this.refs.modal1).modal('close');
          }

        });
    }

  }
  render(){
    return(


      <div>
         <button style={{width:'55%'}}className="teal lighten-2 roundish-button-flat" onClick={this.openModal}>
           <div className="white-text">
               Rate and Review
           </div>
         </button>
          <div ref="modal1" className="modal modal-fixed-footer">
           <div className="modal-content">
            {this.props.isProReview ?
               <CreateReviewForPro ref="reviewPage"
               proId={this.props.proId}
               jobId={this.props.jobId}
               />
               :
               <CreateReviewForCon ref="reviewPage"
                conId={this.props.conId}
                jobId={this.props.jobId}
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
