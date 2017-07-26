import React  from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';
export default Hero = () => {
    return (
        <div id="hero" className="fullWidth">

            <div className="container">
                <div className="flexContainer">
                    <h1 className="spin">Linking professionals<br/>and contractors</h1>
                    <div className="flexRow">
                        <Link className="homeBut" to="/register/Contractor">Click here to post a job</Link>
                        <Link className="homeBut" to="/register/Professional">Click here to apply to work</Link>
                    </div>
                </div>
            </div>
        </div>                 
    )
}