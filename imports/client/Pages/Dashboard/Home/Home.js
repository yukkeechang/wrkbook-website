import React from 'react';
import 'rc-calendar/assets/index.css';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-select/assets/index.css';
import Select from 'rc-select';
import moment from 'moment';
const now = moment();

import NonJobEventModal from './Components/EventModal/NonJobEventModal';
import NonJobEventView from './Components/EventModal/NonJobEventView';
import NonJobEventCreate from './Components/EventModal/NonJobEventCreate';

import ConfirmationsCard from './Components/ConfirmationsCard';
import JobDetailModal from './Components/JobDetailModal';
import HourRow from './Components/HourRow';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    //for jon's modal
    this.event = {
        title: 'This is the title',
        description: 'This is the description',
        startAt: new Date(),
        endAt: new Date(),
    }

    // Sample dates
    // Today's date
    let today1 = new Date();
    let today2 = new Date();
    let today3 = new Date();

    // Manually set hours, minutes, and seconds for sample dates/time
    today1.setHours(12);
    today1.setMinutes(0);
    today1.setSeconds(0);
    today2.setHours(8);
    today2.setMinutes(0);
    today2.setSeconds(0);
    today3.setHours(20);
    today3.setMinutes(0);
    today3.setSeconds(0);

    // Tomorrow's date
    let tomorrow1 = new Date(today1.getTime() + 24 * 60 * 60 * 1000);
    let tomorrow2 = new Date(today2.getTime() + 24 * 60 * 60 * 1000);
    let tomorrow3 = new Date(today3.getTime() + 24 * 60 * 60 * 1000);

    // Manually set hours, minutes, and seconds for sample dates/time
    tomorrow1.setHours(18);
    tomorrow1.setMinutes(0);
    tomorrow1.setSeconds(0);
    tomorrow2.setHours(16);
    tomorrow2.setMinutes(0);
    tomorrow2.setSeconds(0);
    tomorrow3.setHours(21);
    tomorrow3.setMinutes(0);
    tomorrow3.setSeconds(0);

    // Random test start date
    let random1_1_start = new Date(2017, 7, 10);
    let random1_3_start = new Date(2017, 7, 10);

    // Manually set hours, minutes, and seconds for sample dates/time
    random1_1_start.setHours(5);
    random1_1_start.setMinutes(0);
    random1_1_start.setSeconds(0);
    random1_3_start.setHours(13);
    random1_3_start.setMinutes(0);
    random1_3_start.setSeconds(0);

    // Random test end date
    let random1_1_end = new Date(2017, 7, 15);
    let random1_3_end = new Date(2017, 7, 15);

    // Manually set hours, minutes, and seconds for sample dates/time
    random1_1_end.setHours(12);
    random1_1_end.setMinutes(0);
    random1_1_end.setSeconds(0);
    random1_3_end.setHours(18);
    random1_3_end.setMinutes(0);
    random1_3_end.setSeconds(0);

    this.state = {
      currentDate: today1,
      currentDateParsed: "",
      jobsCurrentDate: [],
      todayAgendaRowIndexes: [],
      startingTimes: [],
      titles: [],
      descriptions: [],
      flipCards: false,
      data: [
        {
          title: {
            text: "Plumber needed to install pipes",
          },
          description: {
            text: "Sunnyside Plumbing Co.",
          },
          address: "123 Macy's Avenue Flushing, NY 10324",
          startAt: today1,
          endAt: tomorrow1,
        },
        {
          title: {
            text: "Plumber for pipe system fixes",
          },
          description: {
            text: "Sunnyside Plumbing Co.",
          },
          address: "123 Maple Avenue Flushing, NY 10324",
          startAt: today2,
          endAt: tomorrow2,
        },
        {
          title: {
            text: "Check pick up at Tom's office",
          },
          description: {
            text: "Pick up 3 checks for 3 paints jobs done from 2 months ago",
          },
          address: "160 Convent Ave New York, NY 10324",
          startAt: today3,
          endAt: tomorrow3,
        },
        {
          title: {
            text: "Fix all bathrooms in building",
          },
          description: {
            text: "Astoria Plumbing Co.",
          },
          address: "Times Square New York, NY 10001",
          startAt: random1_1_start,
          endAt: random1_1_end,
        },
        {
          title: {
            text: "Fix shower and toilet",
          },
          description: {
            text: "Woodside Plumbing Co.",
          },
          address: "123 Springfield New York, NY 10201",
          startAt: random1_3_start,
          endAt: random1_3_end,
        },
      ],
    };
  }

  componentDidMount() {

    $('.modal').modal();
    // Update card position on page load
    this.updateCardPositions();
    // Add listener to update card positions when screen size changes
    window.addEventListener("resize", this.updateCardPositions);

    // Set today's date to current date
    let dateToday = new Date();
    dateTodayParsed = this.parseDate(dateToday);

    this.setState({
      currentDate: dateToday,
      currentDateParsed: dateTodayParsed,
    }, () => {
      // Call this function inside a callback so it executes after the state change occurs
      jobsCurrentDate = this.searchForCurrentDayJobs();
      console.log(jobsCurrentDate);
      let startingTimes = [];
      let titles = [];
      let descriptions = [];
      for (let i=0; i<jobsCurrentDate.length; i++) {
        startingTimes.push(jobsCurrentDate[i].startAt.getHours());
        titles.push(jobsCurrentDate[i].title.text);
        descriptions.push(jobsCurrentDate[i].description.text);
      }

      this.setState({
        jobsCurrentDate: jobsCurrentDate,
        startingTimes: startingTimes,
        titles: titles,
        descriptions: descriptions,
      }, () => {
        todayAgendaRowIndexes = this.createArrWithIndexOfFilledRows();
        this.setState({
          todayAgendaRowIndexes: todayAgendaRowIndexes,
        });
      });
    });
  }

  // Change card positions depending on screen width
  // Flip calendar and new job confirmation cards when screen is smaller so the calendar is below new job confirmations
  updateCardPositions = () => {
    // Screen width
    let width = document.body.scrollWidth;

    if (width >= 992) {
      this.setState({
        flipCards: false,
      });
    } else {
      this.setState({
        flipCards: true,
      });
    }
  }

  createArrWithIndexOfFilledRows = () => {
    let hours = [
      "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
    ];
    // Use map to get all the indexes of filled in boxes for all 24 hours
    let todayAgendaRowIndexes = hours.map((hour) => {
      let currentHourMilitary = this.convertToMilitaryTime(hour);
      let jobsCurrentDate = this.state.jobsCurrentDate;
      // Filled in boxes. 0 means unfilled and 1 is filled
      let filledInBoxes = [0, 0, 0];

      // Get filled in indexes of each row (hour)
      for (let i=0; i<jobsCurrentDate.length; i++) {
        let job = jobsCurrentDate[i];
        let startHourMilitary = job.startAt.getHours();
        let endHourMilitary = job.endAt.getHours();
        if (startHourMilitary <= currentHourMilitary && currentHourMilitary <= endHourMilitary) {
          filledInBoxes[i] = 1;
        }
      }
      return filledInBoxes;
    });

    return todayAgendaRowIndexes;
  }

  // Search all jobs for jobs that are occurring in current date
  searchForCurrentDayJobs = () => {
    let data = this.state.data;
    let jobsCurrentDate = [];
    // Parse date to ignore time
    let currentDate = this.parseDate(this.state.currentDate);

    for (let i=0; i<data.length; i++) {
      let job = data[i];
      let startDate = job.startAt;
      let endDate = job.endAt;
      let rangeOfDates = this.getDates(startDate, endDate);
      // Check if currentDate is in rangeOfDates
      if (rangeOfDates.includes(currentDate)) {
        jobsCurrentDate.push(job);
      }
    }
    // return founds jobs today
    return jobsCurrentDate;
  }

  // Find index of nth char in string. This is used to parse date to August 15, 2017 format in parseDate method
  nthChar = (str, ch, n) => {
    let count = 0
    let i = 0;
    while (count < n && (i = str.indexOf(ch, i) + 1)) {
      count++;
    }
    if (count == n) {
      return i - 1;
    }
    return NaN;
  }

  // Parse date object
  parseDate = (date) => {
    // Options for toLocaleTimeString
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // Format date in date and time form. ie. August 9, 2017, 3:06:21 PM
    let dateFormatted = date.toLocaleTimeString("en-us", options);
    // Parse formatted date so it doesn't include time
    let dateParsed = dateFormatted.slice(0, this.nthChar(dateFormatted, ',', 2));

    return dateParsed;
  }

  // Store range of dates in dateArray and return it
  getDates = (startDate, stopDate) => {
    // Add addDays method to Date object
    Date.prototype.addDays = function(days) {
      var dat = new Date(this.valueOf())
      dat.setDate(dat.getDate() + days);
      return dat;
    }
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      // Parse date to ignore time
      dateArray.push(this.parseDate(currentDate));
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
  }

  // Convert from 12 hour time to military/24 hour time
  convertToMilitaryTime = (time) => {
    let militaryTime = 0;
    if (time == "12 AM") {
      militaryTime = 0;
    } else if (time == "12 PM") {
      militaryTime = 12;
    } else if (time.split(" ")[1] == "PM") {
      militaryTime = Number(time.split(" ")[0]) + 12;
    } else if (time.split(" ")[1] == "AM") {
      militaryTime = Number(time.split(" ")[0]);
    }
    return militaryTime;
  }

  // Calendar day select handler
  onSelect = (value) => {
    // Convert moment object to date object
    let dateToday = value.toDate();
    console.log(dateToday);
    let dateTodayParsed = this.parseDate(dateToday);

    this.setState({
      currentDate: dateToday,
      currentDateParsed: dateTodayParsed,
    }, () => {
      // Call this function inside a callback so it executes after the state change occurs
      jobsCurrentDate = this.searchForCurrentDayJobs();
      this.setState({
        jobsCurrentDate: jobsCurrentDate,
      }, () => {
        todayAgendaRowIndexes = this.createArrWithIndexOfFilledRows();
        this.setState({
          todayAgendaRowIndexes: todayAgendaRowIndexes,
        });
      });
    });
  }

  style = {
    combinedRow: {
      height: 80,
    },
    rowDiv: {
      height: '50%',
      margin: 0,
      padding: 0,
    },
    solidBlackBorder: {
      borderTop: "1px solid black",
    },
    dottedGrayBorder: {
      borderTop: "1px dotted gray",
    },
    hourDiv: {
      fontSize: 12,
      margin: 0,
      padding: 0,
    },
    zeroMarginPadding: {
      margin: 0,
      padding: 0,
    },
    filledInRow: {
      backgroundColor: "#f6f6f6",
      height: "100%",
    },
    filledInRowBorderTop: {
      borderTop: "4px solid #10A96D",
      backgroundColor: "#f6f6f6",
      height: "100%",
      fontSize: 12,
      // overflowY: "auto",
      // overflowWrap: "break-word",
    },
  }

  render() {
    // Create hour labels for today's agenda window
    let hours = [
      "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
    ];

    let todayAgendaRowIndexes = this.state.todayAgendaRowIndexes;
    let startingTimes = this.state.startingTimes;
    let titles = this.state.titles;
    let descriptions = this.state.descriptions;
    // Create array with rows using map
    let todayAgendaRows = todayAgendaRowIndexes.map((filledIndexes, index) => {
      return (
        <HourRow
          style={this.style}
          time={hours[index]}
          militaryTime={this.convertToMilitaryTime(hours[index])}
          titles={titles}
          descriptions={descriptions}
          filledInBoxes={filledIndexes}
          startingTimes={startingTimes}
          halfHour={false}
          startAtThirtyMin={false}
          key={hours[index]}
        />
      );
    });

    // Calendar card
    let calendarDiv = (
      <div className="row">
        <div className="card-panel valign-wrapper" style={{ border: "1px solid #10A96D", marginBottom: 0 }}>
          <FullCalendar
            style={{ margin: "auto" }}
            Select={Select}
            fullscreen={false}
            onSelect={this.onSelect}
            defaultValue={now}
          />
        </div>
      </div>
    );

    // New job confirmation card
    let newJobConfirmDiv = (
      <div className="row">
        <div className="card-panel" style={{ border: "1px solid #10A96D", overflow: "auto", height: 1700 }}>
          <p
            className="center-align"
            style={{ margin: 0, padding: 0 }}
          >
            New Job Confirmations/Job Matches
          </p>
          <ConfirmationsCard
            jobTitle={"Plumber needed to fix apartment water system"}
            matchType={"New Match!"}
          />
          <ConfirmationsCard
            jobTitle={"Plumber needed to fix house bathroom"}
            matchType={"New Confirmation!"}
          />
          <ConfirmationsCard
            jobTitle={"Need plumber to fix sink"}
            matchType={"New Match!"}
          />
          <ConfirmationsCard
            jobTitle={"Need plumber to fix sink"}
            matchType={"New Match!"}
          />
          <ConfirmationsCard
            jobTitle={"Need plumber to fix sink"}
            matchType={"New Match!"}
          />
        </div>
      </div>
    );

    let createEvent = (
      <div>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Create Event</a>
          <div id="modal1" className="modal">
              <NonJobEventCreate />
          </div>
      </div>
    );

    let viewEvent = (
      <div>
          <a className="waves-effect waves-light btn modal-trigger" href="#modal2">View Event</a>
          <div id="modal2" className="modal">
              <NonJobEventView
                   event={this.event}/>
          </div>
      </div>
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l5">
            {
              // flipCards is true when screen size is smaller than 992px.
              // When flipCards is true, render calendar below new job confirmations.
              // Otherwise render calendar above new job confirmations
              this.state.flipCards
              ?
                <div style={this.style.zeroMarginPadding}>
                  {newJobConfirmDiv}
                  {calendarDiv}
                </div>
              :
                <div style={this.style.zeroMarginPadding}>
                  {calendarDiv}
                  {newJobConfirmDiv}
                </div>
            }
          </div>
          <div>
            {createEvent}
          </div>
          <div
            className="col s12 m12 l7"
            style={{ paddingRight: 0 }}
          >
            <div className="card-panel" style={{ border: "1px solid #10A96D", overflow: "auto", height: 2010 }}>
              <p
                className="center-align"
                style={{ marginTop: 0, marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0 }}
              >
                {this.state.currentDateParsed}
              </p>
              {todayAgendaRows}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
