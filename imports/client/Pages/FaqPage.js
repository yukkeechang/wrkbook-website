import React from 'react';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
export default class FaqPage  extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
        <div>
        <Header/>
        <div id="herofaq">
        <div style={{height:'64px'}}></div>
            <div className="container">
              <div className="card blue-grey darken-3">
                <div className="card-content">
                  <div className="col" style={{color:'white'}}>
                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="center-align flow-text">Frequently Asked Questions</h4>
                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">What is WrkBook?</h4>
                    <h6 className="flow-text">WrkBook is a website where construction companies and constructions laborers can connect, get hired, and rate each other. We are expanding the connections from just “a who you know”, to find anyone in the construction industry to work for or hire.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">How do I sign up?</h4>
                    <h6 className="flow-text">If you are looking for work go to the homepage by clicking here, and click the button “Click here to apply to work”.
                    If you are looking to hire someone go to homepage by clicking here, and click ghe button “Click here to post a job”.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">What happens after I sign up?</h4>
                    <h6 className="flow-text">As someone looking for a job, after you sign up you will be able to create a profile and resume. After you complete your profile you will be instantly matched to jobs based on your experience.
                    If you are looking to hire someone, after you sign up you will create a profile about your company, then you can make job posting and will be instantly matched with qualified professionals based on you job post. You will then be able to get in touch with them and hire right away.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">How do I get jobs?</h4>
                    <h6 className="flow-text">Sign up to WrkBook, create a profile and resume and jobs will start coming to you instantly based on your experience. The more you add to your profile the higher the chances of you getting matched to a job. Its that easy, you choose what job you want.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">Who pays me?</h4>
                    <h6 className="flow-text">We are not a staffing agency or employment agency. So when you sign up for WrkBook, you are not an employee of WrkBook so we do not take any % of your pay. The company that hires you will be the one paying you.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">Who employs me when I find work through WrkBook?</h4>
                    <h6 className="flow-text">WrkBook is not your employer. We simply match companies to qualified professionals. Once you are matched to companies, they will be the one hiring you.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">Why does WrkBook ask me so many questions when I sign up?</h4>
                    <h6 className="flow-text">We want to make sure we match you to the perfect employer, while matching the employers to their specific criterias.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">Is WrkBook a staffing agency or employment agency?</h4>
                    <h6 className="flow-text">No WrkBook is not a staffing agency or an employment agency. We simply match businesses to workers.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">How much do jobs pay?</h4>
                    <h6 className="flow-text">Pay varies from job to job. You will be able to see the job pay when a job appears on your matches, and choose to accept it or not.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">How do I get paid?</h4>
                    <h6 className="flow-text">The method of payment varies from job to job. WrkBook does not pay, the businesses with job opportunities pay workers directly. Please contact the business with the job opportunity directly for more information about a specific job.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">Can I change the types of jobs that I receive?</h4>
                    <h6 className="flow-text">Yes. You can select the type of professional you are and you will be matched based on that criteria.</h6>

                    <h4 style={{fontWeight:'bold', fontSize:'200%'}} className="flow-text">Have more questions?</h4>
                    <h6 className="flow-text">E-mail us at <a style={{color:'#26a69a'}}href="mailto:info@wrkbook.com?subject=[Information Inquiry]">info@wrkbook.com</a> or call us at 914-719-6422</h6>
                    <h4 className="center-align flow-text">Ready to work?</h4>
                    <div className="center-align">
                      <a className="waves-effect waves-teal btn">Sign Up</a>
                    </div>
                    <h4 className="center-align flow-text">Ready to hire?</h4>
                    <div className="center-align">
                      <a className="waves-effect waves-teal btn">Sign Up</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <Footer/>
  </div>
        </div>


    )
  }
}
