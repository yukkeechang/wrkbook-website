import React from 'react';
import Step from './HowTo/Step';

export default HowTo=()=>{
    return(
        <div id="HowTo"  >
            <div  style = {{backgroundColor: '#060a21'}}>
                <div className="row container">
                    <div className="col s12 m10 push-m1"  style={{paddingTop:'20px',paddingBottom:'20px'}}>
                        <h3 style={{fontFamily:'avenir-lt-w01_35-light1475496',textAlign: 'center',color:'white',margin:'0'}}>What we do</h3>
                        <h4 style={{fontFamily:'avenir-lt-w01_35-light1475496',color:'white'}} className="flow-text">It's simple. Wrkbook connects professionals with the right job based on their skills and experience. Employers will never be short of workers and workers will never be out of a job. </h4>
                    </div>
                </div>
            </div>
            <h3 style={{fontFamily:'avenir-lt-w01_35-light1475496',textAlign: 'center',margin:'0',paddingBottom:'20px'}}>How it works</h3>

            <div className="container">
                <h3 style={{width:'166px',fontFamily:'avenir-lt-w01_35-light1475496',fontStyle:'italic',fontSize:'28px',margin:'0',backgroundColor:'#1BAB6E',padding:'2px 5px 2px 5px'}}>Professional</h3>
                <div style={{marginTop:'40px'}}className="row">
                    <div className="col s12 m2 offset-m3">
                        <Step img="/images/profile.png" title="Make a profile" text="List down your skills and certifications"/>
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
                        <Step img="/images/tools.png" title="Get hired" text="Get hired based on your skills and availability"/>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 style={{width:'166px',fontFamily:'avenir-lt-w01_35-light1475496',fontStyle:'italic',fontSize:'28px',margin:'0',backgroundColor:'#1BAB6E',padding:'2px 5px 2px 5px'}}>Contractor</h3>
                <div style={{marginTop:'40px'}}className="row">
                    <div className="col s12 m2 offset-m1">
                        <Step img="/images/jobpost.png" title="Make a job post" text="List down the dates, required skills, and location"/>
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
                        <Step img="/images/worker.png" title="Find workers" text="Get workers matched to your job post based on your qualifications"/>
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
                        <Step img="/images/network.png" title="Network" text="Continuously meet and work with professionals"/>
                    </div>
                </div>
            </div>

        </div>
    )
}