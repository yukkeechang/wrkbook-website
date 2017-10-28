import React , { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
export default class Calendar extends Component {
  render(){
    return(
      <div>
        <BigCalendar
          // events={myEventsList}
          // startAccessor='startDate'
          // endAccessor='endDate'
        />
      </div>
    );
  }
}
