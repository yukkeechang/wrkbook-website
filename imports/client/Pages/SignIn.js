import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import { Link } from 'react-router-dom';
import MTextField from './Shared/MTextField';

export default class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
      noUser: '',
      pValid: ''
    };

  }

  login(e){
    e.preventDefault();

    console.log(e);
    let email = this.refs.em.value();
    let passw = this.refs.p1.value();
    Meteor.loginWithPassword(email,passw,(err)=>{
      if(err){
        if(err.reason == "Incorrect password") this.setState({pValid:err.reason, noUser: ''});
        if(err.reason == "User not found") this.setState({noUser: err.reason,pValid:''});
      }else{
        this.props.history.push('/');
      }
    });
     return false;
  }
  render(){
    return(
      <div>
        <Header/>
        <div style={{height:'64px'}}></div>
          <div style={{zIndex:'-1'}} className="container">
            <div className="card">
              <div className="row card-content">
                <div className="col s12">
                  <div className="row">
                    <MTextField ref="em" id="email"     error={this.state.noUser} label="Email Address *"/>
                    <MTextField ref="p1" id="pass1"     error={this.state.pValid} type="password" label="Password *"/>
                  </div>
                  <a className="btn-flat teal lighten-4" ref="button" onClick={(e) => {this.login(e); }} style={{color: '#555',textTransform: 'none'}} type="submit">Log In</a>
                  <br/><br/><Link to="/register" >Don't have an account? Click here to register</Link>
                  <br/><br/><Link to="/forgot"   >Forgot Password?</Link>
                </div>
              </div>

            </div>
          </div>
        <Footer/>
      </div>

    )
  }
}
