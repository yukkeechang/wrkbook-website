import React from 'react';
import MSpinner from '../../../Shared/MSpinner';
import ConJobListingPage from './ConJobListingComponent';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CardHeader from './ConJobListingComponents/JobPostCardHeader';
import EmployeeSelect from './ConJobListingComponents/ChangeEmployeeSelect';
import PendingEmployees from './ConJobListingComponents/PendingEmployees';
class ConView extends React.Component{
  constructor(props){
    super(props);

  }
  changeIndex=(e)=>{
    this.props.handleChangeIndex(e);
  }
  componentWillUnmount(){
    this.props.handle.stop();
  }

  render(){
    let employeesBoi = this.props.employees;
    if (!this.props.ready) {
      return(
        <MSpinner/>
      );
    }else if (employeesBoi.length>0) {
      return(
            <CardHeader
              jobId={this.props.job._id}
              jobTitle={this.props.job.jobTitle.text}
              locationName={this.props.job.location.locationName}
              notificationsLen={this.props.notifications.length}>

                <div style={{height:'250px',overflow: 'auto'}}>

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
          </CardHeader>
      )
    }else{
      return(
        <CardHeader
          jobId={this.props.job._id}
          jobTitle={this.props.job.jobTitle.text}
          locationName={this.props.job.location.locationName}
          notificationsLen={this.props.notifications.length}>

            {this.props.isUpcoming &&
              <PendingEmployees numberofEmployees={this.props.job.applyemployeeIds.length}
              jobId={this.props.job._id} />
            }

            <EmployeeSelect  handleClick={this.changeIndex}
            jobTypes={this.props.job.jobTypes.texts}/>

        </CardHeader>
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
    handle:handleAdmit,
    notifications:notifications

  };
})(ConView);
