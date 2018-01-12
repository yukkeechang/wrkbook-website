import React, {Component}  from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';


import ConProfile from './ConProfile/ConOther';
import ProProfile from './ProProfile/ProOther';

//import Header from '../Shared/Header';
function isEmpty(obj) {
  for (var x in obj) { return false; }
  return true;
}

export default class OtherUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount(){
    console.log(this.props.match.params.value);
    Meteor.call('findUserbyId', this.props.match.params.value,(err,res)=>{
       if(err){
            console.log(err);
        }
        else {
          console.log(res);
          this.setState({
            user: res
          });
          console.log(this.state.user);
        }

      });
  }

  render() {
    if (!isEmpty(this.state.user)) {
      if (Roles.userIsInRole(this.props.match.params.value,"PRO")) {
        console.log("WORK");
        return (<ProProfile user={this.state.user}/>);
      }
      else if(Roles.userIsInRole(this.props.match.params.value,"CON")){
        console.log("CON");
        return (<ConProfile user={this.state.user}/>);
      }
      else{
        console.log(this.state.user._id);
        return (<h1>State set, not verifying role?</h1>);
      }
    }
    else{

      return (<h1>State not being set?</h1>);

    }
  }
}
