import React , { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
// import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
// import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';

import ConCurrent from './ConCurrent';
import ProCurrent from './ProCurrent';

class CurrentJobs extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    this.state = {user: user}
    if(Roles.userIsInRole(this.props.user._id,"CON")){
      this.state={isPro: false}
    } else if (Roles.userIsInRole(this.props.user._id,"PRO")) {
      this.state={isPro: true}
  }
  }

render() {
  return (
    this.state.isPro ? <ProCurrent/> : <ConCurrent/>
  )
 }
}

export default Current = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, CurrentJobs);
