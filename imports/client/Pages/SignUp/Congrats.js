import React from 'react';
import { Link } from 'react-router-dom';

export default Congrats = ()=>{
    return(
        <div className="container">
            <div className="card">
            <div className="row card-content">
                <span className="card-title">You have successfully registered with WrkBook!</span>                    
                <Link to="/login">Click here to login</Link>
            </div>
            </div>
        </div>
    )
}