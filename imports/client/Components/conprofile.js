import React from 'react';
import { Link } from 'react-router-dom'
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileContactComponent from '../Components/profilecontactcard';
import ProfileCardComponent from '../Components/avatarcard';
import ProfileJobComponent from '../Components/profilejob';
import ProfileCertificationComponent from '../Components/profilecertification';
import ProfilePaymentComponent from '../Components/profilepayment';
import ProfileReviewComponent from '../Components/profilereviewcard';
import ProfileAboutComponent from '../Components/profileaboutcard';
import {List, ListItem, makeSelectable} from 'material-ui/List';

export default class ConProfile extends React.Component{
  render(){
    return(
      <div style={{margin: '20px',}}>
        <ProfileCardComponent
         full_name = "John Smith "
         job_positon_name ="Painter"
         avatar_pic_1 ="images/handshake.png"
          number_jobs = '20'
         profile_location = "Location, NY"/>
        <br/>
          <div>
            <div className="row">
              <div className="column">
                <ProfileAboutComponent
                  profile_about ="Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet."/>
              </div>
              <div className="column">
                <ProfileContactComponent/>
              </div>
          </div>
          <div>
            <div>
              <h1>hello</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
