import React from 'react';
import { Link } from 'react-router-dom'
import RaisedButton  from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
export default class Home extends React.Component{

    render(){
        return(
          <div>
          <div id="hero">
            <h1>Get matched today,<br/>start working tomorrow</h1>
            <MuiThemeProvider>
              <div>
                <Link to='/register/Contractor'><RaisedButton label="Contractor"/></Link>
                <span id="spacer">  OR  </span>
                <Link to='/register/Professional'><RaisedButton label="Professional"/></Link>
              </div>
            </MuiThemeProvider>
          </div>
            <div id="info">
        				<div>
        					<h1>About</h1>
        					<h3>
        						WrkBook is a mobile app and web platform to connect the <br/>
        						supply of workers with the demand of jobs with one simple <br/>
        						click! We open up doors to connections that otherwise would <br/>
        						never happen. Our mission is to keep everyone happy, helping <br/>
        						contractors find professionals stress-free and helping <br/>
        						profesionals to never spend another day home!
        					</h3>
        				</div>
        				<div>
        					<h1>How it Works</h1>
        					<h3 id="employee">Employee</h3>
        					<div id="employeecontent">
        						<div id="flow">
        							<img src="images/profile.png" height="200" width="200"/>
        							<div id="inside">
        								<h2>Make a profile</h2>
        								<h5>List down your skills and certifications<br/>
        									such as OSHA or trade school
        								</h5>
        							</div>
        						</div>
        						<div id="flow">
        							<div id="inside">
        								<h2>Set your schedule</h2>
        								<h5>Let contractors know when youre availible</h5>
        							</div>
        							<img src="images/calendar.png" height="200" width="200"/>
        						</div>
        						<div id="flow">
        							<img src="images/tools.png" height="200" width="200"/>
        							<div id="inside">
        								<h2>Get hired</h2>
        								<h5>Get matched to a contractor based<br/>
        									on your skills and availibility
        								</h5>
        							</div>
        						</div>
        						<div id="flow">
        							<div id="inside">
        								<h2>Get rated</h2>
        								<h5>Get rated and reviewed froma contractor<br/>
        									for a job well done!
        								</h5>
        							</div>
        							<img src="images/rate.png" height="200" width="200"/>
        						</div>
        					</div>
        					<h3 id="employer">Employer</h3>
        					<div id="employercontent">
        						<div id="flow">
        							<img src="images/jobpost.png" height="200" width="200"/>
        							<div id="inside">
        								<h2>Make a Job Post</h2>
        								<h5>List down the dates,<br/>require skills, and location</h5>
        							</div>
        						</div>
        						<div id="flow">
        							<div id="inside">
        								<h2>Find Workers</h2>
        								<h5>Get workers matched to your job<br/>
        									post based on your qualifications
        								</h5>
        							</div>
        							<img src="images/worker.png" height="200" width="200"/>
        						</div>
        						<div id="flow">
        							<img src="images/profile.png" height="200" width="200"/>
        							<div id="inside">
        								<h2>View their profile</h2>
        								<h5>Now you choose your<br/>
        									professionals from their ratings, reviews,<br/>
        									qualifications and/or background checks
        								</h5>
        							</div>
        						</div>
        						<div id="flow">
        							<div id="inside">
        								<h2>Leave a reiview</h2>
        								<h5>Leave a rating and a review for <br/>
        									the employee for a job well done!
        								</h5>
        							</div>
        							<img src="images/rate.png" height="200" width="200"/>
        						</div>
        						<div id="flow">
        							<img src="images/network.png" height="200" width="200"/>
        							<div id="inside">
        								<h2>Network</h2>
        								<h5>Continously meet and work with professionals</h5>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div>
        					<h1>Contact Us</h1>
        					<div id="contact">
        						<div id="contacticons">
        							<img src="images/email.png" height="50" width="50"/>
        							<a href="info@wrkbook.com">Email</a>
        						</div>
        						<div id="contacticons">
        							<img src="images/facebook.png" height="50" width="50"/>
        							<a href="https://www.facebook.com/wrkbookapp/">Visit</a>
        						</div>
        						<div id="contacticons">
        							<img src="images/instagram.png" height="50" width="50"/>
        							<a href="https://www.instagram.com/wrkbook/?hl=en">Follow</a>
        						</div>
        					</div>
        				</div>
        		</div>
          </div>
        )
    }
}
