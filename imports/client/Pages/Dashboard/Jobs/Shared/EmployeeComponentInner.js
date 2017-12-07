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
     proName:"",
     proLastName: "",
     imgId: "",
     labelFontSize: 18,
     user: {}
   }

    Meteor.call('findUserbyId', this.props.proId, function(err, res){
      if(err) {
      } else {
        this.setState({
          proName: res.profile.firstName,
          proLastName: res.profile.lastName,
          imgId: res.profile.employeeData.image,
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
    console.log(this.props);
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
       let image = "cfs/files/images/"+this.state.imgId
      return (
        <div>
          <div className="row center-align hide-on-small-only">
            <div className="col m4">
              <div  className="row" style={{fontWeight:'bold'}}>
                Professional
              </div>
              <div className="row">
                <div className="col m4 center-align">
                  <img src='/images/facebook.png' />
                </div>
                <div className="col m8 center-align">
                  <h5>{this.state.userName} {this.state.userLastName}</h5>
                  <ARating/>
                </div>

              </div>
            </div>
            <div className="col m4 hide-on-small-only">
              <div style={{fontWeight:'bold'}}>
                Details
              </div>
              <h6>{this.props.event.startAt.toLocaleString()}</h6>
              <h6>{this.props.event.endAt.toLocaleString()}</h6>
              <h6>{this.props.event.responsibilities.text}</h6>
              <h6>Pay</h6>
            </div>
            <div className="col m4 hide-on-small-only">
              <div style={{fontWeight:'bold'}}>
                Rating and Reviews
                {this.renderReview()}
              </div>
              <ARating/>
              <h6>The rating i gave to the company is</h6>
            </div>
          </div>

          <div className="row center-align hide-on-med-and-up">
            <div className="col s12">
              <div className="row">
                <div className="col s4 center-align">
                  <img src='/images/facebook.png' width='50px' height='50px'/>
                </div>
                <div className="col s8 center-align">
                  <h5>{this.state.userName}  {this.state.userLastName}</h5>
                  <ARating/>
                </div>
              </div>
              <div className="row">
                <h6>{this.props.event.startAt.toLocaleString()}</h6>
                <h6>{this.props.event.endAt.toLocaleString()}</h6>
                <h6>{this.props.event.responsibilities.text}</h6>
                <h6>Pay: </h6>
                <ARating/>
                <h6>The rating i gave to the company is</h6>
              </div>
            </div>
          </div>
        </div>
      )
    }
 }
