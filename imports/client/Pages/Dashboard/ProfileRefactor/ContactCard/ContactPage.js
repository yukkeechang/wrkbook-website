import { Link } from 'react-router-dom';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';


export default class CurrentPage extends React.Component{
  constructor(props){
    super(props);
  }



  render(){
      return(
          <div className="card-panel">
            <div className="row center-align">
              <h5>
                Contact
              </h5>
            </div>
            <div className="row">
            <h6> Phone Number: {this.props.user.profile.phone}</h6>
            </div>
            <div className="row">
            <h6> Email: {this.props.user.emails[0].address}</h6>
            </div>

          </div>

          )

  }
}
