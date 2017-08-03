import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { render } from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import DefaultPage from './Pages/DefaultPage';
import SignIn from './Pages/SignIn';

class App extends Component {

    render(){
        return(
            <BrowserRouter>
                <Route render={({location})=>(
                    <CSSTransitionGroup
                        transitionName="page"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
                        <Switch location={location} key={location.pathname}>
                            <Route exact path="/" component={DefaultPage}/>
                            <Route exact path="/login" component={SignIn}/>

                        </Switch>
                    </CSSTransitionGroup>
                )}/>
            </BrowserRouter>
        );
    }
}

Meteor.startup(() => {
    render(<App/>, document.getElementById('render-target'));
});
