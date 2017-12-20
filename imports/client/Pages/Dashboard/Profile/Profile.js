import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';

import ConProfile from './ConProfile/ConProfile';
import ProProfile from './ProProfile/ProProfile';

class ProfilePage extends React.Component {
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
    this.state.isPro ? <ProProfile/> : <ConProfile/>
  )
 }
}

export default Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, ProfilePage);
