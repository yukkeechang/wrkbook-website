import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import { Link } from 'react-router-dom';
import MTextField from './Shared/MTextField';
import {Session} from 'meteor/session';
import { CSSTransitionGroup } from 'react-transition-group';


export default class ResetPassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      nEqual : false,
      pValid : true,
      p1Empty: false,
      badToken: false

    }

  }

  resetPassword=(e)=>{
    e.preventDefault();
    let pass1 = this.refs.pass1.value();
    let pass2 = this.refs.pass2.value();
    let istoken = Session.get('token');
    const passwords={
      password1:pass1,
      password2:pass2
    };

    Meteor.call('checkPasswords',passwords,(err)=>{
      if(err){
          this.setState(err.reason);

      }else{
        Accounts.resetPassword(this.props.match.params.value, pass1, (err)=>{
          if(err){
              console.log(err);
              if(err.reason == "Token expired") this.setState({badToken:true});
          }else{
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
        <div className="fill-height">
          <Header/>
          <div className="header-nav-bar-offset"></div>
            <div className="wrapper">
              <div className="container">
                <div className="card">
                  <div className="row card-content">
                    <form className="col s12">

                        <div className="row">
                          <MTextField ref="pass1" id="pass1"   error={this.state.p1Empty? empty : (!this.state.pValid ? pass : '')} type="password" label="Enter Password *"/>
                          <MTextField ref="pass2" id="pass2"     error={this.state.nEqual ? pequ: ''} type="password" label="Confirm Password *"/>

                        </div>
                      {
                        !this.state.badToken&&
                        <button className="btn-flat pale-teal no-uppercase" onClick={this.resetPassword}>Reset Password</button>
                      }

                    </form>
                    {this.state.badToken ? (
                      <CSSTransitionGroup
                      transitionName="err"
                      transitionAppear={true}
                      transitionAppearTimeout={1500}
                      transitionEnter={false}
                      transitionLeave={false}>
                        <Link to={"/forgot"}>
                          <p className="col s12 m6 offset-m3 red lighten-2 white-text flex-center" style={{lineHeight: '36px'}}>
                              This URL is expired. Click Here to re-submit
                          </p>
                        </Link>
                      </CSSTransitionGroup>
                    ):''}
                  </div>

                </div>
              </div>
              <div className="push"></div>
            </div>

            <Footer/>

        </div>
    );
  }

}
