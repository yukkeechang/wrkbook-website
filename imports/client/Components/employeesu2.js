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

export default class Employeesu2 extends React.Component{
  render(){
    return(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <div id="signup2main">
          <Card>
            <div id="signup2header">
              <h1>Optional</h1>
              <h3>Let contractors know that you have OSHA safety certification or a background check</h3>
            </div>
            <CardText id="signup2content">
              <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                  <div>
                    <h1>OSHA certificate:</h1>
                    <h3>This certificate will be published on your profile for contractors to see</h3>
                  </div>
                  <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <TextField hintText="Upload File"/>
                    <CardActions>
                      <RaisedButton
                        label="Upload"/>
                    </CardActions>
                  </div>
                </div>
                <div style={{color:'#d3d3d3'}}><h3>____________________________________________________________________________________________________________________
                </h3></div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center', paddingTop:'30px'}}>
                  <div style={{justifyContent:'center', paddingRight:'30px'}}>
                    <h1>Background Check:</h1>
                    <h3>Wrkbook conducts a background check which<br/>will be published on your profile</h3>
                    <Checkbox label="$29.99"/>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', paddingLeft:'30px'}}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                      <h1>Payment Method:</h1>
                      <img style={{paddingLeft:'10'}} src="images/mastercard.png" height="50" width="50"/>
                      <img style={{paddingLeft:'10'}} src="images/visa.png" height="50" width="50"/>
                      <img style={{paddingLeft:'10'}} src="images/discover.png" height="50" width="50"/>
                      <img style={{paddingLeft:'10'}} src="images/americanexpress.png" height="50" width="50"/>
                      <img style={{paddingLeft:'10'}} src="images/paypal.png" height="50" width="50"/>
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                      <div style={{paddingRight:'10px'}}><TextField floatingLabelText="Card Number:"/></div>
                      <div style={{paddingRight:'10px'}}><TextField floatingLabelText="CVV:" style={{width:'50'}}/></div>
                      <div><TextField floatingLabelText="Expiration: MM/YY" style={{width:'150'}}/></div>
                    </div>
                  </div>
                </div>
                <CardActions style={{paddingTop:'50'}}>
                  <Link to='/em_singup_2'>
                    <RaisedButton
                      fullWidth={true}
                      label="Next"/>
                  </Link>
                </CardActions>
              </div>
            </CardText>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}
