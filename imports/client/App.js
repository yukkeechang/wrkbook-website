import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { render } from 'react-dom';
import DefaultPage from './Pages/DefaultPage';

class App extends Component {

    render(){
        
        return(
            <BrowserRouter>
                <div >
                    <Switch>
                        <Route exact path="/" component={DefaultPage}/>                        
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});
