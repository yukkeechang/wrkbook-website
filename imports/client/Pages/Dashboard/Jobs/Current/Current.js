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
    this.state = {
      user: user,
      current: true
    };
    if (user.roles[0] === "PRO") {
      this.setState({isPro: true});
    } else if (user.roles[0] === "CON"){
      this.setState({isPro: false});
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
