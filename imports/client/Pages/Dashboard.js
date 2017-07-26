import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ConDash from '../Components/Dashboard/ConDash.js';
import EmpDash from '../Components/Dashboard/EmpDash.js';

class Dash extends Component {
    render(){
        if(this.props.user){
            let page = this.props.user.profile.isPro ? <EmpDash user={this.props.user}/> : <ConDash user={this.props.user}/>;
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
export default Dashboard = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Dash);
