
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import 'rc-calendar/assets/index.css';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-select/assets/index.css';
import Select from 'rc-select';
import moment from 'moment';
const now = moment();
import ReviewSchema from  '../../../../api/Schemas/reviewSchema';
import ConfirmationsCard from './Components/ConfirmationsCard';
import JobDetailModal from './Components/JobDetailModal';
import HourRow from './Components/HourRow';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    let endAt = new Date(2017,9,1,13, 30, 25 );

    this.state = {
      currentDate: new Date(),
      currentDateParsed: "",
      jobsCurrentDate: [],
      todayAgendaRowIndexes: [],
      startingTimes: [],
      titles: [],
      descriptions: [],
      jobPostCheck: [],
      flipCards: false,
      data: [

      ],
    };
  }

  componentDidMount() {
    // Update card position on page load
    this.updateCardPositions();
    // Add listener to update card positions when screen size changes
    window.addEventListener("resize", this.updateCardPositions);

    // Set today's date to current date
    let dateToday = new Date();
    dateTodayParsed = this.parseDate(dateToday);
    this.renderDailyAgenda(dateToday, dateTodayParsed);

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
        if (startHourMilitary <= currentHourMilitary && currentHourMilitary < endHourMilitary) {
          filledInBoxes[i] = 1;
        }
      }
      return filledInBoxes;
    });

    return todayAgendaRowIndexes;
  }

  // Search all jobs for jobs that are occurring in current date
  searchForCurrentDayJobs = () => {
    let data = this.props.myEvents;
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

  // Render daily agenda
  renderDailyAgenda = (dateToday, dateTodayParsed) => {
    this.setState({
      currentDate: dateToday,
      currentDateParsed: dateTodayParsed,
    }, () => {
      // Call this function inside a callback so it executes after the state change occurs
      jobsCurrentDate = this.searchForCurrentDayJobs();
      let startingTimes = [];
      let titles = [];
      let descriptions = [];
      let jobPostCheck = [];
      for (let i=0; i<jobsCurrentDate.length; i++) {
        startingTimes.push(jobsCurrentDate[i].startAt.getHours());
        titles.push(jobsCurrentDate[i].title.text);
        descriptions.push(jobsCurrentDate[i].responsibilities.text);
        jobPostCheck.push(jobsCurrentDate[i]);
      }
      this.setState({
        jobsCurrentDate: jobsCurrentDate,
        startingTimes: startingTimes,
        titles: titles,
        descriptions: descriptions,
        jobPostCheck: jobPostCheck,
      }, () => {
        todayAgendaRowIndexes = this.createArrWithIndexOfFilledRows();
        this.setState({
          todayAgendaRowIndexes: todayAgendaRowIndexes,
        });
      });
    });
  }

  // Calendar day select handler
  onSelect = (value) => {
    // Convert moment object to date object
    let dateToday = value.toDate();
    let dateTodayParsed = this.parseDate(dateToday);
    this.props.changeDate(dateToday);
    this.renderDailyAgenda(dateToday, dateTodayParsed);
  }

  style = {
    dailyAgenda: {
      border: "1px solid #10A96D",
      overflow: "auto",
      height: 2010,
    },
    calendarContainer: {
      border: "1px solid #10A96D",
      marginBottom: 0,
    },
    newJobConfirmContainer: {
      border: "1px solid #10A96D",
      overflow: "auto",
    },
    dailyAgendaDayText: {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 15,
      marginLeft: 0,
      padding: 0,
    },
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
    filledInRowBorderTopGreen: {
      borderTop: "4px solid #10A96D",
      backgroundColor: "#f6f6f6",
      height: "100%",
      fontSize: 12,
    },
    filledInRowBorderTopBlue: {
      borderTop: "4px solid #8DB0FB",
      backgroundColor: "#f6f6f6",
      height: "100%",
      fontSize: 12,
    },
  }

  render() {

    if(!this.props.ready ) return null;
    // Create hour labels for today's agenda window
    let hours = [
      "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
      "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
    ];

    let todayAgendaRowIndexes = this.state.todayAgendaRowIndexes;
    let startingTimes = this.state.startingTimes;
    let titles = this.state.titles;
    let descriptions = this.state.descriptions;
    let jobPostCheck = this.state.jobPostCheck;
    // Create array with rows using map
    let todayAgendaRows = todayAgendaRowIndexes.map((filledIndexes, index) => {
      return (
        <HourRow
          style={this.style}
          time={hours[index]}
          militaryTime={this.convertToMilitaryTime(hours[index])}
          titles={titles}
          descriptions={descriptions}
          jobPostCheck={jobPostCheck}
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
        <div className="card-panel valign-wrapper" style={this.style.calendarContainer}>
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
        <div className="card-panel" style={this.style.newJobConfirmContainer}>
          <p
            className="center-align"
            style={{ margin: 0, padding: 0 }}
          >
            Notifications
          </p>
          <div>
          { this.props.notifies.length >0 ?
            this.props.notifies.map(function(notify,index){
              return(
                <ConfirmationsCard
                  jobTitle={notify.description}
                  matchType={"THINGZ"}
                />
              )
            })
            :
            <h3> No New Notifications</h3>
          }
          </div>


        </div>
      </div>
    );

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
          <div
            className="col s12 m12 l7"
            style={{ paddingRight: 0 }}
          >
            <div className="card-panel" style={this.style.dailyAgenda}>
              <p
                className="center-align"
                style={this.style.dailyAgendaDayText}
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
export default Home = createContainer((props) => {
  let handle = Meteor.subscribe('today-events', props.date);

  let handle2 = Meteor.subscribe('notifications-for-user');
  let ready2 = handle2.ready();
  let ready = handle.ready();
  return {
    ready: ready && ready2,
    myEvents: Event.find({}).fetch(),
    notifies : Notification.find({}).fetch()
  };
}, HomePage);
