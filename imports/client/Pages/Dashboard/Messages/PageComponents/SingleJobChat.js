import React from 'react';
import Avatar from '../../../Shared/Avatar';
import { Link } from 'react-router-dom';
import MessageSingle from './SingleMessage';
import JobLocation from './JobLocation';
import { withTracker } from 'meteor/react-meteor-data';

class JobChatCard extends React.Component {
  constructor(props) {
    super(props);


  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){


      return(

        <div className="card">
          <div className="row">
            <div  className="card grey lighten-1">
            <div className="row">
              <div className="col s12 center-align">
                <Link style={{color: 'black'}} to={`/job-chat/${this.props.job._id}`}> <p className="truncate" style={{fontSize:'2em', margin:'0px'}}>Job Title: {this.props.job.jobTitle.text}</p></Link>
              </div>
            </div>
            <div  className="row">
              <div className="col s12 center-align">
                <Link style={{color: 'black'}} to={`/job-chat/${this.props.job._id}`}> <p className="truncate" style={{fontSize:'1.5em', margin:'0px'}}>Location: {this.props.job.location.locationName}</p></Link>
              </div>
            </div>
            </div>

          </div>
          <div className="row">
            <div style={{marginLeft:'15px',paddingRight:'20px'}} className="col s3">
                <JobLocation latitude={this.props.job.location.latitude} longitude={this.props.job.location.longitude} height={'200px'}/>
            </div>
            <div className="col s8">
                <div className="center-align card-title">Recent Messages</div>

                {this.props.messages.map((message,index)=>{
                  return (
                    <div key={message._id}>
                      <MessageSingle message={message}/>
                      <div className="divider"></div>
                    </div>
                  )
                })}
                {
                  this.props.messages.length<1 &&

                  <h4 className="center-align"> No Recent Messages</h4>
                }
            </div>
          </div>

        </div>





      )
  }

}

export default SingleJobChat = withTracker(params =>{
  let handle = Meteor.subscribe('all-messages-for-job',params.job._id);
  let ready = handle.ready();
  return{
    ready: ready,
    handle:handle,
    messages: Message.find({jobId:params.job._id},{sort:{timestamp:-1},limit:2}).fetch()
  }

})(JobChatCard)
