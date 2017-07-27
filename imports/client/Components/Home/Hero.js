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
                        <Link className="homeBut" to="/register/Contractor">Sign up to be a contractor</Link>
                        <Link className="homeBut" to="/register/Professional">Sign up to be a professional</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
