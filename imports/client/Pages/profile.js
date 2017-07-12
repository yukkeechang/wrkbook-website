import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import EmpProfile from '../Components/empprofile';
import ConProfile from '../Components/conprofile';

class Profile extends Component{
  render(){

    if(this.props.user){
      let page = this.props.user.profile.isPro ? <ConProfile/> : <EmpProfile/>;
      return(page);
    }
    else{
      return (
        <h1> PROFILE BOIIII </h1>
      )
      // this.props.history.push('/');
    }
  }
}

export default ProfileContainer = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
  };
}, Profile);
