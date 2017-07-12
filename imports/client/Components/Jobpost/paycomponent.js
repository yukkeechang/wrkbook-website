import React from 'react';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class PayComponent extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div>
            <LinearProgress mode="determinate" value={70}/>
            <h1>Pay</h1>
            <h4>Set hourly pay rate</h4>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <TextField floatingLabelText="$00.00" style={{margin:'0', width:"150"}}/>
            <div stye={{width:'5%'}}></div>
            <h2>/hr</h2>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
