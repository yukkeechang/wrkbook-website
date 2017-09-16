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
      showEmail: false
    }
  }
  resetPasswordEmail(e){
    console.log(e);
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
        <div>
          <Header/>
          <div style={{height:'64px'}}></div>
            <div style={{zIndex:'-1'}} className="container">
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
                    <a className="btn-flat teal lighten-4" onClick={this.resetPasswordEmail.bind(this)} style={{color: '#555',textTransform: 'none'}} type="submit">Reset Password Email</a>
                    }
                  </form>
                </div>

              </div>
            </div>
          <Footer/>
        </div>
    );
  }
}
