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
export default class ViewJobComp extends React.Component {
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
    return (
      <div>
        <div className="col">
          <button className="waves-effect waves-teal teal btn-flat">
            <div className="white-text">
                View Job
            </div>
          </button>
        </div>
      </div>
    )
  }
}
