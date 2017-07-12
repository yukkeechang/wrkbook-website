import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ProfileContactComponent extends React.Component{
  constructor(props){
      super(props);
      var profile_about = props['profile_contact'];
  }

  render(){
    return(
      <MuiThemeProvider>
        <Card style={{marginBottom:'10px'}}>
          <CardHeader/>
          <CardMedia style={{margin:'10px'}}>
            <div>
              <h1>Contact</h1>
              <h3>Phone number</h3>
              <h3>Email</h3>
              <h3>Website</h3>
              <h3>Adress</h3>
            </div>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    )
  }
}
