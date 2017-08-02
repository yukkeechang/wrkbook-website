import React, {Component} from 'react';

export default class StepOne extends Component{
    render(){
        return(
            <div className="container">
                <div className="card z-depth-0">
                <div className="row card-content">
                    <form className="col s12">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="input-field">
                                <input id="firstName" type="text" className="validate"/>
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="input-field">
                                <input id="lastName" type="text" className="validate"/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                            <div className="input-field">
                                <input id="email" type="text" className="validate"/>
                                <label htmlFor="email">Email Address</label>
                            </div>
                            <div className="input-field">
                                <input id="phone" type="tel" className="validate"/>
                                <label htmlFor="phone">Phone Number</label>
                            </div>
                        </div>
                        <div className="col s12 m6">
                            <div className="input-field">
                                <input id="password" type="password" className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="input-field">
                                <input id="confirmPass" type="password" className="validate"/>
                                <label htmlFor="confirmPass">Confirm Password</label>
                            </div>
                            <p>
                            <input name="group1" type="radio" id="test1" />
                            <label htmlFor="test1">Contractor</label>
                            </p>
                            <p>
                            <input name="group1" type="radio" id="test2" />
                            <label htmlFor="test2">Professional</label>
                            </p>
                        </div>
                    </div>
                    
                    <a className="btn-flat teal lighten-5" style={{color: 'black'}}type="submit">Next</a>
                    </form>
                </div>  

                </div>
            </div>
        )
    }
}