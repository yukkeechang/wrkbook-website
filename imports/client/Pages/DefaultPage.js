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

  SendThis(){
  let words = 'qwerhgsdvgfbf';
  let EVENTIE =  EventSchema.clean({});
  EVENTIE.startAt = new Date(2016,11,12);
  EVENTIE.endAt = new Date(2016,11,12);
  EVENTIE.title.text = words;
  EVENTIE.description.text = words;
  let arrays = [];
  arrays[0]= EVENTIE;
  arrays[1] = EVENTIE;
  arrays[2] = EVENTIE;
  let jobyjob = JobSchema.clean({});
  let location = LocationSchema.clean({});
  location.latitude =11;
  location.longitude=12;
  location.locationName=words;
  jobyjob.location = location;
  jobyjob.additionText.text= words;
  jobyjob.supervisor.name = words;
  jobyjob.supervisor.phone = words;


  console.log(jobyjob);
  console.log(EVENTIE);
  const crap={
    job : jobyjob,
    eventInfo: arrays
  };
  // Meteor.call('createJob',crap,(err)=>{
  //   console.log(err);
  // });
  // Meteor.call('removeEvent','gAoikRizoykfEEvvq',(err)=>{
  //   console.log(err);
  // });
}
    render(){
        return (
          <div>
            <Home/>
            <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons" onClick={this.SendThis.bind(this)}>add</i></a>
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
