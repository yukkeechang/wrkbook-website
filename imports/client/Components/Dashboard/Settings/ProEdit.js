import React from 'react';
import {Link} from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton  from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const languages = [
    'English','Spanish','Chinese','French',
    'Tagalog','Vietnamese','Hindustani','Arabic','Korean',
    'German', 'Russian','Portuguese','Italian','Polish'
];
const jobtitles = [
    'Painter','Demolititoner','Glazer','Masonry/Stone Worker',
    'Concrete Finisher','Plumber','Electrician','Heat/Air conditioning Worker'
];

export default class ProEditUser extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            values: [],
            titles: [],
            address: 'none',
            lat: -100,
            lng: -100
        };
    }
    updateUser(e){
        let user = this.props.user;
        user.profile.firstName = this.refs.firstName.getValue().trim();
        user.profile.lastName = this.refs.lastName.getValue().trim();
        user.profile.phone = this.refs.phone.getValue().trim();
        user.profile.employeeData.details.text = this.refs.details.getValue().trim();
        user.profile.employeeData.location.locationName = this.state.address;
        user.profile.employeeData.location.latitude = this.state.lat;
        user.profile.employeeData.location.longitude = this.state.lng;
        user.profile.employeeData.jobTitle.texts = this.state.titles;
        user.profile.employeeData.languages.texts = this.state.values;

        console.log();
        Meteor.call('updateUserData',user,function(err,res){
            if(err){
              console.log(err);
            }else{

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
          <MuiThemeProvider>
              <div>
                  <TextField
                      floatingLabelText="First Name"
                      ref = 'firstName'
                      defaultValue = {this.props.user.profile.firstName}
                      style={{width:'500px'}}
                  /><br />

                  <TextField
                      floatingLabelText="Last Name"
                      ref = 'lastName'
                      defaultValue = {this.props.user.profile.lastName}
                      style={{width:'500px'}}
                  /><br />

                  <TextField
                      floatingLabelText="Phone Number"
                      ref = 'phone'
                      defaultValue = {this.props.user.profile.phone}
                      style={{width:'500px'}}
                  /><br />
                  <div>
                      <SelectField
                          multiple={true}
                          hintText="Select all job titles you hold"
                          value={titles}
                          onChange={this.handleChangeJob}
                          style={{width:'500px'}}>
                          {this.menuItems2(titles)}
                      </SelectField>
                  </div><br />
                  <TextField
                      floatingLabelText="Write a short bio about yourself:"
                      ref = 'details'
                      defaultValue = {this.props.user.profile.employeeData.details.text}
                      style={{width:"500px"}}/><br />
                  <SelectField
                      multiple={true}
                      hintText="Select all the languages you speak"
                      value={values}
                      onChange={this.handleChangeLang}
                      style={{width:'500px'}}>
                      {this.menuItems(values)}
                  </SelectField><br />
                  <GooglePlaceAutocomplete
                     	// Function to return lat and lng
                      ref = 'GoogleAuto'
                      hintText = {this.props.user.profile.employeeData.location.locationName}
                      style={{width:'500px'}}
                      disableFocusRipple={false}
                     	results={this.getCoords.bind(this)}/><br />
                  <Link onClick={this.updateUser.bind(this)} to="/" >
                      <RaisedButton
                      fullWidth={true}
                      label="Update"/>
                  </Link>
              </div>
          </MuiThemeProvider>
        )
    }
}
