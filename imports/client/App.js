import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { render } from 'react-dom';
import DefaultPage from './Pages/DefaultPage';
import Header from './Pages/Shared/Header';
import Footer from './Pages/Shared/Footer';
import SignIn from './Pages/SignIn';
class App extends Component {

    render(){
        
        return(
            <BrowserRouter>
                <div id="daddy">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={DefaultPage}/> 
                        <Route exact path="/login" component={SignIn}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});
