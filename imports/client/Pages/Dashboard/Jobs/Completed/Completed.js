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
    console.log(user)
    if(Roles.userIsInRole(this.props.user._id,"CON")){
      this.state={isPro: false}
    } else if (Roles.userIsInRole(this.props.user._id,"PRO")) {
      this.state={isPro: true}
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
