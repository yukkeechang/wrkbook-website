import React from 'react';
import Avatar from '../../../Shared/Avatar';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

export default class SingleMessage extends React.Component {
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

  }
  componentWillUnmount(){

  }
  render(){
      return(

          <div className="row">
            <div className="col s11">
                <h5>{this.state.senderName}</h5>
                <h6 className="truncate">{this.props.message.message}</h6>
            </div>
            <div style={{marginTop:'25px'}} className="col s1">

                <Avatar size={30} imageId={this.state.imageId}/>

            </div>
          </div>
      )
  }

}
