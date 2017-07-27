import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom';
import SelectField from 'material-ui/SelectField';
import LinearProgress from 'material-ui/LinearProgress';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import GooglePlaceAutocomplete from 'material-ui-autocomplete-google-places';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import JobSchema from '../../../api/Schemas/jobSchema';
import { DEFAULT } from '../../../api/Schemas/basicTextSchema';
import LocationSchema from '../../../api/Schemas/locationSchema';

const items = [];
    for (let i = 1; i < 11; i++ ) {
      items.push(<MenuItem value={i} key={i} primaryText={i} />);
}
const jobtitles = [
    'Painter','Demolititoner','Glazer','Masonry/Stone Worker',
    'Concrete Finisher','Plumber','Electrician','Heat/Air conditioning Worker'
];

var stuff = [];

export default class CreateJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            address: DEFAULT,
            selects: [],
            titles:[],
            startT: '',
            startD: '',
            endT: '',
            endD: '',
            lat: -100,
            lng: -100
        };
    }
    handleChange = (event, index, value) => this.setState({value});

    handleChangeJob = (event, index, titles) => this.setState({titles});

    handleRowSelection = (selectedRows) => {
        console.log(selectedRows);
        this.setState({selects:selectedRows});
    };

    handleRowSelectionl(e){
        console.log(e);
        console.log(this.refs.table);
        // this.setState({selects:e});
    }

    getCoords(lat, lng){
        console.log(lat);
        this.setState({
            address: this.refs.GoogleAuto.state.searchText,
            lat:lat,
            lng:lng
        });
    }

    handleTime(event, time){
        console.log(time);
        let id  = event.target.id;
        switch (id) {
            case 'starttime':
                this.setState({startT: time});
                break;
            case 'endtime':
                this.setState({endT: time});
                break;
            default:
        }
    }

    handleDate(event, date){
        console.log(this.refs.halp);
        console.log(event);
        let id  = event.target.id;
        switch (id) {
            case 'startdate':
                break;
            case 'enddate':
                this.setState({endD: date});
                break;
            default:
        }
    }

    handleCreate(e){
        let job = JobSchema.clean({});
        let location = LocationSchema.clean({});
        let jobtypes  = this.state.titles;
        let title = '';
        // console.log(this.state.selects);

        for (var indx in this.state.titles) {
            let word = this.state.titles[indx] + 's, ';
            title += word;
        }

        const description = this.refs.jobDescription.getValue().trim();
        const additionText = this.refs.Additional.getValue().trim();
        const responsi =  this.refs.responsibilites.getValue().trim();
        const pay = parseInt(this.refs.pay.getValue().trim());
        let startDate = this.state.startD;
        let startTime = this.state.startT;
        let endDate = this.state.endD;
        let endTime = this.state.endT;
        // console.log(startDate);
        location.locationName = this.state.address;
        location.latitude = this.state.lat;
        location.longitude = this.state.lng;

        // console.log('h');
        const idx = startTime.indexOf('T');
        const idx1 = startTime.indexOf('.');
        const idx2 = startTime.indexOf('Z');
        const toremove = startTime.substr(idx1,idx2);

        console.log(startTime);
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

        job.title.text = title + "needed";
        job.description.text = description;
        job.additionText.text =additionText;
        job.startAt = new Date(startAT);
        job.endAt = new Date(endAT);
        job.jobTypes.texts =jobtypes;
        job.pay  = pay;
        job.location = location;

        Meteor.call('createJob',job,(err)=>{
            if(err){
              console.log(err);
            }
        });
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
    menuItems(values) {
    return jobtitles.map((name) => (
        <MenuItem
          key={name}
          insetChildren={true}
          checked={values && values.indexOf(name) > -1}
          value={name}
          primaryText={name}
        />
      ));
    }

    render(){
        const {titles} = this.state;
        return(
            <MuiThemeProvider>
                <Card>
                  <div style={{justifyContent: 'center'}}>
                  <br/>
                 <div className="row" >
                       <div className="cloumn _10"/>
                       <div className="cloumn _80 greyBorder" style={{justifyContent: 'center'}}>
                            <CardTitle title="Job Description"
                            subtitle =
                              'Enter a brief description on the professionals responsibilites'/>
                            <br/>
                              <TextField
                              multiLine={true}
                              fullWidth={true}
                              ref="jobDescription"
                              />
                        </div>
                        <div className="cloumn _10"/>

                  </div>

                  <br/>
                  <div className="row" >
                        <div className="cloumn _10"/>
                        <div className="cloumn _80 greyBorder" style={{justifyContent: 'center'}}>
                              <CardTitle title="Responsibilites include:"/>
                              <br/>
                              <TextField
                              multiLine={true}
                              fullWidth={true}
                              ref="responsibilites"
                                />
                         </div>
                         <div className="cloumn _10"/>

                  </div>
                  <br/>
                  <div className="row" >
                      <div className ="cloumn _25" />
                      <div className ="cloumn _50 greyBorder" >
                            <div className="row" >

                                <div className ="column _25" >
                                    <DatePicker hintText="Start Date " mode="landscape"
                                    onChange={(x, event) => this.setStartD(x,event)}
                                      id="startdate"
                                      ref='halp'
                                     />
                                </div>

                                <div className ="column _25" >
                                    <TimePicker
                                    onChange={(x, event) => this.setStartT(x,event)}
                                       hintText="Start Time"
                                       id="starttime"
                                     />
                                </div>

                            </div>

                      </div>
                      <div className ="cloumn _25" />

                  </div>

                  <br/>
                  <div className="row" >
                      <div className ="cloumn _25" />
                      <div className ="cloumn _50 greyBorder" >
                            <div className="row" >

                                <div className ="column _25" >
                                    <DatePicker hintText="End Date " mode="landscape"
                                    onChange={(x, event) => this.setEndD(x,event)}
                                    id="enddate"/>
                                </div>

                                <div className ="column _25" >
                                    <TimePicker
                                       hintText="End Time"
                                       onChange={(x, event) => this.setEndT(x,event)}
                                       id="endtime"

                                     />
                                </div>

                            </div>

                      </div>
                      <div className ="cloumn _25" />

                  </div>
                  <br/>
                  <div className="row" >
                      <div className ="cloumn _45" />
                      <div className ="cloumn _10 greyBorder" >
                            <div className="row " style={{justifyContent: 'center'}}>
                                    <TextField
                                    floatingLabelText="$0.00"
                                    multiLine={false}
                                    style={{width:'50px'}}
                                    ref="pay"
                                      />

                            </div>
                      </div>

                      <div className ="cloumn _45" />
                  </div>
                  <br/>
                  <div className="row">

                        <div className="cloumn _10"/>
                        <div className="cloumn _80 greyBorder" style={{justifyContent: 'center'}}>
                        <GooglePlaceAutocomplete
                          // Function to return lat and lng
                            ref = 'GoogleAuto'
                          hintText="Please Enter Address"
                          results={this.getCoords.bind(this)}
                         />
                         </div>
                         <div className="cloumn _10"/>
                  </div>
                  <br/>
                  <div className="row" >
                        <div className="cloumn _10"/>
                        <div className="cloumn _80 greyBorder" style={{justifyContent: 'center'}}>
                              <CardTitle title="Additional Information:"/>
                              <TextField
                              multiLine={true}
                              fullWidth={true}
                              ref="Additional"
                                />

                         </div>
                         <div className="cloumn _10"/>

                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <div className="row" >
                        <div className="cloumn _10"/>
                        <div className="column _80 greyBorder">
                              <div className='row'>

                                  <div className="cloumn _50" style={{justifyContent: 'center'}}>
                                      <SelectField
                                          multiple={true}
                                          hintText="Select type of employees you want to hire"
                                          value={titles}
                                          onChange={this.handleChangeJob}
                                          style={{width:'500px'}}
                                          >
                                          {this.menuItems(titles)}
                                      </SelectField>

                                   </div>
                                   <div className="column _30">

                                       <DropDownMenu maxHeight={200} value={this.state.value} onChange={this.handleChange}>
                                         {items}
                                       </DropDownMenu>

                                   </div>
                              </div>
                          </div>

                         <div className="cloumn _10"/>

                  </div>
                  <br/>
                  <div className="row" >
                        <div className="cloumn _25"/>
                        <div className="column _50 ">
                              <div className='row'>

                                <RaisedButton
                                  backgroundColor="#10a96d"
                                  label="Create Job"
                                  onTouchTap={this.handleCreate.bind(this)}

                                  fullWidth={true}
                                />
                              </div>
                          </div>

                         <div className="cloumn _25"/>
                  </div>
              </div>
          </Card>
      </MuiThemeProvider>
    )
  }

}
