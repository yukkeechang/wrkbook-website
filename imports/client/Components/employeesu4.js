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
import { Link } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

export default class Employeesu4 extends React.Component {
  handleSubmit(e){
    this.props.history.push('/')
  }

  render(){
    return(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Card style={{display:'flex', justifyContent:'center'}}>
            <div>
              <TextField floatingLabelText="List down your skill sets:" multiLine={true} style={{width:"500"}}/>
            </div>
            <div>
              <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
            </div>
            <div>
              <TextField floatingLabelText="List down languages that you speak:" multiLine={true} style={{width:"500"}}/>
            </div>
            <CardActions style={{paddingTop:'30px'}}>
              <RaisedButton
                fullWidth={true}
                onTouchTap={this.handleSubmit.bind(this)} label="Complete"/>
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}
