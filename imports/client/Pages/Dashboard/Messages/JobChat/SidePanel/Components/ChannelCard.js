import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class ChannelC extends React.Component {
  constructor(props) {
    super(props);


  }
  componentWillMount(){

  }
  componentDidMount(){
    // console.log(this.props);

  }
  componentWillMount(){
    this.props.handle.stop()
  }
  channelClicked =()=>{
    this.props.handleParentClick(this.props.channelId);
  }
  render(){

      return(
          <div onClick={this.channelClicked} style={{cursor:'pointer'}}className="row">
            <div className="col s12">
              {this.props.channelName}
              {this.props.messageCount > 0 ?
                <span>{this.props.messageCount}</span> :null }
            </div>
          </div>

      )
  }

}
export default ChannelCard = withTracker(params => {
    console.log(params.channelId);
    let handle = Meteor.subscribe('messages-for-channel',params.jobId,params.channelName);
    let ready = handle.ready();
    return {
        ready: ready,
        handle:handle,
        messageCount: Message.find({seen:false,channelId:params.channelId}).count()
    };
})(ChannelC);
