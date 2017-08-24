import React from 'react';
import ReactDOM from 'react-dom';

import JobCreateComponent from './Jobs/JobCreateComponent';
import JobSchema from '../../../api/Schemas/jobSchema';
import { DEFAULT } from '../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../api/Schemas/locationSchema';

export default class EditJobs extends Component {
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.modal').modal();
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
  }
  constructor(props){
    super(props);
    this.state={
      titles: [],
      osha10: false,
      osha30: false,
      address: DEFAULT,
      startT: '',
      startD: '',
      endT: '',
      endD: '',
      lat: -100,
      lng: -100
    };
  }
  getCoords(lat, lng){
    console.log(lat);
    this.setState({
      address: this.refs.GoogleAuto.state.searchText,
      lat:lat,
      lng:lng
    });
  }
  handleCreate(e){
    let job = JobSchema.clean({});
    let location = LocationSchema.clean({});
    let jobtypes = $('#jobTitles').val();
    const description = this.refs.jobDescription.getValue().trim();
    const additionText = this.refs.additionalText.getValue().trim();
    const pay = parseInt(this.refs.pay.getValue().trim());
    let startDate = this.state.startD;
    let startTime = this.state.startT;
    let endDate = this.state.endD;
    let endTime = this.state.endT;
    location.locationName = this.state.address;
    location.latitude = this.state.lat;
    location.longitude = this.state.lng;

    const idx = startTime.indexOf('T');
    const idx1 = startTime.indexOf('.');
    const idx2 = startTime.indexOf('Z');
    const toremove = startTime.substr(idx1,idx2);
    startDate = startDate.substr(0,idx);
    startDate = startDate.split('"').join('');
    startTime = startTime.substr(idx,startTime.length);
    startTime= startTime.replace(toremove,"Z");
    const startAT = startDate+startTime;
    const toremove2 = endTime.substr(idx1,idx2);
    endDate = endDate.substr(0,idx);
    endDate = endDate.split('"').join('');
    endTime = endTime.substr(idx,endTime.length);
    endTime= endTime.replace(toremove2,"Z");
    const endAT = endDate+endTime;

    job.supervisor.name = this.refs.supervisorName.getValue().trim();
    job.supervisor.phone = this.refs.supervisorNumber.getValue().trim();
    job.title.text = $('#jobTitles').val() + " needed";
    job.description.text = description;
    job.additionalText.text = additionText;
    job.startAt = new Date(startAT);
    job.endAt = new Date(endAT);
    job.jobTypes.texts = jobtypes;
    job.pay = pay;
    job.numWorker = $('#numberEmployees').val();

    job.location = location;
    jobs.requirements.socialPref.social = $("#sscYes").prop('checked');
    jobs.requirements.socialPref.taxID = $("#taxYes").prop('checked');
    job.requirements.osha.osha10 = this.state.osha10;
    job.requirements.osha.osha30 = this.state.osha30;
    console.log("something");

    Meteor.call('createJob',job,(err)=>{
        if(err){
          console.log(err);
        }
    });
  }
  handleSelect(){
    if($('#osha').val()==2){
      this.setState.osha10 = true;
    }
    else if($('#osha').val()==3){
      this.setState.osha30 = true;
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
    let employeeComponent;
    return(
      <div className="container">
        <form>
          <div className="row">
            <div className="input-field col l6 m6 s12">
              <input id="supervisor-name" ref="supervisorName" value="{this.props.jobs.supervisor.name}" type="text"/>
              <label htmlFor="supervisor-name">Supervisors name</label>
            </div>
            <div className="input-field col l6 m6 s12">
              <input id="supervisor-number" ref="supervisorNumber" value="{this.props.jobs.supervisor.phone}" type="text"/>
              <label htmlFor="supervisor-number">Supervisors number</label>
            </div>
          </div>
          <div className="input-field col l12 m12 s12">
            <input id="jobLocation" ref="GoogleAuto" value="{this.props.jobs.location.locationName}" type="text"/>
            <label htmlFor="jobLocation">Job location</label>
          </div>
          <div className="input-field col l12 m12 s12">
            <input id="job-description" ref="jobDescription" value="{this.props.jobs.description.text}" type="text"/>
            <label htmlFor="job-description">Job description</label>
          </div>
          <div className="input-field col l12 m12 s12">
            <input id="responsibility" ref="responsibilites" type="text"/>
            <label htmlFor="responsibility">Responsibilites include:</label>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col l2 m2 s4">
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
            <div id="toolDisplay" style={{display:'none'}} className="input-field col l10 m10 s8">
              <input id="tools" ref="tools" type="text"/>
              <label htmlFor="tools">Required tools:</label>
            </div>
          </div>
        </form>
        <form>
          <div className="input-field col l6 m6 s12">
            <select id="osha" ref="osha" onSelect={this.handleSelect.bind(this)}>
              <option value="" disabled selected>OSHA preference</option>
              <option value="1">No preference</option>
              <option value="2">OSHA 10</option>
              <option value="3">OSHA 30</option>
            </select>
          </div>
        </form>
        <form>
          <div className="row">
            <div className="col l4 m4 s6">
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
            <div id="taxDisplay" style={{display:'none'}} className="col l4 m4 s6">
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
        <JobCreateComponent />
        <br/>
        <form>
          <div className="input-field col l12 s12">
            <input id="additional-text" ref="additionalText" value="{this.props.jobs.additionText.text}" type="text"/>
            <label htmlFor="additional-text">Additional information:</label>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <button data-target="modal1" className="btn modal-trigger">Create job</button>
          </div>
          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4>Confirmation</h4>
              <p>Your job post has been created.</p>
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
