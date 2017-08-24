import React, {Component}  from 'react';
import ReactDOM from 'react-dom';

import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';

export default class ProfessionalEdit extends Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.modal').modal();
    });
  }
  constructor(props){
    super(props);
    this.state={
      validImage: '',
      shownlink: '/images/facebook.png',
      address: DEFAULT,
      lat: -100,
      lng: -100
    };
  }
  updateUser(e){
    let user = this.props.user;
    user.profile.employeeData.jobTitle.texts = this.refs.pJob.getValue().trim();
    user.profile.employeeData.about.text = this.refs.about.getValue().trim();
    user.profile.phone = this.refs.phoneNumber.getValue().trim();
    user.profile.email = this.refs.email.getValue().trim();
    user.profile.employeeData.education.texts = this.refs.education.getValue().trim();
    user.profile.employeeData.location.locationName = this.state.address;
    user.profile.employeeData.location.latitude = this.state.lat;
    user.profile.employeeData.location.longitude = this.state.lng;

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
  onFileInputChange(e){
    if(e.target.files.length){
      let files = e.target.files;

      if(files[0].type.includes('image')){
        this.setState({validImage:'valid'});
      }
      else{
        this.setState({validImage: 'invalid',shownlink:'',button:'disabled'});

        return;
      }
      let fr = new FileReader();
      fr.onload = function() {
        window.localStorage.setItem('image',fr.result);
        this.setState({shownlink:window.localStorage['image'],
        button:''});
      }.bind(this);
      fr.readAsDataURL(files[0]);
    }
    else{
      this.setState({button:'disabled',shownlink:'' });
    }
  }
  render(){
    return(
      <div className="container">
        <div className="col l6 m6 s12">
          <img id="profileImage" src={this.state.shownlink} height='350px' width='350px' style={{borderRadius:'350px'}}/>
        </div>
        <div className="row">
          <div className="file-field input-field col l8 m8 s12">
            <div className="btn">
              <span>Upload Image</span>
              <input  id="fileInput" onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
            </div>
            <div className="file-path-wrapper">
              <input id='fileName'className={"file-path  "+ this.state.validImage} type="text"/>
            </div>
          </div>
        </div>
        <form>
          <div className="input-field col l6 m6 s12">
            <input id="p-job" ref="pJob" value="{this.props.user.profile.employeeData.jobTitle.texts}" type="text"/>
            <label htmlFor="p-job">Job title(s)</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="p-address" ref="pLocation" value="{this.props.user.profile.employeeData.location.locationName}" type="text"/>
            <label htmlFor="p-address">Professional location</label>
          </div>
          <div className="row">
            <div className="input-field col l4 m4 s12">
              <input id="phone-number" ref="phoneNumber" value="{this.props.user.profile.phone}" type="text"/>
              <label htmlFor="phone-number">Phone number</label>
            </div>
            <div className="input-field col l8 m8 s12">
              <input id="c-email" ref="email" value="{this.props.user.profile.email}" type="text"/>
              <label htmlFor="c-email">Email</label>
            </div>
          </div>
          <div className="input-field col l6 m6 s12">
            <select id="languagesSpoken">
              <option value="" disabled selected>Languages spoken</option>
              <option value="Arabic">Arabic</option>
              <option value="Chinese">Chinese</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Hindi">Hindi</option>
              <option value="Italian">Italian</option>
              <option value="Korean">Korean</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Spanish">Spanish</option>
              <option value="Tagalog">Tagalog</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="p-education" ref="education" value="{this.props.user.profile.employeeData.education.texts}" type="text"/>
            <label htmlFor="p-education">Highschool/college</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="website-link" ref="websiteLink" value="{this.props.user.profile.employeeData.webPage}" type="text"/>
            <label htmlFor="website-link">Website link</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="website-link" ref="websiteLink" value="{this.props.user.profile.employeeData.webPage}" type="text"/>
            <label htmlFor="website-link">Facebook link</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="website-link" ref="websiteLink" value="{this.props.user.profile.employeeData.webPage}" type="text"/>
            <label htmlFor="website-link">Instagram link</label>
          </div>
          <div className="row">
            <div className="input-field col l12 m12 s12">
              <textarea className="materialize-textarea" ref="about" value="{this.props.user.profile.employeeData.about.text}" id="c-about"></textarea>
              <label htmlFor="c-about">About description</label>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <button data-target="modal1" className="btn modal-trigger">Update profile</button>
          </div>
          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4>Confirmation</h4>
              <p>Your profile has been updated.</p>
            </div>
            <div className="modal-footer">
              <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
// <div className="col l4 m4 s12">
//   <label>Payments accepted:</label>
//   <div>
//     <input type="checkbox" id="directDeposit"/>
//     <label htmlFor="directDeposit">Direct Deposit</label>
//   </div>
//   <div>
//     <input type="checkbox" id="wrkbookPay"/>
//     <label htmlFor="wrkbookPay">WRKBOOK pay</label>
//   </div>
//   <div>
//     <input type="checkbox" id="check"/>
//     <label htmlFor="check">Check</label>
//   </div>
//   <div>
//     <input type="checkbox" id="cash"/>
//     <label htmlFor="cash">Cash</label>
//   </div>
// </div>
