import React from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton  from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

export default class ConEditUser extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            address: 'NONE',
            lat: -100,
            lng: -100
        };
    }
    updateUser(e){
        let user = this.props.user;
        user.profile.firstName = this.refs.firstName.getValue().trim();
        user.profile.lastName = this.refs.lastName.getValue().trim();
        user.profile.phone = this.refs.phone.getValue().trim();
        user.profile.employerData.companyName.text = this.refs.companyName.getValue().trim();
        user.profile.employerData.location.locationName = this.state.address;
        user.profile.employerData.location.latitude = this.state.lat;
        user.profile.employerData.location.longitude = this.state.lng;

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
    render(){
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

                  <TextField
                      floatingLabelText="Company Name"
                      ref = 'companyName'
                      defaultValue = {this.props.user.profile.employerData.companyName.text}
                      multiLine = {true}
                      style={{width:'500px'}}
                  /><br />

                  <GooglePlaceAutocomplete
                     	// Function to return lat and lng
                      ref = 'GoogleAuto'
                      hintText = {this.props.user.profile.employerData.location.locationName}
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
