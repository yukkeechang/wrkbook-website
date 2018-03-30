import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ContractorEdit from './ContractorEdit';
import ProfessionalEdit from './ProfessionalEdit';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';

class EditPage extends React.Component{

  componentDidMount() {
    initGA()
    logPageView()
  }

  render(){
    if(this.props.user){
      if(Roles.userIsInRole(this.props.user._id,"PRO")) {
        return <ProfessionalEdit user={this.props.user}/>
      } else if(Roles.userIsInRole(this.props.user._id,"CON")){
        return <ContractorEdit user={this.props.user}/>
      }
    }
  }
}
export default Edit = withTracker( params  => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
})(EditPage);
