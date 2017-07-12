import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';

export default class ProfileCertificationComponent extends React.Component{
  constructor(props){
      super(props);
  }

  render(){
    return(
      <MuiThemeProvider>
        <Card>
          <CardHeader/>
          <CardMedia>
            <div style={{padding:'20px'}}>
              <div><h1>Certifications</h1></div>
              <div>
                <Checkbox
                  label="Background Check"
                  checked={true}
                />
                <Checkbox
                  label="Background Check"
                  checked={true}
                />
                <Checkbox
                  label="Background Check"
                  checked={true}
                />
                <Checkbox
                  label="Background Check"
                  checked={true}
                />
              </div>
            </div>
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    )
  }
}
