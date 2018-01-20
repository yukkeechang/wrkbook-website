import React, {Component}  from 'react';
import ReactDOM from 'react-dom';

import UpdateProfilePic from './UpdateProfilePic';
import MTextField from '../../../Shared/MTextField';
import Location from '../../../Shared/Location';
import Avatar from '../../../Shared/Avatar';
import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../../../api/Schemas/locationSchema';

export default class ProfessionalEdit extends Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.modal').modal();
    });
    this.setState({
      prevTitles: this.props.user.profile.employeeData.jobTitle
    })
    $(this.refs.titles).change(()=>{
      this.setState({jobTitles:$(this.refs.titles).val()})
    });
    $(this.refs.languages).change(()=>{
      this.setState({languagesSpoken:$(this.refs.languages).val()})
    });
  }
  constructor(props){
    super(props);
    this.state={
      prevTitles: [],
      jobTitles: [],
      languagesSpoken: [],
      eEmpty : false,
      isEmail: true,
      phoneE : false,
      gPhone : true,
      address: DEFAULT,
      lat: -100,
      lng: -100
    };
  }
  updateUser(e){
    let loc = this.refs.loc.getAddress();
    if(loc.valid){
      let user = this.props.user;
      let location = LocationSchema.clean({});
      location = loc.location;
      let empJobTitles = $('#jobTitles').val();
      if(empJobTitles.length < 1){
        empJobTitles = this.state.prevTitles;
      }
      user.profile.phone = this.refs.ph.value()
      user.profile.employeeData.location = location;
      user.profile.employeeData.jobTitle = Object.values(empJobTitles);
      user.profile.employeeData.about.text = this.refs.ua.value();
      Meteor.call('updateUserData', user, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('updated');
          $('#updateModal').modal('open');
        }
      });
    }
    else{
      let user = this.props.user;
      let location = LocationSchema.clean({});
      location = this.props.user.profile.employeeData.location;
      let empJobTitles = $('#jobTitles').val();
      if(empJobTitles.length < 1){
        empJobTitles = this.state.prevTitles;
      }
      user.profile.phone = this.refs.ph.value()
      user.profile.employeeData.location = location;
      user.profile.employeeData.jobTitle = Object.values(empJobTitles);
      user.profile.employeeData.about.text = this.refs.ua.value();
      Meteor.call('updateUserData', user, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('updated');
          $('#updateModal').modal('open');
          setInterval(function(){window.location.reload()},3000);
        }
      });
    }
  }
  closeModal(){
    $('#updateModal').modal('close');
    //  window.location.reload();
  }
  render(){
    let image = this.props.user.profile.employeeData.image;
    return(
      <div className="container">
        <div className="card">
        <div className="card-content">
          <UpdateProfilePic image={image}/>
          <form>
            <div className="input-field col l6 m6 s12">
              <label className="active" htmlFor="p-job">Current job title(s)</label>
              <input id="p-job" ref="pJob" value={this.state.prevTitles} type="text"/>
            </div>
            <div className="input-field col s12">
              <select ref="titles" multiple id="jobTitles">
                <option value="" disabled selected>Update job title(s)</option>
                <option value="Painter">Painter</option>
                <option value="Demolitioner">Demolitioner</option>
                <option value="Glazer">Glazer</option>
                <option value="Masonry/Stone worker">Masonry/Stone worker</option>
                <option value="Concrete finisher">Concrete finisher</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Heat/Air conditioning worker">Heat/Air conditioning worker</option>
              </select>
            </div>
            <div className="input-field col s12">
              <Location ref="loc"
              prevAddress={this.props.user.profile.employeeData.location.locationName}
              />
            </div>
            <div className="row">
              <div className="input-field col l4 m4 s12">
                <MTextField ref="ph" id="phone" value={this.props.user.profile.phone} error={this.state.phoneE ? empty : (!this.state.gPhone? phErr:'')} label="Phone Number *"/>
              </div>
              <div className="input-field col l8 m8 s12">
                <MTextField ref="em" id="email" value={this.props.user.emails[0].address} error={this.state.eEmpty ? empty : (!this.state.isEmail ? notEmail : (this.state.accountExists ? uExists : ''))} label="Email Address *"/>
              </div>
            </div>
            <div className="input-field col l6 m6 s12">
              <select id="languagesSpoken" ref="languages">
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
            <div className="row">
              <div className="input-field col l12 m12 s12">
                <MTextField ref="ua" id="userAbout" value={this.props.user.profile.employeeData.about.text} label="About description"/>
              </div>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
              <a className="waves-effect waves-teal btn-flat" onClick={this.updateUser.bind(this)}>Update Profile</a>
            </div>
            <div id="updateModal" className="modal">
              <div className="modal-content">
                <h4>Confirmation</h4>
                <p>Your profile has been updated.</p>
              </div>
              <div className="modal-footer">
                <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.closeModal.bind(this)}>Close</a>
              </div>
            </div>
          </form>
        </div>
        </div>
      </div>
    )
  }
}
