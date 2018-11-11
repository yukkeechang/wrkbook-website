import React from 'react';
// import Rating from '../../../../Profile/ProProfile/Rating';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MSpinner from '../../../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import Avatar from '../../../../Shared/Avatar';
import { withTracker } from 'meteor/react-meteor-data';

 export default  class EmployeeComponent extends React.Component{

  constructor(props){
    super(props);
    this.state={
      jobId: this.props.jobInfo._id,
      employeeId: this.props.employeeId
    }
  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode(this.refs.declineModal);
    $(dropdowns).ready(()=>{
      $('.modal').modal();
    });
  }
  handleDecline=()=>{
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
    });
  }

  openDeclineModal=()=>{
    $(this.refs.declineModal).modal('open');
  }
  doNothing=()=>{
    $(this.refs.declineModal).modal('close');
  }
  componentWillUnmount=()=>{
    $(this.refs.declineModal).modal('close');
  }

  render(){
    let imageId=this.props.profile.employeeData.image;
    return(
      <div ref="employeeCard" className="card z-depth-0">
        <div className="card-content">
          {!this.props.isCompleted ?
            <div className="row" style={{height: '10px', padding: 'none', margin: '0px'}}>
              <div className="col s1 offset-s11" style={{textAlign:'right'}}>
                  <a onClick={this.openDeclineModal} className="waves-effect" style={{height: '25px', width:'25px',textAlign: 'center', fontSize: '30px', color: 'red'}}><i className="material-icons">delete_forever</i></a>
              </div>
            </div>
            :
            null
          }
          <div className="row center-align">
            <div className="col m2 s12" style={{display:'flex', justifyContent:'center'}}>

              <Avatar size={100} imageId={imageId}/>
            </div>
            <div className="col m8 s12 offset-m1">
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
              <div className="col m6 s12 offset-m5 offset-s3">
                <button className="waves-effect teal btn-flat" onClick={this.handleAdmit.bind(this)}>
                  <div className="white-text">
                  Hire
                  </div>
                </button>
              </div>
            }
            <div ref="declineModal" className="modal">
              <div className="modal-content">
                <div className="row center-align">
                  <i style={{fontSize:'100px',color:'#ffe57f '}}className="material-icons">error_outline</i>
                </div>
                <div className="row center-align">
                  <h3>Are you sure?</h3>
                  <h5>Once deleted you can not get this employee back.</h5>
                </div>
              </div>

              <div className="modal-footer">
                  <div className="col s6">
                    <button style={{width:'100%'}} className="waves-effect blue-grey lighten-5 btn-flat" onClick={this.doNothing}>
                      Cancel
                    </button>
                  </div>
                  <div className="col s6">

                    <button style={{width:'100%'}} className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.handleDecline}>
                      Yes
                    </button>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
