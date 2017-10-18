import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import EmpJobPosts from './EmpJobPosts';
import ConJobPosts from './ConJobPosts';
import MSpinner from '../../Shared/MSpinner';

class JobPage extends React.Component{
  render(){
    if(this.props.user){
      if(this.props.user.roles[0] === "PRO"){
        return(<EmpJobPosts user={this.props.user}/>);
      } else if (this.props.user.roles[0] === "CON"){
        return(<ConJobPosts user={this.props.user}/>);
      }
    }
    else{
      return(
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      )
    }
  }
}

export default Jobs = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, JobPage);
