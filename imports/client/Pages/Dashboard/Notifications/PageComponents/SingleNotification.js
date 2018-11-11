import React from 'react';
import Avatar from '../../../Shared/Avatar';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class NotificationCard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){
      let typeNotifi = this.props.notification.typeNotifi;
      let letterToRender = '';
      let title = '';
      let color = '';
      switch (typeNotifi) {
        case "MATCH":
            letterToRender = "M";
            title= "New Job Match!";
          break;
        case "APPLIED":
            letterToRender = "A";
            title = "New Professionals";
            color = "custom-blue";
          break;
        case "HIRED":
            letterToRender = "H";
            title = "You're Hired";
            color = "light-green lighten-1";
          break;
        case "REMOVE":
            letterToRender = "C";
            title = "Job Cancelled";
            color = "notification-red-alert";
          break;
        default:

      }




      return(
        <div>
          <div style={{marginTop:'25px'}} className="row">
              <div className="col m3 offset-m1 s12 center-align take-up-width">
                <div className="flex-center">
                  <Avatar size={150} letter={letterToRender}/>
                </div>

              </div>
            <div className="col m8 s12">
              <div style={{marginBottom:'1px'}} className="row">
                  <div className="col s12">
                  <h5> <b> {title}</b> {!this.props.notification.seen&&<span className="notification-red-alert-text" style={{fontSize:'larger'}}> <i> New </i> </span>}</h5>
                  </div>
              </div>
              {
                this.props.notification.typeNotifi == "MATCH" ?

                <div className="row">
                  <div className="col m12">
                    <div className="row">
                        <div className="cols m12">
                          <h6>{this.props.notification.description}</h6>
                        </div>
                    </div>
                    <div className="row">
                      <div  className="col m6 s6 round-border">
                        {!!this.props.job&&
                          <div>
                          <h6 className="larger-text"><b>Job Details</b></h6>
                          <h6>Pay:<span> ${this.props.job.professionals[0].pay}/hr</span></h6>
                          <h6>Location: <span >{ this.props.job.location.locationName}</span></h6>
                          <h6>Profession: <span>{this.props.job.jobTypes.texts[0]}</span></h6>
                          </div>
                        }
                      </div>
                      <div style={{height:'100px'}}className="col m4 s6 valign-wrapper center-align">
                        <Link to={this.props.notification.href}  style={{width:'80%'}} className="wrkbook-green lighten-1 roundish-button-flat center-align">
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="row">
                  <div className="col m8 s12">
                      <h6>{this.props.notification.description}</h6>
                  </div>
                  <div className="col m4 s10 offset-s2 valign-wrapper center-align">
                    <Link to={this.props.notification.href} style={{width:'80%'}} className={`${color} roundish-button-flat center-align`}>
                      View Job
                    </Link>
                  </div>
                </div>
              }
            </div>
          </div>
          <div style={{marginBottom:'10px'}} className="divider"></div>
        </div>
      )
  }

}

export default SingleNotification = withTracker(params =>{
  let handle = Meteor.subscribe('one-job',params.notification.jobId);
  let ready = handle.ready();
  return{
    ready: ready,
    handle:handle,
    job: Job.find({_id:params.notification.jobId}).fetch()[0]
  }

})(NotificationCard)
