import React, {Component}  from 'react';
import { Roles } from 'meteor/alanning:roles';
import {PROFESSIONAL} from '../../../../api/Schemas/employeeSchema';
import {CONTRACTOR} from '../../../../api/Schemas/employerSchema';
import { createContainer } from 'meteor/react-meteor-data';
import {Link} from 'react-router-dom';


import ConOther from './ConProfile/ConOther';
import ProOther from './ProProfile/ProOther';

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
     console.log(this.props.match.params.value);
    Meteor.call('findUserbyId',this.props.match.params.value,(err,res)=>{
       if(err){
            console.log(err);
        }
        else {
          console.log("other-user object: "+ JSON.stringify(res));
          this.setState({user: res})
        }

      });
  }

  render() {
    console.log(this.state.user.roles)
    if (!isEmpty(this.state.user)) {
    //----userIsInRole isn't returning what kind of user this is!
    // if (Roles.userIsInRole(this.state.user._id,"PRO")) {
    //     console.log("other user is PRO");
    //     return (<ProProfile user={this.state.user}/>);
    //   } else if(Roles.userIsInRole(this.state.user._id,"CON")){
    //     console.log("other user is CON");
    //     return (<ConProfile user={this.state.user}/>);
    //   }else{
    //     return (<h1> L</h1>);
    //   }
    // }else{
    //
    //   return (<h3>User not found!</h3>);
    //
    // }

    //---temp fix for now
    if(this.state.user.roles[0] == "PRO") {
      return (<ProOther user={this.state.user}/>);
    } else if (this.state.user.roles[0] == "CON") {
      return (<ConOther user={this.state.user}/>);
    } else {
      return (<h1>User exists but profile cannot be displayed</h1>)
    }
  } else {
    return(<h3>User not found!</h3>);
  }
 }
}
