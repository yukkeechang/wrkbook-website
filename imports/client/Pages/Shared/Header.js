import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import UserIcon from './UserIcon';
import {Roles} from 'meteor/alanning:roles';
import Base from './Header/Base';
import Navbar from './Header/Navbar';
import MSpinner from './MSpinner';


class Head extends Component {
    render(){
        let image='';
        if(this.props.user){
            image = Roles.userIsInRole(this.props.user._id,'PRO') ? this.props.user.profile.employeeData.image : this.props.user.profile.employerData.image;
        }
        let header = this.props.loggingIn ? <div className="row"><div className="col s2 push-s5"><MSpinner /></div></div> : (this.props.user ? <Navbar firstName={this.props.user.profile.firstName} image={image}/> : <Base handleClick={this.props.handleClick}/>);
        return(
            <div className="header-nav-bar">
                { !!this.props.user ?
                  <div className="container">
                      {header}
                  </div>
                  :
                  <div>
                      {header}
                  </div>
                }

            </div>
        )
    }

}

export default Header = withTracker( params  => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
})(Head);
