import React, {Component} from 'react';


var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'short_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};
export default class Location extends Component{
  constructor(props){
    super(props);
    this.state={
      addressNumErr: '',
      addressNumErrReason: '',
      addressNameErr: '',
      addressNameErrReason: '',
      addressCityErr: '',
      addressCityErrReason: '',
      addressStateErr: '',
      addressStateErrReason: '',
      addressZipErr: '',
      addressZipErrReason: '',
      addressCounErr: '',
      addressCounErrReason: '',
      finalAddress: '',
      lat: -360,
      lng: -360,
      showNext: 'disabled'
    }


  }
  //Once the page is mounted we create the Google Autocomplete Component.
  componentDidMount(){
    this.initAutocomplete()
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')), {
        types: ['geocode']
      });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.

    autocomplete.addListener('place_changed', this.fillInAddress);
  }

 fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
    $(document).ready(function() {
    Materialize.updateTextFields();
    });
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        // console.log(autocomplete);
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }
  //Check if there are any special characters
  isValid(str){
     return !/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
  }
  //Checks the form if any field is empty or if any fields contains
  // illegal characters. If any field is empty or contains special characters
  // the user will be notify
  // If the fields are not empty and contais no special the form will be
  //sent to GOOGLE GEOCODE API if there is an OK status return from the API
  // there is a valid address we will save the name and coordinates of the location typed
  // The next button becomes clickable once we get a valid address
  checkAddress(e){
    let inputtedAddress ='';
    let isEmpty =[];
    let isNotValid = [];

    for (var component in componentForm) {
        if(!document.getElementById(component).value){
          let index = Object.keys(componentForm).indexOf(component)
          isEmpty[index] = true;
        }
        if(!this.isValid(document.getElementById(component).value)){
          let index = Object.keys(componentForm).indexOf(component)
          isNotValid[index] = true;
        }
    }
    let numErr = isEmpty[0] || isNotValid[0] ? 'invalid' : '';
    let namErr = isEmpty[1] || isNotValid[1] ? 'invalid' : '';
    let cityErr = isEmpty[2] || isNotValid[2] ? 'invalid' : '';
    let stateErr = isEmpty[3] || isNotValid[3] ? 'invalid' : '';
    let zipErr = isEmpty[4] || isNotValid[4] ? 'invalid' : '';
    let counErr = isEmpty[5] || isNotValid[5] ? 'invalid' : '';
    let numR,namR,cityR,stateR,zipR,counR;
    if (isEmpty[0]) numR = 'Field is Empty';
    if (isNotValid[0]) numR = 'Field is contains illegal characters';
    if (isEmpty[1]) namR = 'Field is Empty';
    if (isNotValid[1]) namR = 'Field is contains illegal characters';
    if (isEmpty[2]) cityR = 'Field is Empty';
    if (isNotValid[2]) cityR = 'Field is contains illegal characters';
    if (isEmpty[3]) stateR = 'Field is Empty';
    if (isNotValid[3]) stateR = 'Field is contains illegal characters';
    if (isEmpty[4]) zipR = 'Field is Empty';
    if (isNotValid[4]) zipR = 'Field is contains illegal characters';
    if (isEmpty[5]) counR = 'Field is Empty';
    if (isNotValid[5]) counR = 'Field is contains illegal characters';

    if(isEmpty[0] || isNotValid[0] ||isEmpty[1] || isNotValid[1] ||
      isEmpty[2] || isNotValid[2] || isEmpty[3] || isNotValid[3] ||
      isEmpty[4] || isNotValid[4] || isEmpty[5] || isNotValid[5]){
      this.setState({
        addressNumErr: numErr,
        addressNumErrReason: numR,
        addressNameErr: namErr,
        addressNameErrReason: namR,
        addressCityErr: cityErr,
        addressCityErrReason: cityR,
        addressStateErr: stateErr,
        addressStateErrReason: stateR,
        addressZipErr: zipErr,
        addressZipErrReason: zipR,
        addressCounErr: counErr,
        addressCounErrReason: counR,
      });

      return;
    }

    for (var component in componentForm) {
      if(component === 'street_number' ){
        if(!!document.getElementById(component).value){
          inputtedAddress += document.getElementById(component).value;
          inputtedAddress += ' ';
        }
      }else{
        if(!!document.getElementById(component).value){
          inputtedAddress += document.getElementById(component).value;
          inputtedAddress += ', ';
        }
      }
    }
    inputtedAddress = inputtedAddress.trim();
    inputtedAddress =  inputtedAddress.substring(0, inputtedAddress.length-1);

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': inputtedAddress }, function (results, status) {
      console.log(status);
      if(status === 'OK'){
        console.log(results);
        let place = results[0];

        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
          }
        }
        $(document).ready(function() {
        Materialize.updateTextFields();
        });
        this.setState({
          finalAddress: inputtedAddress,
          lat:   place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          showNext: ''
        });

      }
      else if (status === 'ZERO_RESULTS') {

      }else if (status === 'INVALID_REQUEST') {

      }
    }.bind(this));
  }
//The action tied to the nex button
  onNextClick(e){
    console.log(this.state.finalAddress);
    console.log(this.state.lat);
    console.log(this.state.lng);
  }
  render(){
    return(
      <div className="container">



        <div id="form-stuff" >
        <div id="locationField">
          <input id="autocomplete" placeholder="Enter your address" onFocus={this.geolocate.bind(this)} type="text"></input>
        </div>

        <div className="row" id="address">
          <form className="col s12">
            <div className="row">
              <div className='input-field col s12 m6'>
                  <input id="street_number" type="text" className={ this.state.addressNumErr} />
                  <label  className="active" htmlFor="street_number" data-error={this.state.addressNumErrReason}>Street Number</label>
              </div>
              <div className='input-field col s12 m6'>
                  <input id='route' type='text' className={ this.state.addressNameErr}/>
                  <label className="active" htmlFor='route' data-error={this.state.addressNameErrReason}> Street Name</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                  <input id='locality' type='text' className={this.state.addressCityErr}/>
                  <label className="active" htmlFor='locality' data-error={this.state.addressCityErrReason}>City</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 m6'>
                  <input id='administrative_area_level_1' type='text' className={ this.state.addressStateErr}/>
                  <label  className="active" htmlFor='administrative_area_level_1' data-error={this.state.addressStateErrReason}>State</label>
              </div>
              <div className='input-field col s12 m6'>
                  <input id='postal_code' type='text' className={this.state.addressZipErr}/>
                  <label className="active"  htmlFor='postal_code' data-error={this.state.addressZipErrReason}>Zip Code</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input id='country' type='text' className={this.state.addressCityErr}/>
                <label   className="active" htmlFor='country' data-error={this.state.addressCounErrReason}>Country</label>
              </div>
            </div>
          </form>
        </div>
        <div className='row'>
            <a className="waves-effect waves-light btn teal lighten-2 col s12 m6" onClick={this.checkAddress.bind(this)}>Verify Address</a>
            <a className={"waves-effect waves-light btn red col s12 m6 " + this.state.showNext} onClick={this.onNextClick.bind(this)}>Next</a>
        </div>

        </div>
      </div>
    );
  }
}
