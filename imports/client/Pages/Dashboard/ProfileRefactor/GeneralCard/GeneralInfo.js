import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import InfoCard from './GeneralComponents/InfoCard';
import ContactInfo from './GeneralComponents/ContactInfo';

export default class GeneralInfo extends React.Component{
  constructor(props){
    super(props);
  }

  Contact(){
    return (
      <ContactInfo user={this.props.user}/>
    )
  }
  render(){
    // Roles.userIsInRole(this.props.user._id,"PRO")
    console.log(this.props);
    if(Roles.userIsInRole(this.props.user._id,"PRO")){
    this.Contact.bind(this);
      return(
          <InfoCard
            isUser={this.props.isUser}
            name={this.props.user.profile.firstName}
            userId={this.props.user._id}
            subTopic={this.props.user.profile.employeeData.jobTitle}
            Url={this.props.Url}
            location={this.props.user.profile.employeeData.location.locationName}
            user={this.props.user}
            />
          )
      }else if(Roles.userIsInRole(this.props.user._id,"CON")){
        return(
          <InfoCard
            isUser={this.props.isUser}
            name={this.props.user.profile.firstName}
            subTopic={this.props.user.profile.employerData.companyName.text}
            Url={this.props.Url}
            userId={this.props.user._id}
            location={this.props.user.profile.employerData.location.locationName}
            user={this.props.user}
            />
          );

      }else{
        return(
          <h1>WHAT ARE YOU DOING ON THIS PAGE</h1>
        )
      }
  }
}
