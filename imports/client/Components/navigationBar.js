import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from 'material-ui/Avatar';
class NavigationBar extends Component {
  constructor(props){
    super(props);
  }

  handleClick(e){
    if(this.props.user){
      Meteor.logout();
    }
  }
  render () {

    var user = (
      <Link className="navLink" to="/login">Login</Link>
    );
    if(this.props.user) user = 'Logout';
    // console.log(this.props.user)
    return (
      <div id="navBar">
          <ul id="left">
            <li style={{width:'30px', padding:'0', paddingRight:'10px'}}>
              <img src="images/wrkBookLogo.png" width="200%" height="100%"/>

              
            </li>
            <li><Link className="navLink" to="/">WrkBook</Link></li>
            <li><Link className="navLink" to="/Work">Work</Link></li>
            <li><Link className="navLink" to="/Hire">Hire</Link></li>
            <li><Link className="navLink" to="/Cities">Cities</Link></li>
          </ul>
          <ul id="right">
            <li><Link className="navLink" to="/Help">Help</Link></li>
            <li onClick={this.handleClick.bind(this)}>{user}</li>
          </ul>
      </div>
    )
  }
}
export default NavigationBarContainer = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
  };
}, NavigationBar);
