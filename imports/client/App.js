import React , { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import history from './history';
import NavigationBarContainer from './Components/navigationbar';
import Home from './Pages/home';
import Register from './Pages/register';
import Login from './Pages/login'
import NotFound from './Pages/notfound';
import ProfileContainer from './Pages/profile';
import StepTwoContainer from './Pages/steptwo';
import RequireComponent from './Components/Jobpost/requirecomponent'
import ProfComponent from './Components/Jobpost/profcomponent'
import DescriptionComponent from './Components/Jobpost/descriptioncomponent'
import DateComponent from './Components/Jobpost/datecomponent'
import PayComponent from './Components/Jobpost/paycomponent'




class App extends Component {

    render(){
        return(
            <Router history={history}>
                <div id="container">
                    <NavigationBarContainer history={this.props.history}/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/register/:value" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/steptwo" component={StepTwoContainer}/>
                        <Route path="/profile" component={ProfileContainer}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});
