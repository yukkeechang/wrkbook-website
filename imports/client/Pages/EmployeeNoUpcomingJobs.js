import React, { Component } from 'react';

export default class EmployeeNoUpcomingJobs extends Component {
    render() {
        return (
            <div className="card-panel light-blue lighten-1 center-align">
                <img src="/images/hardhat.png" height="150" width="150" />
                <h5>You don't have any jobs yet</h5>
                {/* this is a dummy link */}
                <Link to="/register/Contractor">
                    <button className="btn waves-effect cyan darken-1 waves-transparent">
                        Find One Here!
                    </button>
                </Link>
            </div>
        );
    }
