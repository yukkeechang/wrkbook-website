import React , { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
// import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
// import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { withTracker } from 'meteor/react-meteor-data';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';

import ConUpcoming from './ConUpcoming';
import ProUpcoming from './ProUpcoming';

class UpcomingJobs extends React.Component {
  constructor(props) {
    super(props);

    if(Roles.userIsInRole(this.props.user._id,"CON")){
      this.state={isPro: false}
    } else if (Roles.userIsInRole(this.props.user._id,"PRO")) {
      this.state={isPro: true}
    }
  }

  componentDidMount() {
    initGA()
    logPageView()
  }

  render() {
  // console.log(this.state.upcoming);
  return (
    this.state.isPro ? <ProUpcoming/> : <ConUpcoming/>
  )
 }
}

export default Upcoming = withTracker(props => {
  return {
    user: Meteor.user()
  };
})(UpcomingJobs);
