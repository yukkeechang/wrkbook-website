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
