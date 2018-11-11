import React from "react";
import { Meteor } from "meteor/meteor";
import NotificationCard from "./PageComponents/SingleNotification";
import { withTracker } from "meteor/react-meteor-data";
import MSpinner from "../../Shared/MSpinner";
import ReactDOM from 'react-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);

  }
  componentWillUnmount() {
    this.props.handle.stop();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="container">
            <h1 className="center-align">Notifications</h1>
          </div>
        </div>
        {!this.props.ready ? (
          <div className="row">
            <div className="col s4 offset-s4 flex-center">
              <MSpinner size={"150px"} />
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="card-panel">
              {this.props.notifications.length > 0 ? (
                this.props.notifications.map((notification, index) => {
                  return (
                    <div key={notification._id}>
                      <NotificationCard notification={notification} />
                    </div>
                  );
                })
              ) : (
                <h1 className="center-align">No Notifications</h1>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default (NotficationsHome = withTracker(( params ) => {

  let handle = Meteor.subscribe("all-notifications-for-user");
  let ready = handle.ready();

  console.log(params);
  return {
    ready: ready,
    handle: handle,
    notifications: Notification.find({}).fetch()
  };
})(Home));
