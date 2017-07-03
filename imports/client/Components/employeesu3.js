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

export default class Employeesu3 extends React.Component{
  render(){
    return(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <div id="signup3main">
          <Card>
            <CardText>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <div style={{paddingRight:'50px'}}>
                  <h2>Pay recievement methods*:</h2>
                  <h5>*Must select at least one method</h5>
                  <Checkbox label="Checking/Savings"/>
                  <Checkbox label="Cash"/>
                  <Checkbox label="Wrkbook Cash"/>
                  <Checkbox label="Check"/>
                </div>
                <div style={{paddingLeft:'50px'}}>
                  <h2>Tax ID number:</h2>
                  <h5>*Only if cash or check was selected</h5>
                  <TextField hintText="Tax ID"/>
                </div>
              </div>
            </CardText>
            <CardActions style={{paddingTop:'50'}}>
              <Link to='/em_singup_3'>
                <RaisedButton
                  fullWidth={true}
                  label="Next"/>
              </Link>
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}
