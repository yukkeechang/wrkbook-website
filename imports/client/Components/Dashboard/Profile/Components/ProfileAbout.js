<<<<<<< HEAD
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
=======
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
                <Card style={{width:'100%'}}>
                    <CardMedia>
                        <div id="AboutC">
                            <div id="AboutHeading">
                                <h1>About</h1>
                            </div>
                            <div id="AboutContent">
                                <h3>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the with the release of Letraset sheets containing Lorem Ip passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </h3>
                            </div>
                        </div>
                    </CardMedia>
                </Card>
            </MuiThemeProvider>
        )
    }
}
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
