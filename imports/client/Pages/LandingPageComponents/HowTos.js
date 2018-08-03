import React from 'react';
import Step from './HowTo/Step';
import Button from '../Shared/Button';

export default class HowTo extends React.Component{
    constructor(props){
      super(props);
    }
    pro(){
        window.localStorage.isPro = true;
    }
    con(){
        window.localStorage.isPro = false;
    }
    render(){
      return(
          <div id="HowTo" className="white">
              <h4 style={{fontFamily:'avenir-lt-w01_35-light1475496',textAlign: 'center',margin:'0',paddingBottom:'20px'}}>Made for skilled trade professionals and construction contractors </h4>

              {/*Professional Section*/}
              <div className="container">
                  <div style={{marginTop:'40px',paddingLeft:'15px',paddingRight:'15px',marginLeft:'-15px',marginRight:'-15px'}}className="row">


                      <div className="col s12 m2">
                         <Step className={"step"}img="/images/how-it-works/pro.png" title="Professional"/>
                      </div>
                      {/*padding*/}
                      <div className="col m2 show-on-med-and-up"/>
                      <div className="col s12 m3">
                          <Step className={"step"}img="/images/how-it-works/pro-profile.png" title="Make a profile"/>
                          <h6>Upload your certifications, references, and resume</h6>
                      </div>

                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m1 hide-on-small-only">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transform:'scaleX(-1)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div>
                      <div style={{textAlign:'center',margin:'30px 0 30px 0'}} className="col s12 hide-on-med-and-up">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transformOrigin:'center center',transform:'rotate(-90deg)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div>

                      <div className="col s12 m3">
                          <Step  className={"step"} img="/images/how-it-works/hired.png" title="Get hired"/>
                          <h6>Get matched to jobs based on your certifications and skills</h6>
                      </div>





                  </div>


              </div>

            <div className="divider"></div>


              {/*Employer Section*/}
              <div className="container">
                  <div style={{marginTop:'40px'}}className="row">
                      <div className="col s12 m2">
                          <Step  className={"step"} img="/images/how-it-works/employer.png" title="Employer"/>
                      </div>
                      <div className="col m2 show-on-med-and-up"/>
                      <div className="col s12 m2">
                          <Step  className={"step"} img="/images/how-it-works/job-post.png" title="Make a job post"/>
                          <h6>List required profession, certifications, documents</h6>
                      </div>
                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m1 l1 hide-on-small-only">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transform:'scaleX(-1)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div>
                      <div style={{textAlign:'center',margin:'30px 0 30px 0'}} className="col s12 hide-on-med-and-up">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transformOrigin:'center center',transform:'rotate(-90deg)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div>
                      <div className="col s12 m2">
                          <Step   className={"step"}img="/images/how-it-works/hire-workers.png" title="Hire Workers"/>
                          <h6>Qualified workers are instantly matched the the job post </h6>
                      </div>
                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m1 l1 hide-on-small-only">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transform:'scaleX(-1)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div>
                      <div style={{textAlign:'center',margin:'30px 0 30px 0'}} className="col s12 hide-on-med-and-up">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transformOrigin:'center center',transform:'rotate(-90deg)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div>
                      <div className="col s12 m2">
                          <Step   className={"step"}img="/images/how-it-works/rating.png" title="Leave Rating" />
                          <h6>You and the hired professional leave a rating for each other </h6>
                      </div>
                  </div>
              </div>

            {/*
              <div >
                  <button onClick={this.pro} to={"/register"} children={"Sign Up Today!"}></button>
              </div>

            */}
          </div>

      )
    }
}
