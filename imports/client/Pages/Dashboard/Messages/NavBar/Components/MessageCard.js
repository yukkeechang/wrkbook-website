import React from 'react';
import Avatar from '../../../../Shared/Avatar';
import { Meteor } from 'meteor/meteor';
import Moment from 'moment';
import {Roles} from 'meteor/alanning:roles';

export default class NotificationCard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      senderName : '',
      imageId: '',
      channelName:''
    }

  }
  componentWillMount(){
    Meteor.call('findUserbyId',this.props.message.owner,(err,res)=>{

      if(err){
        console.log(err);
      }else{
        let image = res.roles.includes('PRO')  ? res.profile.employeeData.image : res.profile.employerData.image;
        this.setState({senderName:res.profile.firstName,imageId:image});
      }
    });
    if(!!this.props.message.channelId){
      Meteor.call('getChannel',this.props.message.channelId,(err,res)=>{
        if(err)console.log(err);
        else{
          this.setState({channelName:res.name});
        }
      });
    }
  }
  render(){
      console.log(this.state);
      return(
          <div style={{width:'450px'}}>
          <div  style={{margin:'0px'}} className="row">
            <div style={{height: '100%'}} className="col s3 ">
                <Avatar size={80} imageId={this.state.imageId}/>
            </div>
            <div className="col s9">
              <div className="row">
                <div className="col s8">
                  <h5>{this.state.senderName}</h5>
                </div>
                <div className="col s4">
                  <h6>{Moment(this.props.message.timestamp).fromNow()}</h6>
                </div>
              </div>
              <div className="row">
                <h6 className="truncate">
                  {this.props.message.message}
                  {this.state.channelName.length>0 ?
                    <span> @ {this.state.channelName} </span>
                    :
                    null
                  }
                </h6>
              </div>
            </div>
          </div>
        </div>
      )
  }

}
