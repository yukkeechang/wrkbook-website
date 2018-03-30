import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import About from './AboutCard/AboutPage';
import Contact from './ContactCard/ContactPage';
import Certificates from './CertificationCard/Certificates';
import ReviewsCurrent from './ReviewCard/ReviewsForOther';
import ReactDOM from 'react-dom';
import GeneralInfo from './GeneralCard/GeneralInfo';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import NotFound from '../../../Pages/NotFound';
import { withTracker } from 'meteor/react-meteor-data';

export default class OtherUserRoute extends React.Component {
constructor(props) {
  super(props);
  this.state={
      routeName:'',
      isPro: false
  }
  //console.log(this.props);


}
componentDidMount(){
  //console.log(this.refs);
  //console.log(this.props.props);
  let switchRouter =this.refs.halp.context.router.route.location.pathname;
  this.setState({routeName:switchRouter});
  //console.log(switchRouter);
}


render() {


    let url = this.props.props.match.url;
    console.log(url);
    let ContactPage = ()=>{
      return(
          <Contact user={this.props.user}  />
      )
    };
    let AboutPage = () =>{
      return(
        <About user={this.props.user}/>
      )
    };
    let CertificationPage =()=>{
      return(
        <Certificates user={this.props.user} isUser={false}/>
      );
    }
    let ReviewsPage=()=>{
      return(
        <ReviewsCurrent userId={this.props.user._id} />
      );
    }


      return (

        <div>
          <Header   isUser={false} user={this.props.user} url={this.state.routeName}/>
          <div className="row"></div>
          <div className="container">
            <div className="row">
              <div className="col m4 s12">
                <GeneralInfo user={this.props.user} isUser={false} Url={this.props.props.match.url} />
              </div>

                <div className="col m8 s12">
                    <Switch  ref="halp">
                      <Route exact path={url} component={AboutPage}/>
                        <Route exact path={url+"/about"} component={AboutPage}/>
                        <Route exact path={url+"/contact" } component={ContactPage}/>
                        {
                          Roles.userIsInRole(this.props.user._id,"PRO") ?
                              <Route exact path={url+"/certificates"} component={CertificationPage}/>
                        :
                              null
                      }
                        <Route exact path={url+"/reviews"} component={ReviewsPage}/>

                    </Switch>
                </div>






            </div>
          </div>



        </div>

      )



 }
}
