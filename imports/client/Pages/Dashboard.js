import React , { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../Components/Shared/Header';
import Profile from '../Components/Dashboard/Profile.js';

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
                    <div id="howTo" className="fullWidth">
                      <div className="container">
                        <Tabs
                            style={{width:'100%'}}
                            value={this.state.value}
                            onChange={this.handleChange}>
                            <Tab label="Profile" value="a">
                                <Profile/>
                            </Tab>
                            <Tab label="Job Listings" value="b">
                                <div>
                                    <h2>Controllable Tab B</h2> //put component here
                                </div>
                            </Tab>
                            <Tab label="Settings" value="c">
                                <div>
                                    <h2>Controllable Tab C</h2> //put component here
                                </div>
                            </Tab>
                        </Tabs>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
export default Dashboard = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Dash);
