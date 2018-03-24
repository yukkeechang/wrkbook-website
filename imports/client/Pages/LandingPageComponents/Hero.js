import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import { hotjar } from 'react-hotjar';

hotjar.initialize(790931, 6);
export default class Hero extends Component {

    pro(){
        window.localStorage.isPro = true;
    }
    con(){
        window.localStorage.isPro = false;
    }
    render(){
      hotjar.initialize(790931, 6);
        return (
            <div id="hero" className="valign-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <h1 className="titles">Linking professionals<br/>and contractors</h1>
                        </div>
                    </div>
                    <CSSTransitionGroup
                        transitionName="hBut"
                        transitionAppear={true}
                        transitionAppearTimeout={700}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={0}>
                        <div className="row" style={{position: 'relative'}}>
                            <div className="col s12 m6 l4">
                                <Button onClick={this.con} to="/register">Find Workers</Button>
                            </div>
                            <div className="col s12 m6 l4">
                                <Button onClick={this.pro} to="/register">Find Work</Button>
                            </div>
                        </div>
                    </CSSTransitionGroup>

                </div>
            </div>
        )
    }
}
