import React, {Component}  from 'react';
import ReactDOM from 'react-dom';

import Location from '../../../Shared/Location';
import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../../../api/Schemas/locationSchema';

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
    let loc = this.refs.loc.getAddress();
    if(loc.valid){
      let location = LocationSchema.clean({});
      let user = this.props.user;
      location = loc.location;
      let empJobTitles = $('#jobTitles').val();
      user.profile.employeeData.jobTitle = empJobTitles;
      user.profile.phone = this.refs.phoneNumber.value.trim();
      // user..email = this.refs.email.value.trim();
      user.profile.employeeData.about.text = this.refs.about.value.trim();
      user.profile.employeeData.facebookLink = this.refs.facebookLink.value.trim();
      user.profile.employeeData.instaLink = this.refs.instaLink.value.trim();
      user.profile.employeeData.location = location;

      console.log(user);
      Meteor.call('updateUserData',user,function(err,res){
        if(err){
          console.log(err);
        }else{

        }
      });
    }
    else{
      this.setState({locErr:true});
    }
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
              <input id="fileInput" onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
            </div>
            <div className="file-path-wrapper">
              <input id='fileName'className={"file-path  "+ this.state.validImage} type="text"/>
            </div>
          </div>
        </div>
        <form>
          <div className="input-field col l6 m6 s12">
            <label className="active" htmlFor="p-job">Current job title(s)</label>
            <input id="p-job" ref="pJob" value={this.props.user.profile.employeeData.jobTitle} type="text"/>
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
              <label className="active" htmlFor="phone-number">Phone number</label>
              <input id="phone-number" ref="phoneNumber" defaultValue={this.props.user.profile.phone} type="number"/>
            </div>
            <div className="input-field col l8 m8 s12">
              <label className="active" htmlFor="c-email">Email</label>
              <input id="c-email" ref="email" defaultValue={this.props.user.emails[0].address} type="text"/>
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
            <label className="active" htmlFor="facebook-link">Facebook link</label>
            <input id="facebook-link" ref="facebookLink" value={this.props.user.profile.employeeData.facebookLink} type="text"/>
          </div>
          <div className="input-field col l6 m6 s12">
            <label className="active" htmlFor="insta-link">Instagram link</label>
            <input id="insta-link" ref="instaLink" value={this.props.user.profile.employeeData.instaLink} type="text"/>
          </div>
          <div className="row">
            <div className="input-field col l12 m12 s12">
              <label className="active" htmlFor="c-about">About description</label>
              <textarea className="materialize-textarea" ref="about" defaultValue={this.props.user.profile.employeeData.about.text} id="c-about"></textarea>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <a className="waves-effect waves-teal btn-flat" onClick={this.updateUser.bind(this)}>Create job</a>
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
