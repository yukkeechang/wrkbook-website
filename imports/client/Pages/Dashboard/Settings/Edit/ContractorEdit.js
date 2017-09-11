import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';

export class ConEdit extends Component{
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
      lat: -100,
      lng: -100
    };
  }
  updateUser(e){
    let user = this.props.user;
    user.profile.employerData.companyName.text = this.refs.companyName.getValue().trim();
    user.profile.phone = this.refs.phone.getValue().trim();
    user.profile.email = this.refs.email.getValue().trim();
    user.profile.employerData.webPage = this.refs.websiteLink.getValue().trim();
    user.profile.employerData.about.text = this.refs.about.getValue().trim();
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
    console.log("EDIT PAGE")
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
            <input id="company-name" ref="companyName" value={this.props.user.profile.employerData.companyName.text} type="text"/>
            <label htmlFor="company-name">Company name</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="company-address" ref="companyLocation" value={this.props.user.profile.employerData.location.locationName} type="text"/>
            <label htmlFor="company-address">Company location</label>
          </div>
          <div className="row">
            <div className="input-field col l4 m4 s12">
              <input id="phone-number" ref="phoneNumber" value={this.props.user.profile.phone} type="text"/>
              <label htmlFor="phone-number">Phone number</label>
            </div>
            <div className="input-field col l8 m8 s12">
              <input id="c-email" ref="email" value={this.props.user.emails[0].address} type="text"/>
              <label htmlFor="c-email">Email</label>
            </div>
          </div>
          <div className="input-field col l6 m6 s12">
            <input id="website-link" ref="websiteLink" value={this.props.user.profile.employerData.webPage} type="text"/>
            <label htmlFor="website-link">Website link</label>
          </div>
          <div className="input-field col l6 m6 s12">
            <textarea id="c-about" ref="about" value={this.props.user.profile.employerData.about.text} className="materialize-textarea"></textarea>
            <label htmlFor="c-about">About description</label>
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


export default ContractorEdit = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, ConEdit);





//fields for social media, commented out for now
// <div className="input-field col l6 m6 s12">
//   <input id="website-link" ref="websiteLink" value={this.props.user.profile.employerData.webPage} type="text"/>
//   <label htmlFor="website-link">Facebook link</label>
// </div>
// <div className="input-field col l6 m6 s12">
//   <input id="website-link" ref="websiteLink" value={this.props.user.profile.employerData.webPage} type="text"/>
//   <label htmlFor="website-link">Instagram link</label>
// </div>
