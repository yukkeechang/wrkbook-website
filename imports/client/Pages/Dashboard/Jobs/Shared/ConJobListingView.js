import React from 'react';
import MSpinner from '../../../Shared/MSpinner';
import ConJobListingPage from './ConJobListingComponent';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import EmployeeSelect from './ConJobListingComponents/ChangeEmployeeSelect';
import PendingEmployees from './ConJobListingComponents/PendingEmployees';
class ConView extends React.Component{
  constructor(props){
    super(props);

  }
  componentDidMount(){


  }
  changeIndex=(e)=>{
    console.log(e);
    this.props.handleChangeIndex(e);
  }

  render(){

    let employeesBoi = this.props.employees;
    console.log(employeesBoi.length);
    if (!this.props.ready) {
      return(
        <MSpinner/>
      );
    }else if (employeesBoi.length>0) {
      return(
        <div className="container">
          <div className="card">
            <div className="row card grey lighten-1">
              <div className="col s12 center-align">
                <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'150%', margin:'0px'}} className="flow-text">Job Title: {this.props.job.jobTitle.text}</p></Link>
              </div>
              <div className="col s12 left-align">
                <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'100%', margin:'0px'}} className="flow-text">Location: <u>{this.props.job.location.locationName}</u></p></Link>
              </div>
            </div>
            <div style={{height:'200px',overflow: 'auto'}}>

              {
                employeesBoi.map((employeeInfo,index)=>{
                  return(
                  <ConJobListingPage
                    key={employeeInfo._id}
                    employeeInfo={employeeInfo}
                    job={this.props.job}
                    isCompeleted={this.props.isCompeleted}

                  />
                );
                })
              }
            </div>
            {this.props.isUpcoming &&
              <PendingEmployees numberofEmployees={this.props.job.applyemployeeIds.length}
              jobId={this.props.job._id} />
            }

            <EmployeeSelect  handleClick={this.changeIndex}
            jobTypes={this.props.job.jobTypes.texts}/>
          </div>

        </div>
      )
    }else{
      return(
        <div className="container">
          <div className="card">
            <div className="row card grey lighten-1">
              <div className="col s12 center-align">
                  <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}>
                  <p style={{fontSize: '150%', margin:'0px'}} className="flow-text">Job Title: {this.props.job.jobTitle.text}</p>
                  </Link>
              </div>
              <div className="col s12 left-align">
                   <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}>
                   <p style={{fontSize:'100%', margin:'0px'}} className="flow-text">Location: <u>{this.props.job.location.locationName}</u>
                   {this.props.notifications.length >0 ? <span className="new badge">{this.props.notifications.length}</span> : null}</p>
                   </Link>
              </div>
            </div>
            <div className="row center-align">
              <p style={{margin:'16px'}} className="flow-text"> Sorry No Professionals Were Admitted to this Job</p>
            </div>
            {this.props.isUpcoming &&
              <PendingEmployees numberofEmployees={this.props.job.applyemployeeIds.length}
              jobId={this.props.job._id} />
            }

            <EmployeeSelect  handleClick={this.changeIndex}
            jobTypes={this.props.job.jobTypes.texts}/>
          </div>
        </div>
      )
    }
  }
}


export default ConJobListingView = withTracker(props =>  {
  let handleAdmit = Meteor.subscribe('admit-employee-job',props.job._id);
  let admitPeople = [];
  let notifications =[];
  let notifiloading =false;
  let readyAdmit = handleAdmit.ready();
  let notificationHandle = Meteor.subscribe('notifications-for-user')
  notifiloading = notificationHandle.ready();

  notifications = Notification.find({typeNotifi:'APPLIED',jobId:props.job._id}).fetch();


  if (!!Meteor.users.find({_id: {$in: props.employeeIds}}).fetch()) {
    admitPeople =  Meteor.users.find({_id: {$in: props.employeeIds}}).fetch();
  }
  if (props.employeeIds.length < 1) {
    admitPeople = [];
  }

  return {
    employees:admitPeople,
    ready:readyAdmit,
    notifications:notifications

  };
})(ConView);
