import React , { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
// import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
// import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';

import ConCompleted from './ConCompleted';
import ProCompleted from './ProCompleted';


class CompletedJobs extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    this.state = {
      user: user
    };
    if (Roles.userIsInRole(this.userId,PROFESSIONAL)) {
      this.setState({isPro: true});
    } else if (user.roles[0] === "CON"){
      this.setState({isPro: false});
    }
  }

render() {
  return (
    this.state.isPro ? <ProCompleted/> : <ConCompleted/>
  )
 }
}

export default Completed = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, CompletedJobs);
