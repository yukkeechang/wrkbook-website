import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class Head extends Component {

    render(){
        let account = (
            <Link to="/login" className="col s1 pull-s1 m4 offset-m4">
                <h3 style={{color: 'white',fontSize: '20px', textAlign:'right',paddingRight:'10px'}} className="hide-on-small-only heading">Login</h3>
                <i  style={{color: 'white',cursor:'pointer'}} className="material-icons hide-on-med-and-up">account_circle</i>
            </Link> 
        );
        return(
            <div id="header">
                <div className="container">
                    <div style={{height:'64px'}} className="row valign-wrapper">
                        <Link to="/"className="col s10 m4"><img style={{paddingTop:'5px'}} src="/images/wrkbook.png"/></Link>
                        {account}
                    </div>
                </div>

            </div>
                        
        )
    }
    
}
export default Header = createContainer(({ params }) => {
  return {
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
  };
}, Head);
