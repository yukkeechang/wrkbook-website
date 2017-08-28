import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Header from './Shared/Header';
import { CSSTransitionGroup } from 'react-transition-group';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Profile from './Dashboard/Profile/Profile';
import Jobs from './Dashboard/Jobs';
import Home from './Dashboard/Home/Home';

// For testing
import ConJobPostComponent from './Dashboard/Jobs/ConJobPostComponent';
import DummyEvents from './Dashboard/DummyEvents';
import ConJobPosts from './Dashboard/Jobs/ConJobPosts'
import CreateJobs from './Dashboard/Jobs/CreateJobs';
import JobPostAdmit from './Dashboard/Jobs/EmpJobPostAdmit';
import EmpJobPostComponent from './Dashboard/Jobs/EmpJobPostComponent';
import EmployeeJobPosts from './Dashboard/Jobs/EmpJobPosts';
import employeeComponent from './Dashboard/Jobs/EmployeeComponent';
import ContractorEdit from './Dashboard/Profile/Edit/ContractorEdit';
import ProfessionalEdit from './Dashboard/Profile/Edit/ProfessionalEdit';
//import ContractorJobPosts from './Dashboard/Jobs/ConJobPosts';
import Edit from './Dashboard/Profile/Edit/Edit';
class Dash extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Header full={false}/>
                <div style={{height:'64px'}}></div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/jobs" component={CreateJobs}/>
                <Route exact path="/profile" component={Profile}/>

                <Route exact path="/createjob" component={CreateJobs}/>
                <Route exact path="/events" component={DummyEvents}/>
                <Route exact path="/conjobpostcomponent" component={ConJobPostComponent}/>
                <Route exact path="/conjobposts" component={ConJobPosts}/>
                <Route exact path="/employeejobposts" component={EmployeeJobPosts}/>
                <Route exact path="/employeejobpostsadmit" component={JobPostAdmit}/>
                <Route exact path="/employeecomponent" component={employeeComponent}/>
                <Route exact path="/editprofessional" component={ProfessionalEdit}/>
                <Route exact path="/editcontractor" component={ContractorEdit}/>
                <Route exact path="/edit" component={Edit}/>
                    {/*
                        Add in whatever pages' route
                        you need as above and it should
                        render next to the sidebar and
                        under the header in the div.
                        Same process with adding links to
                        said pages on the sidebar, just copy the
                        li element with zIndex 4000 and add the necessary link
                        If there are any issues let me know I'll help figure
                        it out as soon as i can ~ :)
                        I'll be adding transitions to these routes when i figure it out
                    */}

            </div>
        )
    }
}
export default Dashboard = createContainer(({ params }) => {
    return {
        user: Meteor.user(),
    };
}, Dash);
