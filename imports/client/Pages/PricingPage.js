import React from 'react';
import { Link } from 'react-router-dom';

export default PricingPage = ()=> {
    return (
        <div>
          <div className="container">
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
                      <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
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
                      <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
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
                      <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
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
                      <a className="waves-effect waves-teal btn-flat teal">Sign Up</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
