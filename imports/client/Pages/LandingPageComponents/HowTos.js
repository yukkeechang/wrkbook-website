import React from 'react';
import Step from './HowTo/Step';

export default class HowTo extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return(
          <div id="HowTo" style={{backgroundColor: 'white'}} >
              <h3 style={{fontFamily:'avenir-lt-w01_35-light1475496',textAlign: 'center',margin:'0',paddingBottom:'20px'}}>Made for construction professionals and contractors </h3>

              <div className="container">
                  <div style={{marginTop:'40px'}}className="row">
                      <div className="col s12 m2">
                         <Step className={"step"}img="/images/how-it-works/pro.png" title="Professional"/>
                      </div>
                      {/*}<div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m2 hide-on-small-only">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" style={{fill:'#a9a9a9', height: '65px',width:'65px',margin:'auto',transform:'scaleX(-1)'}}>
                              <g>
                                  <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                              </g>
                          </svg>
                      </div> */}

                      <div className="col s12 m2">
                          <Step className={"step"}img="/images/how-it-works/pro-profile.png" title="Make a profile"/>
                      </div>

                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m2 hide-on-small-only">
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
                          <Step  className={"step"} img="/images/how-it-works/hired.png" title="Get hired"/>
                      </div>


                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m2 hide-on-small-only">
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
                          <Step  className={"step"} img="/images/how-it-works/money.png" title="Make Money"/>
                      </div>
                  </div>
              </div>

              <div className="hide-on-med-and-up"><div className="divider"></div></div>

              <div className="container">
                  <div style={{marginTop:'40px'}}className="row">
                      <div className="col s12 m2">
                          <Step  className={"step"} img="/images/how-it-works/employer.png" title="Employer"/>
                      </div>
                      <div className="col s12 m2">
                          <Step  className={"step"} img="/images/how-it-works/job-post.png" title="Make a job post"/>
                      </div>
                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m2 hide-on-small-only">
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
                      </div>
                      <div style={{textAlign:'center',marginTop:'60px'}} className="col s12 m2 hide-on-small-only">
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
                      </div>
                  </div>
              </div>

          </div>
      )
    }
}
