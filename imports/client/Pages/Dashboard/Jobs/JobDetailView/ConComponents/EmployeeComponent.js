import React from 'react';
// import Rating from '../../../../Profile/ProProfile/Rating';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MSpinner from '../../../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import Avatar from '../../../../Shared/Avatar';
import { withTracker } from 'meteor/react-meteor-data';

 export default  class EmployeeComponent extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
    });
  }
  constructor(props){
    super(props);
    this.state={
      jobId: this.props.jobInfo._id,
      employeeId: this.props.employeeId
    }
  }
  handleDecline(){
    let employeeId = this.state.employeeId;
    let jobId = this.state.jobId;

    Meteor.call('declineEmployee', jobId, employeeId, (err)=>{
      if(err){
        console.log(err);
      }
      else{

      }
    });
  }
  handleAdmit(){
    let employeeId =  this.state.employeeId;
    let jobId = this.state.jobId;

    Meteor.call('admiteEmployee', jobId, employeeId, (err)=>{
      if(err){
        console.log(err);
      }
      else{

      }
    });
  }
  openModal(){
    $('#declineModal').modal('open');
  }

  render(){
    console.log(this.props);
    let imageId=this.props.profile.employeeData.image
    return(
      <div className="card z-depth-0">
        <div className="card-content">
          {!this.props.isCompleted ?
            <div className="row" style={{height: '10px', padding: 'none', margin: '0px'}}>
              <div className="col s1 offset-s11" style={{textAlign:'right'}}>
                  <a onClick={this.openModal.bind(this)} className="waves-effect" style={{height: '25px', width:'25px',textAlign: 'center', fontSize: '30px', color: 'red'}}><i className="material-icons">delete_forever</i></a>
              </div>
            </div>
            :
            null
          }
          <div className="row valign-wrapper ec" style={{width:'100%'}}>
            <div className="col m4 s12" style={{display:'flex', justifyContent:'center'}}>

              <Avatar size={100} imageId={imageId}/>
            </div>
            <div className="col m8 s12">
              <div className="row">
                <div className="col s12">
                  <h4>{this.props.profile.firstName + " " + this.props.profile.lastName}</h4>
                  <p>{this.props.profile.employeeData.jobTitle + " "}</p>
                  {
                    //rating
                  }
                  <p><Link to={"/user/" + this.props.employeeId}>
                    View profile
                  </Link></p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {
              !this.props.isAdmitted &&
              <div className="col m6 s12 offset-m4 offset-s2">
                <button className="waves-effect teal btn-flat" onClick={this.handleAdmit.bind(this)}>
                  <div className="white-text">
                  Hire
                  </div>
                </button>
              </div>
            }
            <div id="declineModal" className="modal">
              <div className="modal-content">
                <h4>Are you sure you want to delete this employee? Once deleted you can not get this employee back.</h4>
              </div>
              <div className="modal-footer">
                <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.handleDecline.bind(this)}>
                  I am sure.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
