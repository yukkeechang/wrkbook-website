import { Link } from 'react-router-dom';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import Contact from './ContactCardComponent';
import ReactGA from 'react-ga';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';


export default class CurrentPage extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    initGA()
    logPageView()
  }

  render(){
    // Roles.userIsInRole(this.props.user._id,"PRO")
    let tthings = true;
    if(!!this.props.user){

      return(
          <Contact
            phoneNumber={this.props.user.profile.phone}
            email={this.props.user.emails[0].address}
          />

          )
      }else{
        return(
          <h1>WHAT ARE YOU DOING ON THIS PAGE</h1>
        )
      }
  }
}
