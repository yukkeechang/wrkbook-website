import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import UpdateProfilePic from './UpdateProfilePic';
import MTextField from '../../../Shared/MTextField';
import Location from '../../../Shared/Location';
import Avatar from '../../../Shared/Avatar';
import { DEFAULT } from '../../../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../../../api/Schemas/locationSchema';

export default class ProfessionalEdit extends Component{
  componentDidMount(){
    let page = ReactDOM.findDOMNode(this.refs.editPage);
    $(page).ready(()=>{
      $('select').material_select();
      $('.modal').modal();
      $('.tooltipped').tooltip({delay: 50});
    });
    this.setState({
      prevTitles: this.props.user.profile.employeeData.jobTitle,
      showTrade: this.props.user.profile.employeeData.education.tradeSchool.wentToSchool
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
      lng: -100,
      showTrade: false
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
      let tradeS = {};
      if(this.refs.ts.checked){
        tradeS.wentToSchool = true;
        tradeS.schoolName = this.refs.tradeS.value();
      }else{
        tradeS.wentToSchool = false;
        tradeS.schoolName='';
      }
      user.profile.phone = this.refs.ph.value()
      user.profile.employeeData.location = location;
      user.profile.employeeData.jobTitle = Object.values(empJobTitles);
      user.profile.employeeData.about.text = this.refs.ua.value();
      user.profile.employeeData.osha.osha10 = this.refs.o1.checked;
      user.profile.employeeData.osha.osha30 = this.refs.o3.checked;
      user.profile.employeeData.education.highGED = this.refs.hs.checked;
      user.profile.employeeData.education.tradeSchool = tradeS;
      user.profile.employeeData.education.higherEdu = this.refs.he.checked;
      user.profile.employeeData.socialPref.taxID = $("#taxYes").prop('checked');
      user.profile.employeeData.socialPref.social = $("#sscYes").prop('checked');
      user.profile.employeeData.hasCar = this.refs.cy.checked;
      user.profile.employeeData.driverLicense = this.refs.dy.checked;
      user.profile.employeeData.bringTools = this.refs.ty. checked;
      console.log(user);
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
      let tradeS = {};
      if(this.refs.ts.checked){
        tradeS.wentToSchool = true;
        tradeS.schoolName = this.refs.tradeS.value();
      }else{
        tradeS.wentToSchool = false;
        tradeS.schoolName='';
      }
      user.profile.phone = this.refs.ph.value()
      user.profile.employeeData.location = location;
      user.profile.employeeData.jobTitle = Object.values(empJobTitles);
      user.profile.employeeData.about.text = this.refs.ua.value();
      user.profile.employeeData.osha.osha10 = this.refs.o1.checked;
      user.profile.employeeData.osha.osha30 = this.refs.o3.checked;
      user.profile.employeeData.education.highGED = this.refs.hs.checked;
      user.profile.employeeData.education.tradeSchool = tradeS;
      user.profile.employeeData.education.higherEdu = this.refs.he.checked;
      user.profile.employeeData.socialPref.taxID = $("#taxYes").prop('checked');
      user.profile.employeeData.socialPref.social = $("#sscYes").prop('checked');
      user.profile.employeeData.hasCar = this.refs.cy.checked;
      user.profile.employeeData.driverLicense = this.refs.dy.checked;
      user.profile.employeeData.bringTools = this.refs.ty. checked;
      console.log(user);
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
  handlesscYesClick(){
    $("#taxDisplay").css("display","none"); //keeps tax display hidden on yes click for ssc
    $("#taxYes").prop('checked',true);  //checks appropriate tax field for ssc yes click
  }
  handlesscNoClick(){
    $("#taxDisplay").css("display","block");  //shows tax display on no click for ssc
  }
  closeModal(){
    $('#updateModal').modal('close');
  }
  componentWillUnmount(){
    $('.tooltipped').tooltip('remove');
    $(this.refs.updateModal).modal('close');
  }
  render(){
    let employeeData = this.props.user.profile.employeeData;
    let image = employeeData.image;
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
              prevAddress={employeeData.location.locationName}
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
              <div className="col s6">
                  <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Update your OSHA certification level?</p>
                  <p>
                  <input ref="on"name="osha" type="radio" id="on" defaultChecked={!employeeData.osha.osha10 && !employeeData.osha.osha30}/>
                  <label htmlFor="on">None</label>
                  </p>
                  <p>
                  <input ref="o1"name="osha" type="radio" id="o1" defaultChecked={employeeData.osha.osha10}/>
                  <label htmlFor="o1">Osha 10</label>
                  <input ref="o3"name="osha" type="radio" id="o3" defaultChecked={employeeData.osha.osha30}/>
                  <label htmlFor="o3">Osha 30</label>
                  </p>
              </div>
              <div className="col s6">
                  <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Can you bring your own tools?</p>
                  <p>
                  <input ref="ty"name="tools" type="radio" id="ty" defaultChecked={employeeData.bringTools}/>
                  <label htmlFor="ty">Yes</label>
                  </p>
                  <p>
                  <input ref="tn"name="tools" type="radio" id="tn" defaultChecked={!employeeData.bringTools}/>
                  <label htmlFor="tn">No</label>
                  </p>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                  <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Do you have a car?</p>
                  <p>
                  <input ref="cy"name="car" type="radio" id="cy" defaultChecked={employeeData.hasCar}/>
                  <label htmlFor="cy">Yes</label>
                  </p>
                  <p>
                  <input ref="cn"name="car" type="radio" id="cn" defaultChecked={!employeeData.hasCar}/>
                  <label htmlFor="cn">No</label>
                  </p>
              </div>
              <div className="col s6">
                  <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Do you have a driver license?</p>
                  <p>
                  <input ref="dy"name="driver" type="radio" id="dy" defaultChecked={employeeData.driverLicense}/>
                  <label htmlFor="dy">Yes</label>
                  </p>
                  <p>
                  <input ref="dn"name="driver" type="radio" id="dn" defaultChecked={!employeeData.driverLicense}/>
                  <label htmlFor="dn">No</label>
                  </p>
              </div>
              <div className="col s12">
                  <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Education</p>
                  <p>
                  <input ref="hs" type="checkbox" id="hs" defaultChecked={employeeData.education.highGED}/>
                  <label htmlFor="hs">HighSchool/GED</label>
                  </p>
                  <p>
                  <input onChange={()=>{this.setState({showTrade:!this.state.showTrade})}} ref="ts" type="checkbox" id="ts" defaultChecked={employeeData.education.tradeSchool.wentToSchool}/>
                  <label htmlFor="ts">Trade Shool</label>
                  {this.state.showTrade ? <MTextField ref="tradeS" label="Trade School" defaultValue={employeeData.education.tradeSchool.schoolName}/> : null}
                  </p>
                  <p>
                  <input ref="he" type="checkbox" id="he" defaultChecked={employeeData.education.higherEdu}/>
                  <label htmlFor="he">Higher Education</label>
                  </p>
              </div>
              <div className="col m4 s6">
                <label>Do you have a SSN?</label>
                <div>
                  <input name="group1" type="radio" id="sscYes" onClick={this.handlesscYesClick.bind(this)} defaultChecked={employeeData.socialPref.social}/>
                  <label htmlFor="sscYes">Yes</label>
                </div>
                <div>
                  <input name="group1" type="radio" id="sscNo" onClick={this.handlesscNoClick.bind(this)} defaultChecked={!employeeData.socialPref.social}/>
                  <label htmlFor="sscNo">No</label>
                </div>
              </div>
              <div id="taxDisplay" style={{display:'none'}} className="col m4 s6">
                <label>Do you have a Tax Id number?</label>
                <div>
                  <input name="group2" type="radio" id="taxYes" defaultChecked={employeeData.socialPref.taxID}/>
                  <label htmlFor="taxYes">Yes</label>
                </div>
                <div>
                  <input name="group2" type="radio" id="taxNo" defaultChecked={!employeeData.socialPref.taxID}/>
                  <label htmlFor="taxNo">No</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="input-field col l12 m12 s12">
                <MTextField ref="ua" id="userAbout" value={employeeData.about.text} label="About yourself"/>
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
