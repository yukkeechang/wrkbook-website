import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Rendered in ConComponent

export default class EmployeeCompletedComponent extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     user: {}
   }
    Meteor.call('findUserbyId', this.props.id, function(err, res){
      if(err) {
        console.log("error is: "+err)
      } else {
        console.log("res: "+res)
        this.setState(
          user: res
        )
      }
    })


  }

    render() {
      console.log("employee obj: "+this.res.profile.employerData.firstName)
      return (
        <div>{this.props.id}</div>
      )
    }
 }
