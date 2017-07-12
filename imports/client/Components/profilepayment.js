import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';

export default class ProfilePaymentComponent extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <MuiThemeProvider>
        <Card>
          <CardHeader/>
          <CardMedia>
            <div>
              <div><h1>Payments Accepted</h1></div>
              <div>
                <Checkbox
                  label="Check"
                  checked={true}
                />
                <Checkbox
                  label="Cash"
                  checked={true}
                />
                <Checkbox
                  label="WRKBOOK"
                  checked={true}
                />
                <Checkbox
                  label="Direct Deposit"
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
