import React, {Component}  from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { withTracker } from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';


import ConProfile from './ConProfile/ConOther';
import ProProfile from './ProProfile/ProOther';

//import Header from '../Shared/Header';
function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

class OUser extends Component {
  constructor(props) {
    super(props);
    this.state ={
      user: {},
    }
  }
  componentDidMount(){
    // console.log(this.props.match.params.value);

  }

  render() {
    console.log(this.props);
    // console.log(Meteor.userId());
    if (!isEmpty(this.props.user)) {
      if (Roles.userIsInRole(this.props.user._id,"PRO")) {
          console.log("other user is PRO");
          return (<ProProfile user={this.props.user}/>);
        } else if(Roles.userIsInRole(this.props.user._id,"CON")){
          console.log("other user is CON");
          return (<ConProfile user={this.props.user}/>);
        }else{
          return (<h1> L</h1>);
        }
    }else if(!this.props.ready){
      return (<MSpinner/>);


    }else {
      return (<h3>User not found!</h3>);
    }
  }
}
export default OtherUser = withTracker(props => {
  let user = {};
  let handle = Meteor.subscribe('other-user',props.match.params.value);
  let ready = handle.ready();
  return {
    ready:ready,
    user:Meteor.users.find({_id:props.match.params.value}).fetch()[0],
  };
})(OUser);
