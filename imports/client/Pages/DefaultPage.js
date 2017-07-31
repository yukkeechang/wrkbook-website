import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import MSpinner from '../Components/Shared/MSpinner'
import Home from './Home';
// import Dashboard from './Dashboard';

class DefPage extends Component{
    render(){
        return (
            <Home/>
        )
    }

}
export default DefaultPage = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, DefPage);
