import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import UpdateProfilePic from './UpdateProfilePic';
import Location from '../../../Shared/Location';
import MTextField from '../../../Shared/MTextField';
import Avatar from '../../../Shared/Avatar';
import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../../../api/Schemas/locationSchema';

export default class ContractorEdit extends Component{
  componentDidMount(){
    let page = ReactDOM.findDOMNode(this.refs.editPage);
    $(page).ready(()=>{
      $('select').formSelect();
      $('.modal').modal();
      $('.tooltipped').tooltip({delay: 50});
    });
  }
  constructor(props){
    super(props);
    this.state={
      validImage: '',
      employerImage: '',
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
  closeModal(){
    $('#updateModal').modal('close');
  }
  componentWillUnmount(){
    $('.tooltipped').tooltip('remove');
    $(this.refs.updateModal).modal('close');
  }
  render(){
    let image = this.props.user.profile.employerData.image;
    return(
      <div className="container">
        <div ref="editPage" className="card">
        <div className="card-content">
          <div className="row right-align" style={{margin:'0px'}}>
            <Link style={{padding:'0px'}} to={"/profile"}>
              <a style={{padding:'0px', fontSize:'30px', color:'black'}} className="waves-effect tooltipped"  data-position="right" data-tooltip="Back to Profile" ><div style={{paddingRight:'7px', height:'40px',width:'40px'}} className="circle blue-grey center-align lighten-5"> <i className="material-icons">arrow_back</i></div></a>
            </Link>
          </div>
          <UpdateProfilePic image={image}/>
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
              <a className="waves-effect waves-teal btn" onClick={this.updateUser.bind(this)}>Update Profile</a>
            </div>
            <div id="updateModal" className="modal">
              <div className="modal-content">
                <h4>Confirmation</h4>
                <p>Your profile has been updated.</p>
              </div>
              <div className="modal-footer">
                <Link style={{padding:'0px'}} to={"/profile"}>
                  <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.closeModal.bind(this)}>Close</a>
                </Link>
              </div>
            </div>
          </form>
        </div>
        </div>
      </div>
    )
  }
}
