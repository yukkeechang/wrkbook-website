import React from 'react';
import MSpinner from '../../../Shared/MSpinner';
import { createContainer } from 'meteor/react-meteor-data';
import ARating from '../../Profile/ProProfile/Components/ARating';
import CreateReviewForPro from '../../Reviews/CreateReviewForPro';
import UserIcon from '../../../Shared/UserIcon';
import Avatar from '../../../Shared/Avatar';
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
     proName:"",
     proLastName: "",
     imgId: "",
     labelFontSize: 18,
     jobType: "",
     user: {}
   }

    Meteor.call('findUserbyId', this.props.proId, function(err, res){
      if(err) {
        console.log("error is: "+err)
      } else {
        this.setState({
          proName: res.profile.firstName,
          proLastName: res.profile.lastName,
          imgId: res.profile.employeeData.image,
          jobType: res.profile.employeeData.jobTitle,
          user: res
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
            <CreateReviewForPro
            proId={this.props.proId}
            conId={this.props.conId}
            jobId={this.props.jobId}
            />
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
         </div>

     </div>
        )
      }
    }

    // <div>
    //    <button className="waves-effect waves-teal teal btn-flat" onClick={this.openModal.bind(this)}>
    //      <div className="white-text">
    //          Rate and Review
    //      </div>
    //    </button>
    //
    //     <div id="modal1" className="modal modal-fixed-footer">
    //      <div className="modal-content">
    //        <CreateReviewForPro/>
    //      </div>
    //      <div className="modal-footer">
    //        <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    //      </div>
    //     </div>
    //
    // </div>

 render() {
       var hours = Math.abs(this.props.event.endAt.getTime() - this.props.event.startAt.getTime()) / 36e5;
       var totalPay = hours * this.props.job.professionals[0].pay;
       let endtime = this.props.event.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
       let starttime = this.props.event.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
       let enddate = this.props.event.endAt.getDate() + "/" + (this.props.event.endAt.getMonth() + 1) + "/" + this.props.event.endAt.getFullYear()
       let startdate = this.props.event.startAt.getDate() + "/" + (this.props.event.startAt.getMonth() + 1) + "/" + this.props.event.startAt.getFullYear()
       let image = "cfs/files/images/"+this.state.imgId
       if(('undefined' === typeof(this.state.user.profile))){
         return(
           <MSpinner/>
         )
       }
       else{
        return (
          <div>
            <div className="row center-align hide-on-small-only">
              <div className="col m4">
                <div  className="row" style={{fontWeight:'bold'}}>
                  Professional
                </div>
                <div className="row">
                  <div className="col m4 center-align">
                    <Avatar imageId={this.state.imgId} size={70}/>
                  </div>
                  <div className="col m8 center-align">
                    <h5>{this.state.proName} {this.state.proLastName}</h5>
                    <ARating/>
                  </div>
                </div>
              </div>

              <div className="col m4 hide-on-small-only">
                <div style={{fontWeight:'bold'}}>
                  Details
                </div>
                <h6>Profession: {this.state.jobType}</h6>
                <h6>Start: {startdate + " at " + starttime}</h6>
                <h6>End: {enddate + " at " + endtime}</h6>
              </div>

              <div className="col m4 hide-on-small-only">
                <div style={{fontWeight:'bold'}}>
                  Pay
                </div>
                <h6>Total Payment: ${totalPay}</h6>
              </div>
            </div>

            <div className="row center-align hide-on-med-and-up">
              <div className="col s12">
                <div className="row">
                  <div className="col s4 center-align">
                    <Avatar imageId={this.state.imgId} size={50}/>
                  </div>
                  <div className="col s8 center-align">
                    <h5>{this.state.proName}  {this.state.proLastName}</h5>
                    <ARating/>
                  </div>
                </div>
                <div className="row">
                  <h6>Profession: {this.state.jobType}</h6>
                  <h6>{startdate + " at " + starttime}</h6>
                  <h6>{enddate + " at " + endtime}</h6>
                  <h6>Total Payment: ${totalPay}</h6>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
 }
