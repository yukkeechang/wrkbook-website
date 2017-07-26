import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './home';
import Dashboard from './Dashboard';
import CircularProgress from 'material-ui/CircularProgress';

class DefPage extends Component{
    render(){
        return this.props.loggingIn ? (
            <MuiThemeProvider >
                <CircularProgress/>
            </MuiThemeProvider >
            ) :
            (this.props.user ? <Dashboard/> : <Home/>);
    }

}
export default DefaultPage = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, DefPage);
