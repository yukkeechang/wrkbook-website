import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
import CreateReviewForPro from '../../Reviews/CreateReviewForPro';
import ReactDOM from 'react-dom';
import Avatar from '../../../Shared/Avatar';
import UserInfoComp from './UserInfoComp';
import DetailsComp from './DetailsComp';
import ViewJobComp from './ViewJobComp';
import { Link } from 'react-router-dom';
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
     completed: "",
     upcoming: "",
     current: "",
     id: "",
     conID: "",
     proID: "",
     job: {},
     jobID: "",
     events: {},
     proName:"",
     proLastName: "",
     imgId: "",
     userID: "",
     labelFontSize: 18,
     user: {}
   }

  }
componentWillMount(){
  Meteor.call('findUserbyId', this.props.proId, function(err, res){
    if(err) {
      console.log("eror");
    } else {
      console.log(res.profile.employeeData);
      this.setState({
        userId: res._id,
        proName: res.profile.firstName,
        proLastName: res.profile.lastName,
        imgId: res.profile.employeeData.image,
        user: res,
      })
    }
  }.bind(this));
}
  componentDidMount(){
    console.log(this.props);
    this.setState({
      completed: this.props.completed,
      upcoming: this.props.upcoming,
      current: this.props.current,
      id: this.props.id,
      conID: this.props.conId,
      proID: this.props.proId,
      job: this.props.job,
      jobID: this.props.jobId,
      events: this.props.event
    })
    this.textSize();
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
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
 render() {
   var hours = Math.abs(this.props.event.endAt.getHours() - this.props.event.startAt.getHours());
   var timediff = Math.abs(this.props.event.endAt.getTime() - this.props.event.startAt.getTime());
   var days = Math.ceil(timediff / (1000 * 3600 * 24));
   var totalPay = hours * days * this.props.job.professionals[0].pay;
   let endtime = this.props.event.endAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   let starttime = this.props.event.startAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
   let enddate = (this.props.event.endAt.getMonth() + 1) + "/" + this.props.event.endAt.getDate() + "/" + this.props.event.endAt.getFullYear();
   let startdate = (this.props.event.startAt.getMonth() + 1) + "/" + this.props.event.startAt.getDate() + "/" + this.props.event.startAt.getFullYear();
      return (
        <div>
          <div className="row center-align hide-on-small-only">
            <div className="col center-align m4 hide-on-small-only">
            {!!this.state.imgId ?
              <UserInfoComp
                proId={this.state.proID}
                conId={this.state.conID}
                userId={this.state.userId}
                firstName={this.state.proName}
                lastName={this.state.proLastName}
                imageId={this.state.imgId}
              />
              :
              <h1> halp</h1>
            }
            </div>
            <div className="col m4 hide-on-small-only">
              <DetailsComp
                events={this.props.event}
                pay={totalPay}
                endtime={endtime}
                enddate={enddate}
                starttime={starttime}
                startdate={startdate}
              />
            </div>
            <div className="col m4 hide-on-small-only">
              <div className ="row">
                <div className="col s12" style={{fontWeight:'bold'}}>
                Rating and Reviews
                  {this.renderReview()}
                </div>
              </div>
              <div className= "row">
                  <Link to={"/job/"+ this.props.jobId}><a className="waves-effect waves-teal teal accent-1 btn-flat">View Job</a></Link>
              </div>
            </div>
          </div>

          <div className="row center-align hide-on-med-and-up">
            <div className="col s12">
              <div className="row">
                <div className="col s4 center-align">
                    <Avatar imageId={this.state.imgId} size={50}/>
                </div>
                <div className="col s7 pull-s1 center-align">
                  <h5>{this.state.userName}  {this.state.userLastName}</h5>
                </div>
              </div>
              <div className="row">
                <h6>{startdate + " " + starttime}</h6>
                <h6>{enddate + " " + endtime}</h6>
                <h6>{this.props.event.responsibilities.text}</h6>
                <h6>Total Pay: {totalPay}</h6>
                <h6>The rating i gave to the company is</h6>
              </div>
            </div>
          </div>
        </div>
      )
    }
 }
