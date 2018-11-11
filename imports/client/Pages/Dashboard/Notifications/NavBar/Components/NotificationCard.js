import React from 'react';
import Avatar from '../../../../Shared/Avatar'

export default class NotificationCard extends React.Component {
  constructor(props) {
    super(props);
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
          color = "wrkbook-green lighten-1 "
        break;
      case "APPLIED":
          letterToRender = "A";
          title = "New Hires!";
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
        <div style={{width:'450px'}}>
          <div className="row no-margin">
              <div className="col s3 take-up-width">
                  <Avatar size={80} letter={letterToRender}/>
              </div>
            <div className="col s8">
              <h5>{title}</h5>
              <h6 className="truncate">{this.props.notification.description}</h6>
            </div>
            <div style={{height:'70px'}} className="col s1 valign-wrapper">
              {!this.props.notification.seen &&
                <div className={`notification-circle ${color}`}></div>
              }
            </div>
          </div>
        </div>
      )
  }

}
