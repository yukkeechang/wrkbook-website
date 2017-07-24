import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class EmpUserInfo extends React.Component{
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
                            </div>
                        </div>
                    </CardMedia>
                </Card>
            </MuiThemeProvider>
        )
    }
}
