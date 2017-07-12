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
        <Card style={{marginBottom:'10px'}}>
          <CardHeader/>
          <CardMedia style={{margin:'10px'}}>
            <div>
              <h1>About</h1>
              <h3 style ={{
                fontFamily:'sans-serif',
                fontWeight:'lighter',
                marginTop:'2px',
                marginBottom:'8px',}}>
                {this.props.profile_about}
              </h3>
            </div>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    )
  }
}
