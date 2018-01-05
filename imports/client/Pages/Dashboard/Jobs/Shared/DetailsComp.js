// Component holds event times and responsibilities/information for the
// job and displays on EmployeeComponentInner.js
import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
import CreateReviewForPro from '../../Reviews/CreateReviewForPro';
import ReactDOM from 'react-dom';

function isEmpty(obj) {
  for(var x in obj){return false;}
  return true;
}
export default class DetailsComp extends React.Component {
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
    console.log(this.props);
  }
render(){
    return (
      <div>
        <div className="col center-align">
          <div style={{fontWeight:'bold'}}>
            Details
          </div>
          <h6>{this.props.startdate + " " + this.props.starttime}</h6>
          <h6>{this.props.enddate + " " + this.props.endtime}</h6>
          <h6>{this.props.events.responsibilities.text}</h6>
          <h6>Total Pay: ${this.props.pay}</h6>
        </div>
      </div>
    )
  }
}
