import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import JobCreateComponent from './MultiProComponent';
import JobSchema from '../../../../api/Schemas/jobSchema';
import { DEFAULT } from '../../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../../api/Schemas/locationSchema';
import Location from '../../Shared/Location';
import MTextField from '../../Shared/MTextField';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class EditJob extends Component {
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.modal').modal();
    });
    $(this.refs.titles).change(()=>{
      this.setState({titles:$(this.refs.titles).val()})
    });

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false // Close upon selecting a date,
    });
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: true, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function(){} //Function for after opening timepicker
    });
    $(this.refs.osha).on('change',(e)=>{
      this.handleSelect(e);

    });

  }
  constructor(props){
    super(props);


    this.state={
      jobTitle: false,
      visorName: false,
      visorNumb: false,
      titles: this.props.jobPost.jobTypes.texts,
      osha10: false,
      osha30: false,
      address: DEFAULT,
      startT: '',
      startD: '',
      endT: '',
      endD: '',
      lat: -100,
      lng: -100,
      locationName: ''
    };

    if (this.props.jobPost.requirements.socialPref.taxID) {
      $("#taxYes").prop('checked',true);

    }else{
      $("#taxNo").prop('checked',true);

    }
    if (this.props.jobPost.requirements.socialPref.social) {
      $("#sscYes").prop('checked',true);
    }else{
      $("#sscNo").prop('checked',true);
    }

    console.log( $("#sscYes").prop('checked'));

  }
  componentWillMount(){
    console.log('mounted');
  }
  getCoords(lat, lng){
    this.setState({
      address: this.refs.GoogleAuto.state.searchText,
      lat:lat,
      lng:lng
    });
  }
  handleUpdate(e){
    let loc = this.refs.loc.getAddress();
    if(loc.valid){
      this.setState({locErr: false});
      let professionals = this.state.titles.map((title, index)=>{
        return this.refs[title].value();
      });
      let job = JobSchema.clean({});
      let location = LocationSchema.clean({});
      let jobtypes = this.state.titles;
      console.log('we in handleCreate');
      const description = this.refs.jd.value();
      const additionText = this.refs.at.value();
      location = loc.location;
      job.supervisor.name = this.refs.sName.value();
      job.supervisor.phone = this.refs.sNumber.value();
      job.additionText = additionText;
      job.description.text = description;
      job.jobTypes.texts = Object.values(jobtypes);
      job.professionals = professionals;
      job.location = location;
      job.jobTitle.text = this.refs.jt.value();
      job.requirements.socialPref.social = $("#sscYes").prop('checked');
      job.requirements.socialPref.taxID = $("#taxYes").prop('checked');
      job.requirements.osha.osha10 = this.state.osha10;
      job.requirements.osha.osha30 = this.state.osha30;
      let newJob = {
        job: job
      };
      console.log(job);
      let thingy =  this.props.match.params.value;
      Meteor.call('updateJob', thingy, job, (err)=>{
        if(err){
          console.log(err);
          console.log(err.reason);
          console.log('above two are update errors');
        }
        else{
          console.log('no error');
        }
      });
    }
    else{
      console.log('you in the else thingy');
      let professionals = this.state.titles.map((title, index)=>{
        return this.refs[title].value();
      });
      let job = JobSchema.clean({});
      let location = LocationSchema.clean({});
      let jobtypes =this.state.titles;
      console.log('we in handleCreate');
      const description = this.refs.jd.value();
      const additionText = this.refs.at.value();
      location = this.props.jobPost.location;
      job.supervisor.name = this.refs.sName.value();
      job.supervisor.phone = this.refs.sNumber.value();
      job.additionText = additionText;
      job.description.text = description;
      job.jobTypes.texts = Object.values(jobtypes);
      job.professionals = professionals;
      job.location = location;
      console.log(location);
      job.jobTitle.text = this.refs.jt.value();
      job.requirements.socialPref.social = $("#sscYes").prop('checked');
      job.requirements.socialPref.taxID = $("#taxYes").prop('checked');
      job.requirements.osha.osha10 = this.state.osha10;
      job.requirements.osha.osha30 = this.state.osha30;

      let thingss =this.props.jobPost._id;

      Meteor.call('updateJob', thingss, job, (err)=>{
        if(err){
          console.log(err);
          console.log(err.reason);
          console.log('above two are update errors');
        }
        else{
          console.log('no error');
        }
      });

    }
  }
  handleTitles(){
    this.setState({
      titles: $(this.refs.titles).val()
    })
  }
  handleSelect(){
    if($('#osha').val()==2){
      this.setState({
        osha10: true
      })
    }
    else if($('#osha').val()==3){
      this.setState({
        osha30: true
      })
    }
  }
  handletoolYesClick(){
    $("#toolDisplay").css("display","block"); //displays tool input on yes click
  }
  handletoolNoClick(){
    $("#toolDisplay").css("display","none");  //hides tool input on no click
  }
  handlesscYesClick(){
    $("#taxDisplay").css("display","none"); //keeps tax display hidden on yes click for ssc
    $("#taxYes").prop('checked',true);  //checks appropriate tax field for ssc yes click
  }
  handlesscNoClick(){
    $("#taxDisplay").css("display","block");  //shows tax display on no click for ssc
  }
  setStartD(x,event){
    let date = JSON.stringify(event);
    this.setState({startD: date});
  }
  setEndD(x,event){
    let date = JSON.stringify(event);
    this.setState({endD: date});
  }
  setStartT(x,event){
    let time = JSON.stringify(event);
    this.setState({startT: time});
  }
  setEndT(x,event){
    let time = JSON.stringify(event);
    this.setState({endT: time});
  }
  render(){

    let empty = 'This cannot be empty';
    let phErr = 'Not a valid phone number';
    return(
      <div className="container">
      <div className="card">
      <div className="card-content">
        <form>
          <div className="input-field col s12">
            <MTextField ref="jt" id="jobTitle" value={this.props.jobPost.jobTitle.text} error={this.state.jobTitle ? empty : ''} label="Job Title *"/>
          </div>
          <div className="row">
            <div className="input-field col m6 s12">
              <MTextField ref="sName" id="supervisorName" value={this.props.jobPost.supervisor.name} error={this.state.visorName ? empty : ''} label="Supervisor Name *"/>
            </div>
            <div className="input-field col m6 s12">
              <MTextField ref="sNumber" id="supervisorNumber" value={this.props.jobPost.supervisor.phone} error={this.state.visorNumb ? empty : ''} label="Supervisor Number *"/>
            </div>
          </div>
          <div className="input-field col s12">
            <Location ref="loc"
              prevAddress={this.props.jobPost.location.locationName}
            />
          </div>
          <div className="input-field col s12">
            <MTextField ref="jd" id="jobDescription" value={this.props.jobPost.description.text} label="Job Description *"/>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col m2 s4">
              <label>Are tools required?</label>
              <div>
                <input name="group1" type="radio" id="toolYes" onClick={this.handletoolYesClick.bind(this)} />
                <label htmlFor="toolYes">Yes</label>
              </div>
              <div>
                <input name="group1" type="radio" id="toolNo" onClick={this.handletoolNoClick.bind(this)} />
                <label htmlFor="toolNo">No</label>
              </div>
            </div>
            <div id="toolDisplay" style={{display:'none'}} className="input-field col m10 s8">
              <input id="tools" ref="tools" type="text"/>
              <label htmlFor="tools">Required tools:</label>
            </div>
          </div>
        </form>

        <form>
          <div className="input-field col m6 s12">
            <select id="osha" ref="osha" onChange={this.handleSelect.bind(this)}>
              <option value="" disabled selected>OSHA preference</option>
              <option value="1">No preference</option>
              <option value="2">OSHA 10</option>
              <option value="3">OSHA 30</option>
            </select>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col m4 s6">
              <label>Is Social Security required?</label>
              <div>
                <input name="group1" type="radio" id="sscYes" onClick={this.handlesscYesClick.bind(this)}/>
                <label htmlFor="sscYes">Yes</label>
              </div>
              <div>
                <input name="group1" type="radio" id="sscNo" onClick={this.handlesscNoClick.bind(this)}/>
                <label htmlFor="sscNo">No</label>
              </div>
            </div>
            <div id="taxDisplay" style={{display:'none'}} className="col m4 s6">
              <label>Is Tax Id required?</label>
              <div>
                <input name="group2" type="radio" id="taxYes"/>
                <label htmlFor="taxYes">Yes</label>
              </div>
              <div>
                <input name="group2" type="radio" id="taxNo"/>
                <label htmlFor="taxNo">No</label>
              </div>
            </div>
          </div>
        </form>
        {this.state.titles.map((title, index)=>{
          return(
            <JobCreateComponent ref={title} title={title} key={title}/>
          )
        })}
        <form>
          <div className="input-field col s12">
            <MTextField ref="at" id="additionalText" value={this.props.jobPost.additionText} label="Additional Information"/>
          </div>

          <div style={{display:'flex', justifyContent:'center'}}>
            <a className="waves-effect waves-teal btn-flat" onClick={this.handleUpdate.bind(this)}>Update job</a>
          </div>
          <div id="updateModal" className="modal">
            <div className="modal-content">
              <h4>Your job has been updated.</h4>
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