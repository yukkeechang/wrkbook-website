import React , { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';

import ConCurrent from './ConCurrent';
import ProCurrent from './ProCurrent';

class CurrentJobs extends React.Component {
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
  return (
    this.state.isPro ? <ProCurrent/> : <ConCurrent/>
  )
 }
}

export default Current = withTracker(props => {
  return {
    user: Meteor.user()
  };
})(CurrentJobs);
