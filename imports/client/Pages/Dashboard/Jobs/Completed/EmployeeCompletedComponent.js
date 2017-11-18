import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Rendered in ConComponent

export default class EmployeeCompletedComponent extends React.Component {
 constructor(props) {
   super(props);
    Meteor.call('findUserbyId', this.props.id, function(err, res){
      if(err) {
        console.log("error is: "+err)
      } else {
        console.log(res)
        
      }
    })


  }

    render() {
      console.log("employee component: "+this.props.id)
      return (
        <div>{this.props.id}</div>
      )
    }
 }
