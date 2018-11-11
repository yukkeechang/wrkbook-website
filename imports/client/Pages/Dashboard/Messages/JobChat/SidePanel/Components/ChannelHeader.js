import React from "react";
import { withTracker } from "meteor/react-meteor-data";
class Channelheader extends React.Component {
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
            Channel
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

export default (ChannelHead = withTracker(params => {
  const handle = Meteor.subscribe("unread-channels", params.jobId);
  const ready = handle.ready();
  let currentUserId  = Meteor.userId();
  let uniqueChannels = new Set();
  let newMessages = Message.find({channelId:{$exists:true} ,owner:{$ne:currentUserId},jobId:params.jobId,to:{$exists:false},seenGroup:{$nin:[currentUserId]}}).fetch();
  if(!!newMessages){
    for (let i = 0; i < newMessages.length; i++) {
      uniqueChannels.add(newMessages[i].channelId);
    }
  }

  return {
    unreadChannels: uniqueChannels.size,
    handle: handle,
    ready: ready
  };
})(Channelheader));
