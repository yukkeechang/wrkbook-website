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

  }
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
    console.log(place.geometry.location.lat());
    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
    // console.log(document.getElementById('autocomplete').value);
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
        console.log(geolocation);
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }
  render(){
    return(
      <div className="container">



        <div id="form-stuff" >
        <div id="locationField">
          <input id="autocomplete" placeholder="Enter your address" onFocus={this.geolocate.bind(this)} type="text"></input>
        </div>

        <table id="address">
          <tr>
            <td className="label">Street address</td>
            <td className="slimField"><input className="field" id="street_number" ></input>
            </td>
            <td className="wideField" colSpan="2"><input className="field" id="route"></input>
            </td>
          </tr>
          <tr>
            <td className="label">City</td>
            <td className="wideField" colSpan="3"><input className="field" id="locality" ></input>
            </td>
          </tr>
          <tr>
            <td className="label">State</td>
            <td className="slimField"><input className="field" id="administrative_area_level_1" ></input>
            </td>
            <td className="label">Zip code</td>
            <td className="wideField"><input className="field" id="postal_code" ></input>
            </td>
          </tr>
          <tr>
            <td className="label">Country</td>
            <td className="wideField" colSpan="3"><input className="field" id="country"></input>
            </td>
          </tr>
        </table>
        </div>
      </div>
    );
  }
}
