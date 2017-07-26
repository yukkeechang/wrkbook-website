<<<<<<< HEAD
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EmpProfile from './Profile/EmpProfile';
import ConProfile from './Profile/ConProfile';

class Prof extends React.Component{
    render(){
        if(this.props.user){
            let page = this.props.user.profile.isPro ? <EmpProfile user={this.props.user}/> : <ConProfile user={this.props.user}/>;
            return(page);
        }
        else{
            return(
                <MuiThemeProvider >
                    <CircularProgress/>
                </MuiThemeProvider >
            )
        }
    }
}
export default Profile = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Prof);
=======
import React from 'react';

import EmpProfile from './Profile/EmpProfile';
import ConProfile from './Profile/ConProfile';
import Home from '../../Pages/Home';

export default class Prof extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            if(this.props.user){
                let page = this.props.user.profile.isPro ? <EmpProfile/> : <ConProfile/>;
                return(page);
            }
            else{
                return(
                    <Home/>
                );
            }
        )
    }
}
export default Profile = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Prof);
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
