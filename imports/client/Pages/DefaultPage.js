import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import MSpinner from '../Components/Shared/MSpinner'
import Home from './Home';
// import Dashboard from './Dashboard';
import Location from './Shared/Location';

class DefPage extends Component{

    render(){
        return (
          <div>
            <Home/>
            <Location/>
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
