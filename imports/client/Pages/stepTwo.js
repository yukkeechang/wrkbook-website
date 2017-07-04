import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Employeesu4 from '../Components/employeesu4';
import Contractsu2 from '../Components/contractsu2';

class stepTwo extends Component{
  render(){
    if(this.props.user){
      let page = this.props.user.profile.isPro ? <Employeesu4/> : <Contractsu2/>;
      return(page);
    }
    else{
      return (
        <h1> LOG IN BOIIII </h1>
      )
      // this.props.history.push('/');
    }
  }
}

export default stepTwoContainer = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
  };
}, stepTwo);
