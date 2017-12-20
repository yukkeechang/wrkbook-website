// Component holds user image, user first and last name and rating for the
// company or the indivudal and displays on EmployeeComponentInner.js
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CreateReviewForPro from '../../Reviews/CreateReviewForPro';
import ReactDOM from 'react-dom';
import UserIcon from '../../../Shared/UserIcon';

function isEmpty(obj) {
  for(var x in obj){return false;}
  return true;
}
export default class UserInfoComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:"",
      lastName: "",
      imgId: "",
      user: {}
    }
    // if(Roles.userIsInRole(this.props.userId,"PRO")){
    //   Meteor.call('findUserbyId', this.props.proId, function(err, res){
    //     if(err) {
    //     } else {
    //       this.setState({
    //         firstName: res.profile.firstName,
    //         lastName: res.profile.lastName,
    //         imgId: res.profile.employeeData.image,
    //         user: res
    //       })
    //     }
    //   }.bind(this));
    // }
    // else if(Roles.userIsInRole(this.props.user._id,"CON")){
    //   Meteor.call('findUserbyId', this.props.conId, function(err, res){
    //     if(err) {
    //     } else {
    //       this.setState({
    //         firstName: res.profile.firstName,
    //         lastName: res.profile.lastName,
    //         imgId: res.profile.employerData.image,
    //         user: res
    //       })
    //     }
    //   }.bind(this));
    // }

  }
  componentDidMount(){
    // console.log(this.props);
    console.log(this.props);
  }
render(){
    let image = "cfs/files/images/"+this.props.imageId
    // console. log(this.props.imageId);
    return (
      <div>
        <div className="col">
          <div className="row" style={{fontWeight:'bold'}}>
            Professional
          </div>
          <div className="row">
            <div className="col m4 push-m2 center-align">
              <UserIcon imageId={this.props.imageId}/>
            </div>
            <div className="col m8 center-align">
              <h5>{this.props.firstName} {this.props.lastName}</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
