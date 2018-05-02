import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
import About from './AboutCard/AboutPage';
import ContactInfo from './GeneralCard/GeneralComponents/ContactInfo';
import Certificates from './CertificationCard/Certificates';
import ReviewsCurrent from './ReviewCard/ReviewsForCurrent';
import ReactDOM from 'react-dom';
import GeneralInfo from './GeneralCard/GeneralInfo';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import NotFound from '../../../Pages/NotFound';
import { withTracker } from 'meteor/react-meteor-data';

class ProFileDash extends React.Component {
constructor(props) {
  super(props);
  this.state={
      routeName:'',
  }


}
componentDidMount(){
  console.log(this.refs.things);
  let switchRouter =this.refs.things.context.router.route.location.pathname;
  this.setState({routeName:switchRouter});
  console.log(switchRouter);
}
things(){
  console.log("hahah");
}

render() {
    let url = this.props.match.url;
    let Contact = ()=>{
      return(
          <ContactInfo user={this.props.user} test={"hi"} />
      )
    };
    let AboutPage = () =>{
      return(
        <About user={this.props.user}/>
      )
    };
    let CertificationPage =()=>{
      return(
        <Certificates user={this.props.user} isUser={true}/>
      );
    }
    let ReviewsPage=()=>{
      return(
        <ReviewsCurrent isPro={ Roles.userIsInRole(this.props.user._id,"PRO")} userId={this.props.user._id} />
      );
    }

    console.log(url);

  return (
    <div>
      <Header  isUser={true} user={this.props.user} url={this.state.routeName}/>
      <div className="row"></div>
      <div className="container">
        <div className="row">
          <div className="col m4 s12">
            <GeneralInfo user={this.props.user} isUser={true} Url={this.props.match.url} />
          </div>

            <div className="col m8 s12">
                <Switch onChange={this.things.bind(this)} ref="things">
                  <Route exact path={url+"/"} component={AboutPage}/>
                    <Route exact path={url+"/about"} component={AboutPage}/>

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
export default ProfileCurrent = withTracker(params  => {
    return {
        user: Meteor.user(),
    };
})(ProFileDash);
