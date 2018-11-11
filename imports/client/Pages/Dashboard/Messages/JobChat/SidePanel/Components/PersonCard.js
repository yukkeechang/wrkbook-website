import React from 'react';
import Avatar from '../../../../../Shared/Avatar';
import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import {Roles} from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';


class PersonCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.handle.stop();
  }
  personClicked =()=>{
    this.props.handleParentClick(this.props.userId);
  }
  render(){
    console.log(this.props);
      return(

          <div  onClick={this.personClicked}style={{margin:'0px',cursor:'pointer'}} className="row">
            <div className="col s12">
              <div style={{marginBottom:'10px'}}className="row center-align">
                <div style={{marginTop:'15px'}} className="col s3">
                  <Avatar size={50} imageId={this.props.imageId}/>
                </div>
                <div style={{marginTop:'15px'}}  className="col s2">
                  {this.props.icon}
                </div>
                <div className="col s7 left-align">
                  <p style={{fontSize:'20px',marginBottom:'0px'}}className="truncate" >{this.props.name}</p>
                </div>

              </div>
              <div className="row">
                {
                  !this.props.message ?
                  ""
                  :
                  (this.props.currentUser == this.props.message.owner?
                      <h6 className="truncate">{this.props.message.message}</h6>
                      :
                      (!this.props.message.seen ?
                        <div>
                          <div className="col s10">
                            <h6 className="truncate">{this.props.message.message}</h6>
                          </div>
                          <div className="col s2">
                              <div className="notification-circle red"/>
                          </div>
                        </div>
                        :
                        <h6 className="truncate">{this.props.message.message}</h6>
                      )
                  )
                }

              </div>
            </div>
          </div>

      )
  }

}
export default PersonChat = withTracker(params  => {
    let handle = Meteor.subscribe('messages-conversation',params.userId,params.jobId);
    let ready = handle.ready();
    let currentUser = Meteor.userId();
    return {
        ready: ready,
        handle:handle,
        currentUser:currentUser,
        message: Message.find({  $or:[{channelId:{$exists:false},jobId:params.jobId,owner:currentUser,to:params.userId},
                {channelId:{$exists:false},jobId:params.jobId,owner:params.userId,to:currentUser}]},{sort:{timestamp:-1},limit:1}).fetch()[0]
    };
})(PersonCard);
