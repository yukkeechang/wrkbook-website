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
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';

import EmployerSchema from '../../../../api/Schemas/employerSchema';
import LocationSchema from '../../../../api/Schemas/locationSchema';
const stuff = [
  "","General Contractor","Demolititon","Glazing","Painting","Concrete",
  "Electrical","Plumbing","Heating/Air conditioning","Masonry/Stone work"


];

export default class C extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    value: 1,
    address: '',
    lat: -100,
    lng: -100};
  }

  handleSubmit(e){

    const companyName = this.refs.companyName.getValue().trim();
    const companyLicense = this.refs.companyLicense.getValue().trim();
    const text = stuff[this.state.value];
    const lng = this.state.lng;
    const lat = this.state.lat;
    const address = this.state.address;


    let user = Meteor.user();
    let employerData  = EmployerSchema.clean({});
    let location = LocationSchema.clean({});
    location.locationName = address;
    location.latitude = lat;
    location.longitude = lng;
    employerData.companyName.text = companyName;
    employerData.licenseNumber.text = companyLicense;
    employerData.details.text = text;
    employerData.location = location;
    user.profile.employerData = employerData;


    Meteor.call('updateUserData',user,(err)=>{
      if(err){
        console.log(err);
      }
    });
  }


  getCoords(lat, lng){

    this.setState({
      address: this.refs.GoogleAuto.state.searchText,
      lat:lat,
      lng:lng

    });


  }

  render(){




    return(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Card style={{display:'flex', justifyContent:'center'}}>
            <div>
              <TextField
              floatingLabelText="Company Name"
              multiLine={true}
              style={{width:'500px'}}
              ref="companyName"
                />
            </div>
            <div style={{paddingTop:'20px'}}>
            <CardText>
              <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
                style={{width:'500px'}}
                autoWidth={false}>
                <MenuItem value={1} primaryText={stuff[1]} />
                <MenuItem value={2} primaryText={stuff[2]} />
                <MenuItem value={3} primaryText={stuff[3]} />
                <MenuItem value={4} primaryText={stuff[4]} />
                <MenuItem value={5} primaryText={stuff[5]} />
                <MenuItem value={6} primaryText={stuff[6]} />
                <MenuItem value={7} primaryText={stuff[7]} />
                <MenuItem value={8} primaryText={stuff[8]} />
                <MenuItem value={9} primaryText={stuff[9]} />
              </DropDownMenu>
            </CardText>
            </div>
            <div>
              <TextField
              floatingLabelText="Company License Number"
              multiLine={true}
              style={{width:'500px'}}
              ref="companyLicense"
              />
            </div>
            <GooglePlaceAutocomplete
             	// Function to return lat and lng
              ref = 'GoogleAuto'
              hintText="Please Enter Address"
              disableFocusRipple={false}
             	results={this.getCoords.bind(this)}
             />
            <CardActions style={{paddingTop:'30px'}}>
              <Link to="/">
                <RaisedButton
                  fullWidth={true}
                  onTouchTap={this.handleSubmit.bind(this)} label="Complete"/>
              </Link>
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}
