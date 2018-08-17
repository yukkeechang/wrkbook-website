import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import { Link } from 'react-router-dom';
import MTextField from './Shared/MTextField';

export default class Forgot extends Component{
  constructor(props){
    super(props);
    this.state = {
      noUser: '',
      showEmail: false,
      badToken: false
    }
  }
  componentDidMount(){

  }
  resetPasswordEmail=(e)=>{
    e.preventDefault();
    let email = this.refs.em.value();
    const options ={
      email : email
    };
    Accounts.forgotPassword(options,(err)=>{
      if(err){
        if(err.reason == "User not found") this.setState({noUser: 'Did not find user'});
        if(err.reason == "Must pass options.email") this.setState({noUser: 'The field is empty'});
      }else{
        this.setState({
          showEmail: true
        });
      }
    });
  }
  render(){
    return(
        <div className="fill-height">
          <Header/>
          <div className="header-nav-bar-offset"></div>
            <div className="wrapper">
              <div  className="container">
                <div className="card">
                  <div className="row card-content">
                    <form className="col s12">
                      <br/>
                      { !this.state.showEmail ?
                        <div className="row">
                          <MTextField ref="em" id="email"     error={this.state.noUser} label="Email Address *"/>
                        </div>
                        :
                        <h1> Check Your Email</h1>
                      }

                      {
                        !this.state.showEmail &&
                      <a className="btn-flat pale-teal no-uppercase" onClick={this.resetPasswordEmail} >Reset Password Email</a>
                      }
                    </form>
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
