import React, {Component}  from 'react';
import ReactDOM from 'react-dom';

import Location from '../../../Shared/Location';
import MTextField from '../../../Shared/MTextField';
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
      eEmpty : false,
      isEmail: true,
      phoneE : false,
      gPhone : true,
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
      user.profile.employerData.companyName.text = this.refs.cn.value();
      user.profile.phone = this.refs.ph.value();
      user.profile.email = this.refs.em.value();
      user.profile.employerData.location = location;

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
      let location = LocationSchema.clean({});
      let user = this.props.user;
      location = this.props.user.profile.employerData.location;
      user.profile.employerData.companyName.text = this.refs.cn.value();
      user.profile.phone = this.refs.ph.value();
      user.profile.email = this.refs.em.value();
      user.profile.employerData.location = location;

      Meteor.call('updateUserData', user, (err)=>{
        if(err){
          console.log(err);
        }else{
          console.log('updated');
          $('#updateModal').modal('open');
        }
      });
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
        <div className="card">
        <div className="card-content">
          <div className="col l6 m6 s12">
            <img src={this.props.user.profile.employerData.image} height='350px' width='350px' style={{borderRadius:'350px'}}/>
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
              <MTextField ref="cn" id="companyName" value={this.props.user.profile.employerData.companyName.text} label="Company Name"/>
            </div>
            <div className="input-field col s12">
              <Location ref="loc"
              prevAddress={this.props.user.profile.employerData.location.locationName}
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
            <div style={{display:'flex', justifyContent:'center'}}>
              <a className="waves-effect waves-teal btn-flat" onClick={this.updateUser.bind(this)}>Update Profile</a>
            </div>
            <div id="updateModal" className="modal">
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
        </div>
      </div>
    )
  }
}
