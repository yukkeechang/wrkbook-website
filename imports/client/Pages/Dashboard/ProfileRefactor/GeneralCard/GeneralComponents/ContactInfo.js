import { Link } from 'react-router-dom';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';


export default class ContactInfo extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log(this.props.test)
      return (
          <div>
            <div className="row center-align" style={{marginBottom: '0px'}}>
              <h6 style={{fontWeight: '900'}}>Contact</h6>
            </div>
            <div className="row" style={{marginBottom: '0px'}}>
            <h6>{this.props.user.profile.phone}</h6>
            </div>
            <div className="row" style={{marginBottom: '0px'}}>
            <h6>{this.props.user.emails[0].address}</h6>
            </div>
          </div>

      )
  }
}
