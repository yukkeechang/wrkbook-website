import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import Location from '../../Shared/Location';
import MTextField from '../../Shared/MTextField';
import JobCreateComponent from './MultiProComponent';
import JobSchema from '../../../../api/Schemas/jobSchema';
import EventSchema from '../../../../api/Schemas/eventSchema';
import { DEFAULT } from '../../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../../api/Schemas/locationSchema';

export default class CreateJobs extends Component {
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.modal').modal();
    });
    $(this.refs.titles).change(()=>{

      this.setState({titles:$(this.refs.titles).val()})
    })
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
    })
  }
  constructor(props){
    super(props);
    this.state={
      locErr: false,
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
  handleCreate(e){
    let loc = this.refs.loc.getAddress();
    if(loc.valid){
      this.setState({locErr: false});
      let professionals = this.state.titles.map((title, index)=>{
        return this.refs[title].value();
      });
      let job = JobSchema.clean({});
      let location = LocationSchema.clean({});
      let jobtypes = $('#jobTitles').val();
      console.log(jobtypes);
      const description = this.refs.jobDescription.value.trim();
      const additionText = this.refs.additionalText.value.trim();
      location = loc.location;
      job.supervisor.name = this.refs.supervisorName.value.trim();
      job.supervisor.phone = this.refs.supervisorNumber.value.trim();
      job.additionText = additionText;
      job.description.text = description;
      job.jobTypes.texts = Object.values(jobtypes);
      job.professionals = professionals;
      job.location = location;
      job.jobTitle.text = this.refs.jobTitle.value;
      job.requirements.socialPref.social = $("#sscYes").prop('checked');
      job.requirements.socialPref.taxID = $("#taxYes").prop('checked');
      job.requirements.osha.osha10 = this.state.osha10;
      job.requirements.osha.osha30 = this.state.osha30;
      let newJob = {
        job: job
      };
      console.log(newJob);
      console.log(job);
      Meteor.call('createJob',job,(res,err)=>{
          if(err){
            console.log(err.reason);
            console.log(err);
          }else{
            console.log(res);

          }
      });
    }
    else{
      this.setState({locErr:true});
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
        <form>
          <div className="input-field col s12">
            <input className="validate" id="jobTitle" ref="jobTitle" type="text"/>
            <label data-error="wrong" className="validate" htmlFor="jobTitle">Job title</label>
          </div>
          <div className="row">
            <div className="input-field col m6 s12">
              <input id="supervisor-name" ref="supervisorName" type="text"/>
              <label htmlFor="supervisor-name">Supervisors name</label>
            </div>
            <div className="input-field col m6 s12">
              <label htmlFor="supervisor-number">Supervisors number</label>
              <input id="supervisor-number" ref="supervisorNumber" type="text"/>
            </div>
          </div>
          <div className="input-field col s12">
            <Location ref="loc"/>
          </div>
          <div className="input-field col s12">
            <input id="job-description" ref="jobDescription" type="text"/>
            <label htmlFor="job-description">Job description</label>
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
            <select id="osha" ref="osha" onChange={()=>{}}>
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
        <div className="input-field col s12">
          <select ref="titles" multiple id="jobTitles">
            <option value="" disabled selected>Type of employee(s)</option>
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
        {this.state.titles.map((title, index)=>{
          return(
            <JobCreateComponent ref={title} title={title}key={title}/>

          )
        })}
        <form>
          <div className="input-field col s12">
            <input id="additional-text" ref="additionalText" type="text"/>
            <label htmlFor="additional-text">Additional information:</label>
          </div>

          <div style={{display:'flex', justifyContent:'center'}}>
            <a className="waves-effect waves-teal btn-flat" onClick={this.handleCreate.bind(this)}>Create job</a>
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
