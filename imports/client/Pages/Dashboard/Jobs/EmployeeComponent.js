import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
export default class EmployeeComponent extends React.Component{
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
    return(
      <div className="card">
        <div className="card-content ">
          <div className="row valign-wrapper ec" style={{width:'100%'}}>
            <div className="col m4 s12" style={{display:'flex', justifyContent:'center'}}>
              <img className="circle" src='/images/facebook.png' height='100px' width='100px'/>
            </div>
            <div className="col m8 s12">
              <div className="row">
                <div className="col s12">
                  <h5>{this.props.profile.firstName + " " + this.props.profile.lastName}</h5>
                  <p>{this.props.profile.employeeData.location.locationName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
              <Link to={"user/" + this.props.employeeId}>
                  <button className="waves-effect waves-teal teal lighten-1 btn-flat">
                    <div className="white-text">
                      View Profile
                    </div>
                  </button>
              </Link>
            </div>
            {
              !this.props.isAdmitted &&
              <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
                <button className="waves-effect waves-teal teal lighten-1 btn-flat" onClick={this.handleAdmit.bind(this)}>
                  <div className="white-text">
                    Hire
                  </div>
                </button>
              </div>
            }
            <div className="col l6 m6 s12" style={{display:'flex', justifyContent:'center', padding:'4px'}}>
              <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.openModal.bind(this)}>
                Decline
              </button>
            </div>
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
