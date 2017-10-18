import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import GeneralInfo from './Components/GeneralInfo';
import About from './Components/About';
import Contact from './Components/Contact';
import Cert from './Components/Certifications';
import Payment from './Components/Payment';
import Reviews from './Components/Reviews';
import { createContainer } from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';
import ConProfile from './ConProfile/ConProfile';
import ProProfile from './ProProfile/ProProfile';

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    console.log(user)
    this.state = {user: user}
    if (user.roles[0] === "PRO") {
      this.state = {isPro: true}
    } else if (user.roles[0] === "CON"){
      this.state = {isPro: false}
    }
  }

render() {
  this.state.isPro ? return (<ProProfile/>) : return (<ConProfile/>)
}



export default Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, ProfilePage);
