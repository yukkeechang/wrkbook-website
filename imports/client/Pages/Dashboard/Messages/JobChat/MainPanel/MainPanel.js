import React from 'react';
import { Meteor } from 'meteor/meteor';
import DisplayMessage from './Components/DisplayMessage';
import MSpinner from '../../../../Shared/MSpinner';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }

  }

  componentWillMount(){
    if(!!this.props.handle){
      this.props.handle.stop();
    }
  }
  componentDidMount(){
      let dropdowns = ReactDOM.findDOMNode();
      $(dropdowns).ready(()=>{
          $('input#input_text, textarea#icon_prefix2').characterCounter();
      });
  }
  handleKeyPress = (e)=>{
    if(e.charCode === 13){
      let messageToSend = {
        jobId: this.props.jobId,
        message: this.refs.messageBox.value
      }
      if(!!this.props.userId){
        messageToSend.to = this.props.userId;
      }else{
        messageToSend.channelId = this.props.channelId;
      }
      console.log(messageToSend);
      Meteor.call('createMessage',messageToSend,(err)=>{
        if(err)console.log(err);
        else{
          this.refs.messageBox.value='';
        }
      });
    }


  };
  render(){
    let MainHeader =(props)=>{
      return(
        <div className="row grey lighten-2">
          <div className="col center-align s12">
            <h5 className="card-title montserrat-med ">
              {props.children}
            </h5>
          </div>
        </div>
      )
    }
    if(this.props.messages.length > 0){
      return(
        <div>
        <MainHeader>
          {this.props.name}
        </MainHeader>

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
            <div className="input-field col s12">
              <i className="material-icons prefix">send</i>
              <textarea id="icon_prefix2" ref="messageBox" onKeyPress={this.handleKeyPress} className="materialize-textarea"></textarea>
              <label htmlFor="icon_prefix2">Type a message</label>
            </div>
          </div>
        </div>
      );
    }
    else if(!this.props.ready&&!this.props.readyChannel){
      return (
        <div className="flex-center" >
          <MSpinner/>
        </div>
      );
    }
    else{
      return(
        <div>
          <MainHeader>
            {this.props.name}
          </MainHeader>
          <div style={{height:'70vh'}}>

          </div>

          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">send</i>
              <textarea id="icon_prefix2" ref="messageBox" onKeyPress={this.handleKeyPress} className="materialize-textarea"></textarea>
              <label htmlFor="icon_prefix2">Type a message</label>
            </div>
          </div>

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
        $or:[{channelId:{$exists:false},jobId:params.jobId,owner:currentUserID,to:params.userId},
              {channelId:{$exists:false},jobId:params.jobId,owner:params.userId,to:currentUserID}]}).fetch();
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
