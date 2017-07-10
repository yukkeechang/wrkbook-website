import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

Job = new Mongo.Collection('Jobs');
Employee = new Mongo.Collection('Employees')

function isEmpty(obj) {
   for (var x in obj) { return false; }
   return true;
}



class Dummy extends Component{
    render(){

      console.log(this.props.employee);
      console.log(this.props.jobPost);




        return(
          <div>

            <h1>hello</h1>

          </div>
        )
    }
}

export default DummyContainer = createContainer(({params}) => {


  let searchHandle = Meteor.subscribe('employee-data',Meteor.userId());
  let employee = Employee.find({}).fetch();
  let loading = searchHandle.ready();
  let jobPost = {};
  console.log(employee);
  if(!isEmpty(employee)){
    for( var something in employee){

      for(var skill in employee[something].skills){
        Meteor.subscribe(employee[something].skills[skill]);


        jobPost[jobPost.length] = Job.find({}).fetch();
      }
    }

  }


  return {
    employee : employee,
    loading: loading,
    jobPost: jobPost,
  };



}, Dummy);
