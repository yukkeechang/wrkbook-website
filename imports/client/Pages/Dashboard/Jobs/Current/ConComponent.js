import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import EmployeeComponent from './EmployeeComponent';
import MSpinner from '../../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

//Contractor Component for Current Jobs
class ConComponentPage extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();

    $(dropdowns).ready(()=>{
      $('select').material_select();
      $('.tooltipped').tooltip({delay: 50});
    });



    console.log(this.props.jobinfo);
  Meteor.call('getEventInfo',this.props.jobinfo.eventInfo[0],(err,res)=>{
    if(err){
      console.log(err);
    }else{

      let startAt = res.startAt.toLocaleString();
      let endAt = res.endAt.toLocaleString();
      this.setState({
        endAt: endAt,
        startAt: startAt
      });
    }
  });
 }
constructor(props){
super(props);
let job = this.props.jobinfo;

this.state={
  job: job,
  startAt: '',
  endAt: '',
  osha10: this.props.jobinfo.requirements.osha.osha10,
  osha30: this.props.jobinfo.requirements.osha.osha30,
  license: this.props.jobinfo.requirements.driverLicense,
  nothing1: true,
  nothing2: true,
  value: "0"
};
// console.log(this.props.handleChildLoad)

}
handleProChange(e){

  this.setState({
    value: e.target.value,
  });
}
handleMember(){

}


render(){

  return(
    <div>
    hey
    </div>
  );

}



}

export default ConComponent = createContainer((props)=>{
  console.log(props);
  let handleAdmit = Meteor.subscribe('admit-employee-job',props.jobinfo._id);
  let admitPeople = [];
  let readyAdmit = handleAdmit.ready();
  if (!!Meteor.users.find({_id: {$in: props.jobinfo.admitemployeeIds}}).fetch()) {
    admitPeople =  Meteor.users.find({_id: {$in: props.jobinfo.admitemployeeIds}}).fetch();
  }
  return {
    admitPeople : admitPeople,
    ready : readyAdmit,
  };


},ConComponentPage);
//Filter is here because 2 types of objects (professionals) are being called from the same collection
