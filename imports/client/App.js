import React , { Component } from 'react';
import { render } from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import history from './history';
import NavigationBarContainer from './Components/navigationBar';
import Home from './Pages/home';
import Register from './Pages/register';
import Login from './Pages/login'
import NotFound from './Pages/notFound';
import Employeesu2 from './Components/employeesu2';
import Employeesu3 from './Components/employeesu3';
import Employeesu4 from './Components/employeesu4';




class App extends Component {

    render(){
        return(
            <Router history={history}>
                <div id="container">
                    <NavigationBarContainer />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/register/:value" component={Register}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/em_singup_1" component={Employeesu2}/>
                        <Route path="/em_singup_2" component={Employeesu3}/>
                        <Route path="/em_singup_3" component={Employeesu4}/>
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
