import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ProEditUser from './ProEdit';
import ConEditUser from './ConEdit';

export default class EditProfile extends React.Component{
    render(){
        if(this.props.user){
            let page = this.props.user.profile.isPro ? <ProEditUser user={this.props.user}/> : <ConEditUser user={this.props.user}/>;
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
