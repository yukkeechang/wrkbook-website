import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
export default class  PricingPage extends React.Component{
  constructor(props) {
    super(props)
  }
  pro(){
      window.localStorage.isPro = true;
  }
  con(){
      window.localStorage.isPro = false;
  }
  render(){
    return (

        <div id="price" style={{paddingBottom:'10px',background: 'linear-gradient(#FFFFFF, #A9A9A9)'}} >

          <div className="container" >
            <div className="card grey darken-3">
              <div className="card-content">
                <div className="row hide-on-small-only">
                  <div className="col s6">
                    <h3 style={{color:'white', textAlign:'center'}}>Business</h3>
                    <div className="card">
                      <div className="card-content center-align">
                        <p className="flow-text genText">
                          <b>Sign Up Free</b><br/>
                        </p>
                        <hr/>
                        <h6>
                          - Create a Profile<br/>
                          - Post job<br/>
                          - See matches
                        </h6>
                      </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                      <Link to="/register" onClick={this.con} >
                        <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
                      </Link>
                    </div>
                    <div className="card">
                      <div className="card-content center-align">
                        <p className="flow-text genText">
                          <b>Early release fee</b><br/>
                        </p>
                        <hr/>
                        <h6>
                          $100.00 monthly (Cancel anytime with ease)<br/>
                          - Create a profile<br/>
                          - Post job<br/>
                          - See matches<br/>
                          - Unlimited monthly hires
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col s6">
                    <h3 style={{color:'white', textAlign:'center'}}>Professionals</h3>
                    <div className="card">
                      <div className="card-content center-align">
                        <p className="flow-text genText">
                          <b>Always Free</b><br/>
                        </p>
                        <hr/>
                        <h6>
                          - Create a profile/resume<br/>
                          - Get matched with jobs<br/>
                          - Get hired
                        </h6>
                      </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                          <Link to="/register" onClick={this.pro} >
                            <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
                          </Link>
                    </div>
                  </div>
                </div>
                <div className="col hide-on-med-and-up">
                  <div className="col s6">
                    <h3 style={{color:'white', textAlign:'center'}}>Business</h3>
                    <div className="card">
                      <div className="card-content center-align">
                        <p className="flow-text genText">
                          <b>Sign Up Free</b><br/>
                        </p>
                        <hr/>
                        <h6>
                          - Create a Profile<br/>
                          - Post job<br/>
                          - See matches
                        </h6>
                      </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                      <Link to="/register" onClick={this.con} >
                        <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
                      </Link>
                    </div>
                    <div className="card">
                      <div className="card-content center-align">
                        <p className="flow-text genText">
                          <b>Early release fee</b><br/>
                        </p>
                        <hr/>
                        <h6>
                          $100.00 monthly (Cancel anytime with ease)<br/>
                          - Create a profile<br/>
                          - Post job<br/>
                          - See matches<br/>
                          - Unlimited monthly hires
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col s6">
                    <h3 style={{color:'white', textAlign:'center'}}>Professionals</h3>
                    <div className="card">
                      <div className="card-content center-align">
                        <p className="flow-text genText">
                          <b>Always Free</b><br/>
                        </p>
                        <hr/>
                        <h6>
                          - Create a profile/resume<br/>
                          - Get matched with jobs<br/>
                          - Get hired
                        </h6>
                      </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                          <Link to="/register" onClick={this.pro} >
                            <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
                          </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
