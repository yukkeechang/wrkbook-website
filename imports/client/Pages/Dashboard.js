import React , { Component } from 'react';
<<<<<<< HEAD
import { createContainer } from 'meteor/react-meteor-data';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ConDash from '../Components/Dashboard/ConDash.js';
import EmpDash from '../Components/Dashboard/EmpDash.js';

class Dash extends Component {
    render(){
        if(this.props.user){
            let page = this.props.user.profile.isPro ? <EmpDash user={this.props.user}/> : <ConDash user={this.props.user}/>;
            return(page);
        }
        else{
            return(
                <MuiThemeProvider >
                    <CircularProgress/>
                </MuiThemeProvider >
            )
        }
=======
import {Tabs, Tab} from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../Components/Shared/Header';

class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };
    render(){
        return(
            <div>
                <Header/>
                <MuiThemeProvider>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <Tab label="Tab A" value="a">
                            <div>
                                <h2>Controllable Tab A</h2> //put component here
                            </div>
                        </Tab>
                        <Tab label="Tab B" value="b">
                            <div>
                                <h2>Controllable Tab B</h2> //put component here
                            </div>
                        </Tab>
                        <Tab label="Tab C" value="c">
                            <div>
                                <h2>Controllable Tab C</h2> //put component here
                            </div>
                        </Tab>
                    </Tabs>
                </MuiThemeProvider>
            </div>
        );
>>>>>>> 9989ff61143950d4be6a86f9cfd072954d048e53
    }
}
export default Dashboard = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Dash);
