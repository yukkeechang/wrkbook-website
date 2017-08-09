import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// import MSpinner from '../Components/Shared/MSpinner'
import Home from './Home';
// import Dashboard from './Dashboard';
import Location from './Shared/Location';
import ProfessionalProfile from './Profile/ProfessionalProfile';
import ContractorProfile from './Profile/ContractorProfile';
import EventSchema from '../../api/Schemas/eventSchema';
import JobSchema from '../../api/Schemas/jobSchema'
import LocationSchema from '../../api/Schemas/locationSchema';
class DefPage extends Component{
  // <Home/>
  // <Location/>

  
    render(){
        return (
          <div>
            <Home/>
          </div>
        )
    }

}
export default DefaultPage = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, DefPage);
