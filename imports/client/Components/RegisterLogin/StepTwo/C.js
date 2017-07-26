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
import SelectField from 'material-ui/SelectField';
import { withRouter } from 'react-router';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';

import EmployerSchema from '../../../../api/Schemas/employerSchema';
import LocationSchema from '../../../../api/Schemas/locationSchema';
const jobtitles = [
  'Painter','Demolititoner','Glazer','Masonry/Stone Worker',
  'Concrete Finisher','Plumber','Electrician','Heat/Air conditioning Worker'
];
export default class C extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    titles: [],
    address: '',
    lat: -100,
    lng: -100};
  }

  handleSubmit(e){

    const companyName = this.refs.companyName.getValue().trim();
    const companyLicense = this.refs.companyLicense.getValue().trim();
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
    employerData.location = location;
    user.profile.employerData = employerData;

    Meteor.call('updateUserData',user,(err)=>{
      if(err){
        console.log(err);
      }
    });
  }

handleChangeJob = (event, index, titles) => this.setState({titles});
  getCoords(lat, lng){

    this.setState({
      address: this.refs.GoogleAuto.state.searchText,
      lat:lat,
      lng:lng

    });


  }
  menuItems(values) {
  return jobtitles.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }
  render(){
    const {titles} = this.state;

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
            <div>
              <SelectField
                multiple={false}
                hintText="Select your company type"
                value={titles}
                onChange={this.handleChangeJob}
                style={{width:'500px'}}
                >
                {this.menuItems(titles)}
              </SelectField>
            </div>
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
