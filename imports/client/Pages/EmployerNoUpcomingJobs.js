import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EmployerNoUpcomingJobs extends Component {
    render() {
        return (
            <div className="card-panel light-blue lighten-1 center-align">
                <img src="/images/hardhat.png" height="150" width="150" />
                <h5>You don't have any jobs posted</h5>
                {/* this is a dummy link */}
                <Link to="/jobs">
                    <button className="btn waves-effect cyan darken-1 waves-transparent">
                        Post One Here!
                    </button>
                </Link>
            </div>
        );
    }
}
