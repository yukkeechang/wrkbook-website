import { Link } from 'react-router-dom';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import About from './AboutCardComponent';
import ReactGA from 'react-ga';

/*Adding Google Analytics*/
export const initGA = () => {
  console.log("GA initialized ABOUT")
  ReactGA.initialize('UA-102580306-1')
}

export const logPageView = () => {
  ReactGA.set({page:window.location.pathname});
  ReactGA.pageview(window.location.pathname)
}


export default class AboutPage extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount () {
    initGA()
    logPageView()

  }
  render(){

    if(Roles.userIsInRole(this.props.user._id,"PRO")){

      return(
          <About
            aboutText={this.props.user.profile.employeeData.about.text}
            isPro={true}
            skillsText={this.props.user.profile.employeeData.skills.text}
            languages={this.props.user.profile.employeeData.languages}
            highGED={this.props.user.profile.employeeData.education.highGED}
            higherEDU={this.props.user.profile.employeeData.education.higherEdu}
            tradeSchoolName={this.props.user.profile.employeeData.education.tradeSchool.schoolName}
            tradeSchool={this.props.user.profile.employeeData.education.tradeSchool.wentToSchool}
            />
          )
      }else if(Roles.userIsInRole(this.props.user._id,"CON")){
        return(
          <About
            aboutText={this.props.user.profile.employerData.about.text}
            isPro={false}
            />
          );

      }else{
        return(
          <h1>WHAT ARE YOU DOING ON THIS PAGE</h1>
        )
      }
  }
}
