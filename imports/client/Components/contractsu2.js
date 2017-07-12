import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

export default class Contactsu2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleSubmit(e){
    this.props.history.push('/profile')
  }

  handleChange = (event, index, value) => this.setState({value});

  render(){
    return(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Card style={{display:'flex', justifyContent:'center'}}>
            <div>
              <TextField floatingLabelText="Company Name" multiLine={true} style={{width:"500"}}/>
            </div>
            <div style={{paddingTop:"20"}}>
            <CardText>
              <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
                style={{width:"500"}}
                autoWidth={false}>
                <MenuItem value={1} primaryText="General Contractor" />
                <MenuItem value={2} primaryText="Demolititon" />
                <MenuItem value={3} primaryText="Glazing" />
                <MenuItem value={4} primaryText="Painting" />
                <MenuItem value={5} primaryText="Concrete" />
                <MenuItem value={6} primaryText="Electrical" />
                <MenuItem value={7} primaryText="Plumbing" />
                <MenuItem value={8} primaryText="Heating/Air conditioning" />
                <MenuItem value={9} primaryText="Masonry/Stone work" />
              </DropDownMenu>
            </CardText>
            </div>
            <div>
              <TextField floatingLabelText="Company License Number" multiLine={true} style={{width:"500"}}/>
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
