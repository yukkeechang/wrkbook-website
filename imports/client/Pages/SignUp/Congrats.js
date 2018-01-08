import React from 'react';
import { Link } from 'react-router-dom';

export default Congrats = ()=>{
    return(
        <div className="container">
            <div className="card">
            <div className="row card-content">
                <span className="card-title">You have successfully registered with WrkBook!</span>
                <h5>Please check your email (including junk folder) to verify your account!</h5>                              
                <Link to="/login">Click here to login</Link>
            </div>
            </div>
        </div>
    )
}
