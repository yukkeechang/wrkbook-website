import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CreateReviewForPro from '../../Reviews/CreateReviewForPro';
import ReactDOM from 'react-dom';

function isEmpty(obj) {
  for(var x in obj){return false;}
  return true;
}
//Rendered in ConComponent

//Can't set res aas a state, not sure why
export default class EmployeeCompletedComponent extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     userName:"",
     userLastName: "",
     imgId: "",
     labelFontSize: 18,

     res: {}
   }



    Meteor.call('findUserbyId', this.props.id, function(err, res){
      if(err) {
        console.log("error is: "+err)
      } else {
        this.setState({
          userName: res.profile.firstName,
          userLastName: res.profile.lastName,
          imgId: res.profile.employeeData.image,
          res: res
        })
      }
    }.bind(this));
  }

  componentDidMount(){
    this.textSize();
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
      //$('select').material_select();
    });
  }

 textSize() {
  let width = document.body.scrollWidth;
  if (width >= 600) {
    this.setState({
      labelFontSize: 30
    });
   }  else if (width >= 375){
    this.setState({
      labelFontSize: 20
    });
   }  else {
    this.setState({
      labelFontSize: 18
     });
   }
 }
 writeReview() {
   //review modal
 }
 openModal(){
   $(document).ready(()=> {
     $('#modal1').modal('open');
   });
   //console.log();
 }

 renderReview() {
    if(!(isEmpty(this.props.review))) {
     return (
       <div>

       </div>
     )
   }
   else {
     return (
    <div>
       <button className="waves-effect waves-teal teal btn-flat" onClick={this.openModal.bind(this)}>
         <div className="white-text">
             Rate and Review
         </div>
       </button>

        <div id="modal1" className="modal modal-fixed-footer">
         <div className="modal-content">
           <CreateReviewForPro/>
         </div>
         <div className="modal-footer">
           <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
         </div>
        </div>

    </div>
       )
     }
   }

 renderProfDetails() {
   return (
     <div className="row">
       <div className="col l12 m10 s4">
        <div className="row">
          <div className="col l2 m10 s4">
            <img className="circle" src='/images/facebook.png' height='100px' width='100px'/>
          </div>
          <div className="col l6 m2 s2">
            <div style={{fontSize: this.state.labelFontSize}}>{this.state.userName} {this.state.userLastName}</div>
          </div>
        </div>
        </div>
        <div className="col l8 m2 s2">
          {this.renderReview()}
        </div>
     </div>
   )
 }

 render() {
      resStr = JSON.stringify(this.state.res)
      //console.log("resStr: "+resStr)
      str = JSON.stringify(this.props.event);
      //console.log(str)
      //console.log(this.props.job._id)

      console.log("event: "+str)
      console.log("job id: "+this.props.job._id)
      let image = "cfs/files/images/"+this.state.imgId
      return (
        <div className="row">
            <div className="card-content">
              {this.renderProfDetails()}
            </div>
        </div>
      )
    }
 }

 // export default  createContainer(props => {
 //   let event=[];
 //   let review=[];
 //   let loading = false
 //   let loading2 = false
 //   let jobId = props.job._id
 //   let proId = props.id
 //   let conId = props.job.employerId
 //   console.log("job id: "+jobId+" proId: "+proId+" conId: "+conId)
 //   let handleReview =  Meteor.subscribe('review-for-pro-completed', jobId, proId, conId)
 //   let handle = Meteor.subscribe('completed-job-pro-event',jobId);
 //   loading = handle.ready();
 //   console.log("loading: "+loading);
 //   console.log("loading2: "+loading);
 //   event = Event.find({}).fetch();
 //   console.log("event: "+event)
 //   console.log("review: "+review)
 //
 //   return {
 //     loading: loading,
 //     event: event,
 //     review: review
 //   };
 // }, EmployeeCompletedComponent);


//<a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
// <button className="waves-effect waves-teal teal btn-flat" onClick={this.writeReview.bind(this)}>
//   <div className="white-text">
//       Rate and Review
//   </div>
// </button>


// <div id="creationModal" className="modal">
//   <div className="modal-content">
//     <h5 style={{color:'red'}}>To create more than one job post you must subscribe to our payment plan.</h5>
//   </div>
//   <div className="modal-footer">
//     <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
//   </div>
// </div>
