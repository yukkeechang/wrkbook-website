import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { createBrowserHistory } from 'history';
import NotFound from './Components/Shared/404';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import DefaultPage from './Pages/DefaultPage';
import Header from './Components/Shared/Header';
const history = module.exports = createBrowserHistory();

class App extends Component {

    render(){
        
        return(
            <Router history={history}>
                <div >
                    <Switch>
                        <Route exact path="/" component={DefaultPage}/>                        
                        <Route path="/register/:value" component={SignUp}/>
                        <Route path='/login' component={SignIn}/>

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
