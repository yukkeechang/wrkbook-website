import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Header from './Shared/Header';
import { CSSTransitionGroup } from 'react-transition-group';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';

import Profile from './Dashboard/Profile/CurrentUserProfile';
import OtherUser from './Dashboard/Profile/OtherUserProfile'

import NotFound from '../Pages/NotFound';
import Payment from './Dashboard/Settings/Payment';

import Completed from './Dashboard/Jobs/Completed/Completed';
import Upcoming from './Dashboard/Jobs/Upcoming/Upcoming';
import Current from './Dashboard/Jobs/Current/Current';
import DetailView from './Dashboard/Jobs/DetailJobView';
import DeletedView from './Dashboard/Jobs/DeletedJob';
//JOB REFACTOR
import One from './Dashboard/Jobs/CreateJob/One';
import Two from './Dashboard/Jobs/CreateJob/Two';
import CreateJob from './Dashboard/Jobs/CreateJob';

import Edit from './Dashboard/Profile/Edit/Edit';
import Settings from './Dashboard/Settings/Settings';
import JobChat from './Dashboard/Messages/JobChat/JobChat';



// For testing

import CreateJobs from './Dashboard/Jobs/CreateJobs';
import EditJobs from './Dashboard/Jobs/Upcoming/EditJobsOutter';
import AppliedJobs from './Dashboard/Jobs/EmployeeAppliedJobs';

import EmpJobPosts from './Dashboard/Jobs/EmployeeJobMatches';

import EditReferences from './Dashboard/References/EditReferences'
import ProCompleted from './Dashboard/Jobs/Completed/ProCompleted';
import ConCompleted from './Dashboard/Jobs/Completed/ConCompleted';
import CreateReviewForPro from './Dashboard/Reviews/CreateReviewForPro.js';
import CreateReviewForCon from './Dashboard/Reviews/CreateReviewForCon.js';

import ProfileRefactor from './Dashboard/ProfileRefactor/CurrentUserProfile';


//import ContractorJobPosts from './Dashboard/Jobs/ConJobPosts';

import MessageDummy from './Dashboard/Messages/Messages.js'

import NotificationDummy from './Dashboard/Notifications/Notifications.js'


class Dash extends Component{
    constructor(props){
        super(props);
        this.state= {
            thisDatu: new Date() //thisDatu is the new date
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
                <div style={{height:'100px'}}></div>
                <Switch>
                <Route exact path="/" render={()=> (<Upcoming/> )}/>
                <Route exact path="/jobmatches" component={EmpJobPosts}/>
                <Route  path="/profile" component={Profile}/>
                <Route  path="/profilerefactor" component={ProfileRefactor}/>
                <Route  path="/user/:value" component={OtherUser}/>

                <Route exact path="/edit+references" component={EditReferences}/>
                <Route exact path="/createjob" component={CreateJobs}/>
                <Route exact path="/createjobone" component={One}/>
                <Route exact path="/createjobrefactor" component={CreateJob}/>



                <Route exact path="/editjob/:value" component={EditJobs}/>
                <Route exact path="/job/:value" component={DetailView}/>
                <Route exact path="/deleted-job/:value" component={DeletedView}/>
                <Route exact path="/message/:value" component={MessageDummy}/>
                <Route exact path="/messages" component={MessageDummy}/>
                <Route exact path="/notifications" component={NotificationDummy}/>
                <Route exact path="/applied" component={AppliedJobs} />

                <Route exact path="/edit" component={Edit}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/proprofile" component={Edit}/>
                <Route path="/conprofile" component={Edit}/>

                <Route path="/completed" component={Completed}/>
                <Route path="/current" component={Current}/>
                <Route path="/upcoming" component={Upcoming}/>
                <Route path="/procompleted" component={ProCompleted}/>
                <Route path="/concompleted" component={ConCompleted}/>



                <Route path="/concompleted" component={ConCompleted}/>
                <Route path="/empcompleted" component={ProCompleted}/>
                <Route path="/createreviewforprofessional" component={CreateReviewForPro}/>
                <Route path="/createreviewforcontractor" component={CreateReviewForCon}/>
                <Route path="/job-chat/:value" component={JobChat}/>


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
export default Dashboard = withTracker(params  => {
    return {
        user: Meteor.user(),
    };
})(Dash);

//Route if going to home page
//<Route exact path="/" render={()=><Home date={this.state.thisDatu} changeDate={this.setDate.bind(this)}/>}/>
