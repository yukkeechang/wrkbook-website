import React , { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../../Components/Shared/Header';
import Profile from './Profile.js';
import Settings from './Settings.js';
import JobPostsEmployee from '../Dashboard/Jobs/JobPost';
import JobPostsEmployeeAdmit from '../Dashboard/Jobs/JobPostAdmit'
export default class EmpDash extends Component {
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
                <div className="fullWidth" style={{height:'64px',backgroundColor:'black'}}></div>

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
                                    <JobPostsEmployee/>
                                </div>
                            </Tab>
                            <Tab label="Your Jobs" value="c">
                                <div>
                                    <JobPostsEmployeeAdmit/>
                                </div>
                            </Tab>
                            <Tab label="Settings" value="d">
                                <div>
                                    <Settings/>
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
