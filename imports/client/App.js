
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { render } from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import LoggedOutNotFound from './Pages/NotFound';
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Forgot from './Pages/Forgot';
import Faq from './Pages/FaqPage';
import ResetPassword from './Pages/ResetPassword';
import MSpinner from './Pages/Shared/MSpinner';



class Application extends Component {
    render(){
        let spinner  = (
            <div style={{display:"flex", alignItems:'center',justifyContent:'center',height: '100vh',width: '100vw'}}>
                <MSpinner/>
            </div>
        );
        let page = this.props.loggingIn && !!this.props.userId ? spinner : this.props.user ?  (
            <Route path="/" component={Dashboard}/>
        ) : (
            <Route render={({location})=>(
                <CSSTransitionGroup
                    transitionName="page"
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    <Switch location={location} key={location.pathname}>
                        <Route exact path="/" component={LandingPage}/>
                        <Route exact path="/login" component={SignIn}/>
                        <Route exact path="/register" component={SignUp}/>
                        <Route exact path="/questions" component={Faq} />
                        <Route exact path="/forgot" component={Forgot}/>
                        <Route exact path="/reset/:value" component={ResetPassword}/>
                        <Route path="*" component={LoggedOutNotFound}/>
                    </Switch>
                </CSSTransitionGroup>
            )}/>
        );
        return(
            <BrowserRouter>
                {page}
            </BrowserRouter>
        );
    }
    componentDidMount(){
    }
}
const App = withTracker(props => {
    return {
        loggingIn: Meteor.loggingIn(),
        userId: Meteor.userId(),
        user: Meteor.user()
    }
}) (Application);

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});
