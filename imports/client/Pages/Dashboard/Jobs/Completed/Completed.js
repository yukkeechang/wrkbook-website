/**
 *
 * @class
 * @classdesc Needs comments
 */

import React , { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';

import ConCompleted from './ConCompleted';
import ProCompleted from './ProCompleted';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';


class CompletedJobs extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    //console.log(user)
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
    this.state.isPro ? <ProCompleted/> : <ConCompleted/>
  )
 }
}

export default Completed = withTracker(props => {
  return {
    user: Meteor.user()
  };
})(CompletedJobs);
