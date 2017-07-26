import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
<<<<<<< HEAD
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ConUserInfo extends React.Component{
=======
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EmpUserInfo extends React.Component{
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
    constructor(props){
        super(props);
        var full_name = props['full_name'];
        var company_name = props['company_name'];
        var company_address = props['company_address'];
        var avatar_pic_1 = props['avatar_pic_1'];
    }
    render(){
        return(
            <MuiThemeProvider>
<<<<<<< HEAD
                <Card style={{width:'100%'}}>
                    <CardMedia>
                        <div id="UserInfoC">
                            <div id="UserInfoLeft">
                                <Avatar
                                color={'white'}
                                backgroundColor={'#0ea56a'}
                                size={180}
                                style={{margin:'5px'}}
                                >
                                {this.props.user.profile.firstName[0]}
                                </Avatar>
                            </div>
                            <div id="UserInfoRight">
                                <h1>{this.props.user.profile.firstName} {this.props.user.profile.lastName}</h1>
                                <h2>{this.props.user.profile.employerData.companyName.text}</h2>
                                <h3>{this.props.user.profile.employerData.location.locationName}</h3>
=======
                <Card zDepth={2} style={{width:'100%'}}>
                    <CardMedia>
                        <div id="UserInfoC">
                            <div id="UserInfoLeft">
                                <Avatar src={this.props.avatar_pic_1} size={180}/>
                            </div>
                            <div id="UserInfoRight">
                                <h1>{this.props.full_name}</h1>
                                <h2>{this.props.company_name}</h2>
                                <h3>{this.props.company_address}</h3>
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
                            </div>
                        </div>
                    </CardMedia>
                </Card>
            </MuiThemeProvider>
        )
    }
}
