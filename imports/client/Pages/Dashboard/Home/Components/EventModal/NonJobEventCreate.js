import React, { Component } from 'react';
import  EventSchema from '../../../../../../api/Schemas/eventSchema';

export default class NonJobEventCreate extends Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: true // Close upon selecting a date,
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

    onFormSubmit(event) {
        event.preventDefault();

        // Convert time input strings from 12 hour to 24 hour for Date() processing
        const startTime = this.convertTo24Hour(this.refs.startTime.value.toLowerCase());
        const endTime = this.convertTo24Hour(this.refs.endTime.value.toLowerCase());

        // Create Date objects for start date and end date of event
        const startAt = new Date(`${this.refs.startDate.value} ${startTime}`);
        const endAt = new Date(`${this.refs.endDate.value} ${endTime}`);

        const eventObject = {
            title: this.refs.title.value,
            description: this.refs.description.value,
            startAt,
            endAt,
        };

        // console.log(eventObject);

        let toEventSchema = EventSchema.clean({},{mutate:true});
        toEventSchema.title.text = eventObject.title;
        toEventSchema.responsibilities.text = eventObject.description;
        toEventSchema.startAt = eventObject.startAt;
        toEventSchema.endAt = eventObject.endAt;
        console.log(toEventSchema);
        Meteor.call('createEvent',toEventSchema,(err)=>{
           console.log(err);
        });
    }

    // Convert a string from 12 hour time to 24 hour time
    convertTo24Hour(time) {
      var hours = parseInt(time.substr(0, 2));
      if(time.indexOf('am') != -1 && hours == 12) {
          time = time.replace('12', '0');
      }
      if(time.indexOf('pm')  != -1 && hours < 12) {
          time = time.replace(hours, (hours + 12));
      }
      return time.replace(/(am|pm)/, '');
    }

    render() {
        return (
            <div className="card center-align" style={{margin:'0'}}>
                <div className="card-content">
                <div className="row">
                    <span className="card-title">Create a New Event</span>
                    <form className="col s12" onSubmit={this.onFormSubmit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Title" ref="title" type="text" required />
                            </div>
                            <div className="input-field col s12">
                                <textarea placeholder="Description" ref="description" maxLength="250" className="materialize-textarea" required />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Start Date" ref="startDate" type="text" className="datepicker" required />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="End Date" ref="endDate" type="text" className="datepicker" required />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Start Time" ref="startTime" type="text"  className="timepicker" required />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="End Time" ref="endTime" type="text" className="timepicker" required />
                            </div>
                            <input type="submit" className="waves-effect waves-light btn" />
                        </div>
                    </form>
                </div>
                </div>

            </div>
        );
    }
}
