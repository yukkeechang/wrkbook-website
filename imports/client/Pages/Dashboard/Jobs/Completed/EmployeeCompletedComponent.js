import React from 'react';
import CreateReviewForPro from '../../Reviews/CreateReviewForPro';
import UserIcon from '../../../Shared/UserIcon';
import Avatar from '../../../Shared/Avatar';
import ReactDOM from 'react-dom';
import Rating from '../../Profile/Rating';

//-----------Details of completed jobs page for CONTRACTOR

function isEmpty(obj) {
  for(var x in obj){return false;}
  return true;
}


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

 openModal(){
   $(document).ready(()=> {
     $('#modal1').modal('open');
   });
   //console.log();
 }

 //-----------Renders review or review button for CONTRACTOR to rate PROFESSIONAL
 renderReview() {
     if(!(isEmpty(this.props.review))) {
       let rating = this.props.review.rating
      return (
        <div>
          <Rating
          rating = {rating}
          />
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


 render() {
      var hours = Math.abs(this.props.event.endAt.getHours() - this.props.event.startAt.getHours());
      var timediff = Math.abs(this.props.event.endAt.getTime() - this.props.event.startAt.getTime());
      var days = Math.ceil(timediff / (1000 * 3600 * 24));
      var totalPay = hours * days * this.props.job.professionals[0].pay;
      let endtime = this.props.event.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      let starttime = this.props.event.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      let enddate = this.props.event.endAt.getDate() + "/" + (this.props.event.endAt.getMonth() + 1) + "/" + this.props.event.endAt.getFullYear()
      let startdate = this.props.event.startAt.getDate() + "/" + (this.props.event.startAt.getMonth() + 1) + "/" + this.props.event.startAt.getFullYear()
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
                  <Avatar imageId={this.state.imgId} size={70}/>
                </div>
                <div className="col m8 center-align">
                  <h5>{this.state.proName} {this.state.proLastName}</h5>
                  <Rating/>
                </div>

              </div>
            </div>
            <div className="col m4 hide-on-small-only">
              <div style={{fontWeight:'bold'}}>
                Details
              </div>
              <h6>{startdate + " - " + enddate}</h6>
              <h6>{starttime + " - " + endtime}</h6>
              <h6>{this.props.event.responsibilities.text}</h6>
              <h6>Pay: ${totalPay}</h6>
            </div>
            <div className="col m4 hide-on-small-only">
              <div style={{fontWeight:'bold'}}>
                Rating and Reviews
                {this.renderReview()}
              </div>
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
                  <Rating/>
                </div>
              </div>
              <div className="row">
                <h6>{startdate + " - " + enddate}</h6>
                <h6>{starttime + " - " + endtime}</h6>
                <h6>{this.props.event.responsibilities.text}</h6>

                <h6>Pay: ${totalPay}</h6>
                <Rating/>


              </div>
            </div>
          </div>
        </div>
      )
    }
 }
