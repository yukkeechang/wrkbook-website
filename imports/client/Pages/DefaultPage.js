
import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import MSpinner from '../Components/Shared/MSpinner'
import Home from './Home';
import CreateJobs from './Dashboard/CreateJobs';
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
export default DefaultPage = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, DefPage);
