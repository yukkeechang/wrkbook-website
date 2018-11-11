import React from 'react';
import Avatar from '../../../Shared/Avatar';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

export default class SingleMessage extends React.Component {
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
        let image = res.roles.includes('PRO') ? res.profile.employeeData.image : res.profile.employerData.image;
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
      return(

          <div className="row">
            <div className="col s10">
                <h5>{this.state.senderName}</h5>
                <h6 className="truncate">{this.props.message.message}
                  {this.state.channelName.length>0 ?
                    <span> @ {this.state.channelName} </span>
                    :
                    null
                  }
                </h6>
            </div>
            <div style={{marginTop:'25px'}} className="col s2">

                <Avatar size={50} imageId={this.state.imageId}/>

            </div>
          </div>
      )
  }

}
