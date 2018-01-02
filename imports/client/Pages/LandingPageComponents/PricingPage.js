import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
export default class  PricingPage extends React.Component{
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    console.log(this.props);
  }
  pro(){
      window.localStorage.isPro = true;
      this.props.history.push("/register");
  }
  con(){

      window.localStorage.isPro = false;
      this.props.history.push("/register");
  }
  render(){
    return (

        <div id="price" style={{paddingBottom:'10px',background: 'linear-gradient(#FFFFFF, #515151)'}} >

          <div className="container" >
            <div className="card grey darken-3">
              <div className="card-content">
                <div className="row hide-on-small-only">
                  <div   style={{borderRight:'1px solid #e0e0e0'}} className="col s6">
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

                        <a onClick={this.con.bind(this)} className="waves-effect waves-teal btn-flat teal">Sign Up</a>

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

                            <a  onClick={this.pro.bind(this)} className="waves-effect waves-teal btn-flat teal">Sign Up</a>

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

                        <a  onClick={this.con.bind(this)} className="waves-effect waves-teal btn-flat teal">Sign Up</a>

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
                  <div className="divider"> </div>
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
                      
                            <a onClick={this.pro.bind(this)} className="waves-effect waves-teal btn-flat teal">Sign Up</a>

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
