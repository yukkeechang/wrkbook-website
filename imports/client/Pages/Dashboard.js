import React , { Component } from 'react';
import Header from '../Components/Shared/Header';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Dash extends Component {

    render(){
        return(
            <div>
            <Header/>
            <div className="fullWidth" style={{height:'64px',backgroundColor:'rgba(0,0,0,0.3)'}}></div>
            <h1>{this.props.user.emails[0].address}</h1>

            </div>
        );
    }
}
export default Dashboard = createContainer(({ params }) => {
  return {
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
  };
}, Dash);
