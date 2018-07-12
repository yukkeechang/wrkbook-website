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
      imageId: ''
    }

  }
  componentWillMount(){
    Meteor.call('findUserbyId',this.props.message.owner,(err,res)=>{

      if(err){
        console.log(err);
      }else{
        console.log(res);
        let image = Roles.userIsInRole(res._id,'PRO') ? res.profile.employeeData.image : res.profile.employerData.image;
        console.log(image);
        this.setState({senderName:res.profile.firstName,imageId:image});
      }
    })
  }
  componentDidMount(){
    // console.log(this.props);

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
                <h6 className="truncate">{this.props.message.message}</h6>
              </div>
            </div>
          </div>
        </div>
      )
  }

}
