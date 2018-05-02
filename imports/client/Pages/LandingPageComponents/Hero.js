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
                  <div className="center-align">
                    <div className="row">
                      <h1 className="titles">Linking professionals and contractors</h1>
                    </div>
                    <CSSTransitionGroup
                        transitionName="hBut"
                        transitionAppear={true}
                        transitionAppearTimeout={700}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={0}>
                        <div className="row valign-wrapper" style={{position: 'relative'}}>
                          <div className="col s12 m5 l6" >
                            <div className= "button fill-green">
                              <Button onClick={this.pro} text={"white"}to="/register"style={"button fill-green"} paddingTop={'0px'}>Find Work</Button>
                            </div>
                          </div>
                          <div className="col s12 hide-on-med-and-up" style={{marginBottom: '10px'}}></div>
                          <div className="col s12 m5 l6" >
                            <div className= "button fill-white">
                              <Button onClick={this.con} text={"black"} to="/register" style={"button fill-white"} paddingTop={'0px'}>Find Workers</Button>
                            </div>
                          </div>
                      </div>
                    </CSSTransitionGroup>
                    </div>
                </div>
            </div>
        )
    }
}
