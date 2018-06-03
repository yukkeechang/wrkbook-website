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
  componentDidMount(){
    // console.log(this.props);
    console.log(this.props);
  }
  componentWillUnmount(){
    this.props.handle.stop();
  }
  render(){


      return(

        <div className="card">
          <div style={{paddingLeft:'10px',paddingRight:'10px',marginBottom:'0px'}}className="row">
            <div  className="card grey lighten-1">
            <div style={{marginLeft:'-10px',marginRight:'-10px',marginBottom:'0px',paddingTop:'15px',paddingBottom:'15px'}}  className="row">
              <div className="col s12 center-align">
                <Link style={{color: 'black'}} to={"/job-chat/"+ this.props.job._id}> <p className="truncate" style={{fontSize:'2em', margin:'0px'}}>Job Title: {this.props.job.jobTitle.text}</p></Link>
              </div>
            </div>
            </div>

          </div>
          <div className="row">
            <div style={{marginLeft:'15px',paddingRight:'20px'}} className="col s3">
                <JobLocation latitude={this.props.job.location.latitude} longitude={this.props.job.location.longitude} height={'175px'}/>
            </div>
            <div className="col s8">
                {this.props.messages.map((message,index)=>{
                  return (
                    <div>
                      <MessageSingle message={message}/>
                      <div className="divider"></div>
                    </div>
                  )
                })}
            </div>
          </div>

        </div>





      )
  }

}

export default SingleJobChat = withTracker(params =>{
  let handle = Meteor.subscribe('all-messages-for-job',params.job._id);
  let ready = handle.ready();
  console.log(params);
  // console.log(Job.find({}).fetch()[0]);
  return{
    ready: ready,
    handle:handle,
    messages: Message.find({},{sort:{timestamp:1},limit:2}).fetch()
  }

})(JobChatCard)
