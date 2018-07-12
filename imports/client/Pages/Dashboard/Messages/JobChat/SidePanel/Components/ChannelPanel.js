import React from 'react';
import { Meteor } from 'meteor/meteor';
import ChannelCard from './ChannelCard'
import Moment from 'moment';
import AddChannel from './AddChannel';
import {Roles} from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';


class ChannelList extends React.Component {
  constructor(props) {
    super(props);

  }
  componentWillMount(){

  }
  componentDidMount(){
    // console.log(this.props);

  }
  componentWillMount(){
    this.props.handle.stop();
  }
  handleClick =(e)=>{
    this.props.handleGrandParentClick(e)
  }
  render(){
      return(
        <div>
          <AddChannel jobId={this.props.jobId}/>


          {
            this.props.channels.map((channel,index)=>{
              return(
                 <div style={{marginBottom:'0px'}} className="row">
                    <div className="col s12">
                      <ChannelCard handleParentClick={this.handleClick} channelId={channel._id} channelName={channel.name}/>
                    </div>
                  </div>

              )
            })
          }


        </div>
      )
  }

}
export default ChannelPanel = withTracker(params => {
    let handle = Meteor.subscribe('channels-for-job',params.jobId);
    let ready = handle.ready();
    return {
        ready: ready,
        handle:handle,
        channels: Channel.find({}).fetch()
    };
})(ChannelList);
