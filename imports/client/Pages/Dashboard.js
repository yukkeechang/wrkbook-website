import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import Header from './Shared/Header';
import { CSSTransitionGroup } from 'react-transition-group';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Profile from './Dashboard/Profile/Profile';
import OtherUser from './Dashboard/Profile/OtherUser'
import Jobs from './Dashboard/Jobs/Jobs';
import Home from './Dashboard/Home/Home';
import NotFound from '../Pages/NotFound';
import Payment from './Dashboard/Settings/Payment';
import ProCompleted from './Dashboard/Jobs/Completed/ProCompleted';


import Edit from './Dashboard/Profile/Edit/Edit';
import Settings from './Dashboard/Settings/Settings';



// For testing
import ConJobPostComponent from './Dashboard/Jobs/ConJobPostComponent';
import DummyEvents from './Dashboard/DummyEvents';
import ConJobPosts from './Dashboard/Jobs/ConJobPosts'
import CreateJobs from './Dashboard/Jobs/CreateJobs';
import EditJobs from './Dashboard/EditJobs';
import JobPostAdmit from './Dashboard/Jobs/EmpJobPostAdmit';
import EmpJobPostComponent from './Dashboard/Jobs/EmpJobPostComponent';
import EmpJobPosts from './Dashboard/Jobs/EmpJobPosts';
import employeeComponent from './Dashboard/Jobs/EmployeeComponent';
import References from './Dashboard/References'
import ConProfile from './Dashboard/Profile/ConProfile/ConProfile';
import ProProfile from './Dashboard/Profile/ProProfile/ProProfile';

//import ContractorJobPosts from './Dashboard/Jobs/ConJobPosts';

class Dash extends Component{
    constructor(props){
        super(props);
        this.state= {
            thisDatu: new Date()
        }
    }
    setDate(nice){
        console.log(nice);
        this.setState({
            thisDatu: nice
        })
    }
    render(){
        return(
            <div>
                <Header full={false}/>
                <div style={{height:'64px'}}></div>
                <Switch>
                <Route exact path="/" render={()=><Home date={this.state.thisDatu} changeDate={this.setDate.bind(this)}/>}/>
                <Route exact path="/jobs" component={Jobs}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/user/:value" component={OtherUser}/>

                <Route exact path="/references" component={References}/>
                <Route exact path="/createjob" component={CreateJobs}/>
                <Route exact path="/editjob/:value" component={EditJobs}/>
                <Route exact path="/events" component={DummyEvents}/>
                <Route exact path="/conjobpostcomponent" component={ConJobPostComponent}/>
                <Route exact path="/conjobposts" component={ConJobPosts}/>
                <Route exact path="/empjobposts" component={EmpJobPosts}/>
                <Route exact path="/employeejobpostsadmit" component={JobPostAdmit}/>
                <Route exact path="/employeecomponent" component={employeeComponent}/>
                <Route exact path="/edit" component={Edit}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/proprofile" component={Edit}/>
                <Route path="/conprofile" component={Edit}/>
                <Route path="/procompleted" component={ProCompleted}/> 

                <Route path="*" component={NotFound}/>
                </Switch>


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
