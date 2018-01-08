import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import { Link } from 'react-router-dom';
import MTextField from './Shared/MTextField';
import {Session} from 'meteor/session';


export default class ResetPassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      nEqual : false,
      pValid : true,
      p1Empty: false

    }

  }

  resetPassword(){
    let pass1 = this.refs.pass1.value();
    let pass2 = this.refs.pass2.value();
    let istoken = Session.get('token');
    const passwords={
      password1:pass1,
      password2:pass2
    };

    Meteor.call('checkPasswords',passwords,(err)=>{
      if(err){
          console.log(err);
          this.setState(err.reason);
      }else{
        Accounts.resetPassword(this.props.match.params.value, pass1, (err)=>{
          if(err)console.log(err);
          else{
            this.props.history.push('/');
          }
        });
      }
    });
  }


  render(){
    let pass = 'Not a valid password';
    let pequ = 'Passwords do not match';
    let empty = 'This cannot be empty';
    return(
        <div>
          <Header/>
          <div style={{height:'64px'}}></div>
            <div style={{zIndex:'-1'}} className="container">
              <div className="card">
                <div className="row card-content">
                  <form className="col s12">

                      <div className="row">
                        <MTextField ref="pass1" id="pass1"   error={this.state.p1Empty? empty : (!this.state.pValid ? pass : '')} type="password" label="Enter Password *"/>
                        <MTextField ref="pass2" id="pass2"     error={this.state.nEqual ? pequ: ''} type="password" label="Confirm Password *"/>

                      </div>


                    <a className="btn-flat teal lighten-4" onClick={this.resetPassword.bind(this)} style={{color: '#555',textTransform: 'none'}} type="submit">Reset Password</a>

                  </form>
                </div>

              </div>
            </div>
            <div>
              <Footer/>
            </div>
        </div>
    );
  }

}
