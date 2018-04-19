import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import UserIcon from './UserIcon';
import {Roles} from 'meteor/alanning:roles';
import Base from './Header/Base';
import Navbar from './Header/Navbar';
import MSpinner from './MSpinner';
// let user;
// if(this.props.user){
//     let image = Roles.userIsInRole(this.props.user._id,'PRO') ? this.props.user.profile.employeeData.image : this.props.user.profile.employerData.image;
//     user = (
//         <div style={{display:'flex',justifyContent:'flex-end'}} className="col s2 m4 offset-m4">
//             <span style={{color: 'white',paddingRight: '10px'}}className="flow-text hide-on-small-only">{this.props.user.profile.firstName}</span>
//                 <UserIcon imageId={image}/>
//         </div>
// );}

class Head extends Component {
    render(){
        let image='';
        if(this.props.user){
            image = Roles.userIsInRole(this.props.user._id,'PRO') ? this.props.user.profile.employeeData.image : this.props.user.profile.employerData.image;
        }
        // console.log(image);
        let header = this.props.loggingIn ? <div className="row"><div className="col s2 push-s5"><MSpinner /></div></div> : (this.props.user ? <Navbar firstName={this.props.user.profile.firstName} image={image}/> : <Base handleClick={this.props.handleClick}/>);
        return(
            <div id="header">
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
  console.log(params);
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
})(Head);
