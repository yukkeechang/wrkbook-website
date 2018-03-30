import React , { Component } from 'react';
import { Link } from 'react-router-dom';

import { Roles } from 'meteor/alanning:roles';

import { withTracker } from 'meteor/react-meteor-data';
import OtherUserRoute from './OtherUserRoutes';
class OUser extends React.Component {
constructor(props) {
  super(props);
  this.state={
      routeName:'',
  }


}


render() {
    console.log(this.props);
    if(!this.props.ready){
      return(
        <h1>LOADING</h1>
      )
    }else if (!!this.props.user) {
      return (

        <OtherUserRoute props={this.props} user={this.props.user}/>
      )
    }else{
      <h1>NO</h1>
    }


 }
}
export default ProfileOther = withTracker(params  => {
  let user = {};
  console.log(params);
  let handle = Meteor.subscribe('other-user',params.match.params.value);
  let ready = handle.ready();
  return {
    ready:ready,
    user:Meteor.users.find({_id:params.match.params.value}).fetch()[0],
  };
})(OUser);
