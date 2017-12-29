
import React , { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Dashboard from './Dashboard';
class DefPage extends Component{

    render(){
        return (
          <div>
            <Dashboard/>
          </div>
        )
    }
}
export default DefaultPage = withTracker({ params } => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
})(DefPage);
