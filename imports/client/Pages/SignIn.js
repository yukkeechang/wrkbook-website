import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import MTextField from './Shared/MTextField';

export default class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      noUser: '',
      pValid: '',
    };

  }
  login=(e)=>{
    e.preventDefault();
    console.log("clicked");
    let email = this.refs.em.value();
    let passw = this.refs.p1.value();
    Meteor.loginWithPassword(email,passw,(err)=>{
      if(err){

        if(err.reason == "Incorrect password") this.setState({pValid:err.reason, noUser: ''});
        if(err.reason == "User not found") this.setState({noUser: err.reason,pValid:''});
        if(email.length < 1) this.setState({noUser:'Field is empty ',pValid:''});
      }else{
        this.props.history.push('/');
      }
    });
  }

  render(){
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
                    <MTextField ref="em" id="email"     error={this.state.noUser} label="Email Address *"/>
                    <MTextField ref="p1" id="pass1"     error={this.state.pValid} type="password" label="Password *"/>
                  </div>
                  <button id="but" ref="butt" className="btn-flat pale-teal no-uppercase" onClick={this.login}>Log In</button>
                  <br/>
                  <br/>
                  <Link to="/register">Don't have an account? Click here to register</Link>
                  <br/>
                  <br/>
                  <Link to="/forgot">Forget your password?</Link>
                </form>
                </div>

              </div>
            </div>
            <div className="push"></div>
          </div>

            <Footer/>


      </div>

    )
  }
}
