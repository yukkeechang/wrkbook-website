import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Employeesu4 from '../Components/employeesu4';
import Contractsu2 from '../Components/contractsu2';

class StepTwo extends Component{
  render(){
    if(this.props.user){
      let page = this.props.user.profile.isPro ? <Contractsu2 history={this.props.history} /> : <Employeesu4 history={this.props.history} />;
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

export default StepTwoContainer = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
  };
}, StepTwo);
