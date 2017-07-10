import React , { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import history from './history';
import NavigationBar from './Components/navigationBar';
import Home from './Pages/home';
import Register from './Pages/register';
import Login from './Pages/login'
import NotFound from './Pages/notFound';
import Profile from './Pages/profile';
import stepTwoContainer from './Pages/stepTwo';
import DummyContainer from './Pages/dummy';

class App extends Component {

    render(){
        return(
            <Router history={history}>
                <div id="container">
                    <NavigationBar />
                    <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/register/:value" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/stepTwo" component={stepTwoContainer}/>
                    <Route path="/dummy" component={DummyContainer}/>
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
