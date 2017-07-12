import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class RequireComponent extends React.Component{
  render(){
    return(
      <MuiThemeProvider>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div>
            <LinearProgress mode="determinate" value='20'/>
            <h1>Requirements</h1>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div>
              <h2>Required Certifications</h2>
              <Checkbox
                label="OSHA"
                id='OSHA'/>
              <Checkbox
                label="Driver's License"
                id='DL'/>
              <Checkbox
                label="Background Check"
                id='BC'/>
              <Checkbox
                label="High School Diploma/GED"
                id='GED'/>
            </div>
            <div>
              <h2>Enter requirements specific to this job</h2>
              <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
              <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
              <TextField floatingLabelText="Write a short bio about yourself:" multiLine={true} style={{width:"500"}}/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
