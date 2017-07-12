import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
export default class Login extends React.Component {
  constructor(props) {
    super(props);

  }

  handleSubmit(e){
    const email= this.refs.email.getValue();
    const password = this.refs.password1.getValue();


    Meteor.loginWithPassword(email, password,(err)=>{
      if(err){
        console.log(err);
      }else{
        this.props.history.push('/profile');
      }
    });
  }
  render(){
    return(

      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
        <Card>
          <CardHeader
            title="Sign In"
          />
          <CardText  >
            <div>
              <TextField
                floatingLabelText="Email Address"
                ref="email"
                fullWidth={true}
              /><br />

              <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                ref="password1"
                type="password"
              /><br /><br/>
            </div>
          </CardText>
          <CardActions>
            <RaisedButton  onTouchTap={this.handleSubmit.bind(this)} label="Login" />
          </CardActions>
          <br/>
          <br/>
        </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}
