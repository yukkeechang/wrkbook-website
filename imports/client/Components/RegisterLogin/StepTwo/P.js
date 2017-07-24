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
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import LocationSchema from '../../../../api/Schemas/locationSchema';
import EmployeeSchema from '../../../../api/Schemas/employeeSchema';
import AvailabeSchema from '../../../../api/Schemas/availableSchema';
const languages = [
  'English','Spanish','Chinese','French',
  'Tagalog','Vietnamese','Hindustani','Arabic','Korean',
  'German', 'Russian','Portuguese','Italian','Polish'
];
const jobtitles = [
  'Painter','Demolititoner','Glazer','Masonry/Stone Worker',
  'Concrete Finisher','Plumber','Electrician','Heat/Air conditioning Worker'
];
export default class P extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      values: [],
      titles: [],
      address: '',
      lat: -100,
      lng: -100      
    };

  }
  handleSubmit(e){
    let user = Meteor.user();
    const bio = this.refs.bio.getValue().trim();
    let location = LocationSchema.clean({});
    const lng = this.state.lng;
    const lat = this.state.lat;
    const address = this.state.address;
    location.locationName = address;
    location.latitude = lat;
    location.longitude = lng;
    employeeData = EmployeeSchema.clean({});
    available = AvailabeSchema.clean({});
    available2 = AvailabeSchema.clean({});
    available2.beginTime = new Date();
    available2.endTime = new Date(2017,10,10);
    employeeData.Availability[0] = available;
    employeeData.Availability[1] = available2;
    employeeData.jobTitle.texts = this.state.titles;
    employeeData.languages.texts = this.state.values;
    employeeData.details.text = bio;
    employeeData.location = location;
    user.profile.employeeData= employeeData;

    // console.log(  user.profile.employeeData);
    Meteor.call('updateUserData',user,(err)=>{
      if(err){
        console.log(err);
      }
    });

    // console.log(this.state.values);
  }
  getCoords(lat, lng){

    this.setState({
      address: this.refs.GoogleAuto.state.searchText,
      lat:lat,
      lng:lng

    });
  }
  handleChangeLang = (event, index, values) => this.setState({values});
  handleChangeJob = (event, index, titles) => this.setState({titles});
  menuItems(values) {
  return languages.map((name) => (
      <MenuItem
        key={name}
        insetChildren={true}
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }
  menuItems2(values) {
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

    const {values} = this.state;
    const {titles} = this.state;


    return(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Card style={{display:'flex', justifyContent:'center'}}>
            <div>
              <SelectField
                multiple={true}
                hintText="Select all job titles you hold"
                value={titles}
                onChange={this.handleChangeJob}
                style={{width:'500px'}}
                >
                {this.menuItems2(titles)}
              </SelectField>
            </div>
            <div>
              <TextField floatingLabelText="List down all the skills you have" multiLine={true} style={{width:"500px"}}/>
            </div>
            <div>
              <TextField floatingLabelText="Write a short bio about yourself:"
              ref="bio"
               multiLine={true} style={{width:"500px"}}/>
            </div>
            <div>
            <SelectField
              multiple={true}
              hintText="Select all the languages you speak"
              value={values}
              onChange={this.handleChangeLang}
              style={{width:'500px'}}
              >
              {this.menuItems(values)}
            </SelectField>
            <GooglePlaceAutocomplete
             	// Function to return lat and lng
              ref = 'GoogleAuto'
              hintText="Please Enter Address"
              disableFocusRipple={false}
             	results={this.getCoords.bind(this)}
             />
            </div>
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
