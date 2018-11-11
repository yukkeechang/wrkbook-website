import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class ChannelC extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    this.props.handle.stop()
  }
  channelClicked =()=>{
    this.props.handleParentClick(this.props.channelId);
  }
  render(){
      return(
          <div onClick={this.channelClicked} style={{cursor:'pointer'}}className="row bottom-divider">
            <div className="col s10 larger-text">
              {this.props.channelName}
            </div>
            <div className="col s2">
            {this.props.messageCount > 0 ?
              <div className="notification-circle notification-red-alert darken-1"/>:  null }
            </div>
          </div>
      )
  }
}
export default ChannelCard = withTracker(params => {
    let handle = Meteor.subscribe('messages-for-channel',params.jobId,params.channelName);
    let ready = handle.ready();
    let currentUserId = Meteor.userId();
    return {
        ready: ready,
        handle:handle,
        messageCount: Message.find({seenGroup:{$nin:[currentUserId]},channelId:params.channelId,owner:{$ne:currentUserId}}).count()
    };
})(ChannelC);
