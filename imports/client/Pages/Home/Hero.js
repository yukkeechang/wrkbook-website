import React  from 'react';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default Hero = () => {
    return (

            <div id="hero" className="valign-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h1 className="titles">Linking professionals<br/>and contractors</h1>
                        </div>
                    </div>
                    <ReactCSSTransitionGroup
                        transitionName="hBut"
                        transitionAppear={true}
                        transitionAppearTimeout={700}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={0}>
                        <div className="row" style={{position: 'relative'}}>
                            <div className="col s12 m6 l4">
                                <Button to="/register/contractor">Click here to post a job</Button>
                            </div>
                            <div className="col s12 m6 l4">
                                <Button to="/register/professional">Click here to apply for work</Button>                    </div>
                        </div>
                    </ReactCSSTransitionGroup>

                </div>
            </div>

    )
}
