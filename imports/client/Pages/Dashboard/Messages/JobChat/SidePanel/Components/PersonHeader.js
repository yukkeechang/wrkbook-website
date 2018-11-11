import React from "react";
import { withTracker } from "meteor/react-meteor-data";
class PersonHead extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillUnmount() {
    this.props.handle.stop();
  }
  render() {
    return (
      <div className="row grey lighten-3">
        <div className="col center-align s12">
          <h5 className="card-title">
            Messages
            {this.props.unreadChannels > 0?
            <span className="new badge notification-red-alert darken-1">
              {this.props.unreadChannels}
            </span>
            :
            null
            }
          </h5>
        </div>
      </div>
    );
  }
}

export default (PersonHeader = withTracker(params => {
  const handle = Meteor.subscribe("unread-messages-job", params.jobId);
  const ready = handle.ready();
  let uniquePeople = new Set();
  let currentuserId = Meteor.userId();
  let unreadMessages = Message.find({channelId:{$exists:false} ,jobId:params.jobId,to:currentuserId,seen:false}).fetch();
  if(!!unreadMessages){
    for (let i = 0; i < unreadMessages.length ; i++) {
      if (unreadMessages[i].owner != currentuserId) {
        uniquePeople.add(unreadMessages[i].owner);
      }
    }
  }
  console.log(unreadMessages);
  console.log(uniquePeople);

  return {
    unreadChannels: uniquePeople.size,
    handle: handle,
    ready: ready
  };
})(PersonHead));
