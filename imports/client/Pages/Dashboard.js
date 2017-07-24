import React , { Component } from 'react';
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
    }
}
export default Dashboard = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Dash);
