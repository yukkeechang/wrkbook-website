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
    this.state ={
      user: {},
    }
  }
  componentDidMount(){
    // console.log(this.props.match.params.value);
    Meteor.call('findUserbyId',this.props.match.params.value,(err,res)=>{
       if(err){
            console.log(err);
        }
        else {
          console.log(res);
          this.setState({user: res})
        }

      });
  }

  render() {
    if (!isEmpty(this.state.user)) {
    if (Roles.userIsInRole(this.props.user._id,"PRO")) {
        console.log("WORK");
        return (<ProProfile user={this.state.user}/>);
      } else if(Roles.userIsInRole(this.props.user._id,"CON")){
        console.log("CON");
        return (<ConProfile user={this.state.user}/>);
      }else{
        return (<h1> L</h1>);
      }
    }else{

      return (<h1> esdfsdf</h1>);

    }
  }
}
