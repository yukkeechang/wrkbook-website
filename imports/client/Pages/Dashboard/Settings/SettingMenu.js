import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../../Shared/Footer';


export default class  SettingMenu extends Component{

  constructor(props){
      super(props);
      this.state = {

      }
  }
  componentDidMount(){

  }
  render(){
    let url = 'settings';
      return(
              <div style={{height:'100vmin'}} >
              <div className="wrapper">

              <div className="container" >
                <div className="row" >
                  <div className="col s12 m6" >
                     <ul className="collection">
                     <Link to={url + '/password'} >
                      <li className="collection-item">
                        <i className="large material-icons">security</i>
                        Change Email and Password
                      </li>
                      </Link>
                    </ul>
                  </div>

                  <div className="col s12 m6" >
                    <ul className="collection">
                    <Link to={url + '/notifications'} >
                     <li className="collection-item">
                       <i className="large material-icons">add_alert</i>
                       Notification Setting
                     </li>
                     </Link>
                   </ul>
                  </div>
                </div>

                <div className="row" >
                  <div className="col s12 m6" >
                    <ul className="collection">
                      <Link to={url + '/subscription'} >
                     <li className="collection-item">

                         <i className="large material-icons">card_membership</i>
                         Subscription

                     </li>
                     </Link>
                   </ul>
                  </div>

                  <div className="col s12 m6" >
                    <ul className="collection">
                      <Link to={url + '/payment'} >
                     <li className="collection-item">
                       <i className="large material-icons">attach_money</i>
                       Payments
                     </li>
                     </Link>
                   </ul>
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
