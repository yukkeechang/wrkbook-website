import React  from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';
export default HowTo = () => {
    return (
        <div id="howTo"className="fullWidth">
            <div className="container">
                <div className="less">
                    <h4 className="wwd">What we do</h4>
                    <h1 id="msg" className="spin">It's simple. Wrkbook connects professionals with the right job based on their skills and experience. Employers will never be short of workers and workers will never be out of a job.</h1>
                </div>
                <div className="fullWidth">
                    <h4 id="hiw"className="wwd">How it works</h4>
                    <h2 id="prof">Professional</h2>
                    <div className="steps">
                        <div className="step">
                            <img src="/images/profile.png"/>
                            <h6>Make a profile</h6>
                            <p>List down your skills and<br/>certifications</p>
                        </div>
                        
                            <svg id="arrow"xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" >
                                <g>
                                    <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                                </g>
                            </svg>
                        
                        <div className="step">
                            <img src="/images/tools.png"/>
                            <h6>Get hired</h6>
                            <p>Get hired based on your<br/>skills and availability</p>
                        </div>
                    </div>
                </div>
                <div className="fullWidth">
                    <h2 id="prof">Contractor   </h2>
                    <div className="steps">
                        <div className="step">
                            <img src="/images/jobpost.png"/>
                            <h6>Make a job post</h6>
                            <p>List down the dates<br/>required skills, and location</p>
                        </div>
                        
                            <svg id="arrow"xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" >
                                <g>
                                    <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                                </g>
                            </svg>

                        <div className="step">
                            <img src="/images/worker.png"/>
                            <h6>Find workers</h6>
                            <p>Get workers matched to<br/>your job post based on your<br/>qualifications</p>
                        </div>
                        
                            <svg id="arrow"xmlns="http://www.w3.org/2000/svg" viewBox="9.800000190734863 1.3999998569488525 32.29999923706055 57.19999694824219" preserveAspectRatio="xMidYMid meet" >
                                <g>
                                    <path d="M40.8 52.5L18.3 30 40.8 7.5c1.3-1.3 1.3-3.5 0-4.8-1.3-1.3-3.5-1.3-4.8 0L11.1 27.6c-1.3 1.3-1.3 3.5 0 4.8L36 57.3c1.3 1.3 3.5 1.3 4.8 0 1.3-1.3 1.3-3.4 0-4.8z"></path>
                                </g>
                            </svg>

                        <div className="step">
                            <img src="/images/network.png"/>
                            <h6>Network</h6>
                            <p>Continuously meet and work<br/>with professionals</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>                 
    )
}