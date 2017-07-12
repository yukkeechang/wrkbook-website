import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class DateComponent extends React.Component{
  constructor(props) {
    super(props);

    const startDate = new Date();
    const endDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setHours(0, 0, 0, 0);
    endDate.setFullYear(endDate.getFullYear() + 1);
    endDate.setHours(0, 0, 0, 0);

    this.state = {
      startDate: startDate,
      endDate: endDate,
    };
  }

  handleChangestartDate = (event, date) => {
    this.setState({
      startDate: date,
    });
  };

  handleChangeendDate = (event, date) => {
    this.setState({
      endDate: date,
    });
  };

  render(){
    return(
      <MuiThemeProvider>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div>
            <LinearProgress mode="determinate" value={60}/>
            <h1>Date and Time</h1>
            <h4>Set the date and timeframe of the job</h4>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <DatePicker style={{width:'255px'}}
              onChange={this.handleChangestartDate}
              autoOk={this.state.autoOk}
              floatingLabelText="start Date"
              defaultDate={this.state.startDate}
              disableYearSelection={this.state.disableYearSelection}
            />
            <div style={{width:'20%'}}></div>
            <TimePicker hintText="Set start time"/>
          </div>
          <div>
            <h3>to</h3>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <DatePicker style={{width:'255px'}}
              onChange={this.handleChangeendDate}
              autoOk={this.state.autoOk}
              floatingLabelText="end Date"
              defaultDate={this.state.endDate}
              disableYearSelection={this.state.disableYearSelection}
            />
            <div style={{width:'20%'}}></div>
            <TimePicker hintText="Set end time"/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
