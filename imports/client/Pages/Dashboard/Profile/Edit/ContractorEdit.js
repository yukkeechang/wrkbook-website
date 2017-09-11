import React, {Component}  from 'react';
import ReactDOM from 'react-dom';

import Location from '../../../Shared/Location';
import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';

import LocationSchema from '../../../../../api/Schemas/locationSchema';

export default class ContractorEdit extends Component{
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
      address: DEFAULT,
      locErr: false,
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
      job.location = location;
      user.profile.employerData.companyName.text = this.refs.companyName.value.trim();
      user.profile.phone = this.refs.phone.value.trim();
      user.profile.email = this.refs.email.value.trim();
      user.profile.employerData.webPage = this.refs.websiteLink.value.trim();
      user.profile.employerData.about.text = this.refs.about.value.trim();
      user.profile.employerData.location = location;

      console.log();
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
          <img src="/images/facebook.png" height='350px' width='350px' style={{borderRadius:'350px'}}/>
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
            <input id="company-name" ref="companyName" defaultValue={this.props.user.profile.employerData.companyName.text} type="text"/>
            <label className="active" htmlFor="company-name">Company name</label>
          </div>
          <div className="input-field col s12">
            <Location ref="loc"/>
          </div>
          <div className="row">
            <div className="input-field col l4 m4 s12">
              <input id="phone-number" ref="phoneNumber" defaultValue={this.props.user.profile.phone} type="text"/>
              <label className="active" htmlFor="phone-number">Phone number</label>
            </div>
            <div className="input-field col l8 m8 s12">
              <input id="c-email" ref="email" value={this.props.user.profile.email} type="text"/>
              <label className="active" htmlFor="c-email">Email</label>
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
            <input id="website-link" ref="websiteLink" defaultValue={this.props.user.profile.employerData.webPage} type="text"/>
            <label className="active" htmlFor="website-link">Website link</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="website-link" ref="websiteLink" defaultValue={this.props.user.profile.employerData.webPage} type="text"/>
            <label className="active" htmlFor="website-link">Facebook link</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="website-link" ref="websiteLink" defaultValue={this.props.user.profile.employerData.webPage} type="text"/>
            <label className="active" htmlFor="website-link">Instagram link</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <textarea id="c-about" ref="about" defaultValue={this.props.user.profile.employerData.about.text} className="materialize-textarea"></textarea>
            <label className="active" htmlFor="c-about">About description</label>
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
