//make page for emp con import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';

import ConCompleted from './ConProfile/ConProfile';
import ProCompleted from './ProProfile/ProProfile';

class CompletedJobsPage extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    console.log(user)
    this.state = {user: user}
    if (user.roles[0] === "PRO") {
      this.state = {isPro: true}
    } else if (user.roles[0] === "CON"){
      this.state = {isPro: false}
    }
  }

render() {
  return (
    this.state.isPro ? <ProProfile/> : <ConProfile/>
  )
 }
}

export default Completed = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, CompletedJobs);
