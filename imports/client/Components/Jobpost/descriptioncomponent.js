import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class DescriptionComponent extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <LinearProgress mode="determinate" value='30'/>
          <div>
            <h1>Job Description</h1>
            <h4>Enter a breif description on the professionals responsibilities</h4>
            <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
          </div>
          <div>
            <h1>Responsibilities include:</h1>
            <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
            <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
            <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
