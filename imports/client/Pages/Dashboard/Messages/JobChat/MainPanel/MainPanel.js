import React from 'react';
import { Meteor } from 'meteor/meteor';
import DisplayMessage from './Components/DisplayMessage'
import { withTracker } from 'meteor/react-meteor-data';


class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }

  }
  componentWillMount(){

  }
  componentDidMount(){
    // console.log(this.props);

  }
  componentWillMount(){
    if(!!this.props.handle){
      this.props.handle.stop();
    }
  }
  render(){

    if(this.props.messages.length > 1){
      return(
        <div>
          <h3 className="card-title center-align">{this.props.name}</h3>

          <div style={{height:'60vh'}}>
          {
            this.props.messages.map((message,index)=>{
              return(
              <DisplayMessage key={message._id} message={message} currentUserID={this.props.currentUserID}/>
              )
            })
          }
          </div>
          <div className="row">
            <form className=" input-field  col s12">

              <textarea style={{marginBottom:'0px'}} id="icon_prefix2" className="materialize-textarea"></textarea>
              <label htmlFor="icon_prefix2">Message</label>


            </form>
          </div>
        </div>
      );
    }
    else if(!this.props.ready&&!this.props.readyChannel){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          LOADNG
        </div>
      );
    }
    else{
      return(
          <div>
          NOTHING
          </div>
      );
    }
  }

}
export default MainPanel = withTracker(params => {
    let handle = null;
    let channelHandle = null;
    let ready = true;
    let readyChannel = true;

    let currentUserID = Meteor.userId();
    let messages = [];
    if(!!params.userId){
      handle = Meteor.subscribe('messages-conversation',params.userId,params.jobId);
      messages = Message.find({
        $or:[{channel:{$exists:false},jobId:params.jobId,owner:currentUserID,to:params.userId},
              {channel:{$exists:false},jobId:params.jobId,owner:params.userId,to:currentUserID}]}).fetch();
      ready =   handle.ready();
    }
    if(!!params.channelId){
      channelHandle = Meteor.subscribe('messages-for-channel',params.jobId,params.channelId);
      messages =  Message.find({channelId:params.channelId ,jobId:params.jobId,to:{$exists:false}}).fetch();
      readyChannel = channelHandle.ready();
    }



    return {
        ready: ready,
        readyChannel:readyChannel,
        handle:handle,
        channelHandle:channelHandle,
        messages:messages,
        currentUserID:currentUserID
    };
})(MainList);
