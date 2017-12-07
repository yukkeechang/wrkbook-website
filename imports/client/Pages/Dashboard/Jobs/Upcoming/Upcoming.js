import React , { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
// import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
// import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';

import ConUpcoming from './ConUpcoming';
import ProUpcoming from './ProUpcoming';

class UpcomingJobs extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    console.log(user)
    this.state = {user: user}
    if(Roles.userIsInRole(this.props.user._id,"CON")){
      this.state={isPro: false}
    } else if (Roles.userIsInRole(this.props.user._id,"PRO")) {
      this.state={isPro: true}
  }
  }

render() {
  return (
    this.state.isPro ? <ProUpcoming/> : <ConUpcoming/>
  )
 }
}

export default Upcoming = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, UpcomingJobs);
