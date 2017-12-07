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
    this.state = {
      user: user,
      upcoming: true
    };
    if (user.roles[0] === "PRO") {
      this.setState({isPro: true});
    } else if (user.roles[0] === "CON"){
      this.setState({isPro: false});
    }
  }

render() {
  console.log(this.state.upcoming);
  return (
    this.state.isPro ? <ProUpcoming upcoming={this.state.upcoming}/> : <ConUpcoming upcoming={this.state.upcoming}/>
  )
 }
}

export default Upcoming = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, UpcomingJobs);
