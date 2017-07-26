import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ProfileAboutComponent extends React.Component{
    constructor(props){
        super(props);
        var profile_about = props['profile_about'];
    }
    render(){
        return(
            <MuiThemeProvider>
                <Card>
                    <CardMedia>
                        <div id="AboutC">
                            <div id="AboutHeading">
                                <h1>About</h1>
                            </div>
                            <div id="AboutContent">
                                <h3>{this.props.user.profile.employeeData.details.text}</h3>
                            </div>
                        </div>
                    </CardMedia>
                </Card>
            </MuiThemeProvider>
        )
    }
}
