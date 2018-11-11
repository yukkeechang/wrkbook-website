import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../Shared/Button";
import { CSSTransitionGroup } from "react-transition-group";
import ReactDOM from "react-dom";
import { hotjar } from "react-hotjar";

hotjar.initialize(790931, 6);
export default class Hero extends Component {
  //UNCOMMENT AFTER V2 RELEASE
  // pro(){
  //     window.localStorage.isPro = true;
  // }
  // con(){
  //     window.localStorage.isPro = false;
  // }
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    this.props.handleClick("collectEmails");
  };
  componentDidMount() {
    let things = ReactDOM.findDOMNode(this.refs.hero);

    const observer = lozad(things);
    observer.observe();
  }
  render() {
    hotjar.initialize(790931, 6);
    return (
      <div
        id="hero"
        ref="hero"
        className="ban-med valign-wrapper lozad"
        data-background-image="/images/carpet.jpg"
      >
        <div className="container">
          <div className="center-align">
            <div className="row">
              <div className="col s12">
                <h4 className="valign montserrat-med white-text">
                  Linking skilled trade workers and construction contractors
                </h4>
              </div>
            </div>
            <CSSTransitionGroup
              transitionName="hBut"
              transitionAppear={true}
              transitionAppearTimeout={700}
              transitionEnterTimeout={0}
              transitionLeaveTimeout={0}
            >
              <div className="row">
                <div style={{ marginBottom: "10px" }} className="col s12 m6 l6">
                  <Button
                    onClick={this.handleClick}
                    className="take-up-width roundish-button-flat-large wrkbook-green"
                    text={"white"}
                  >
                    Find Work
                  </Button>
                </div>
                <div className="col s12 m6 l6">
                  <Button
                    onClick={this.handleClick}
                    className="take-up-width roundish-button-flat-large white"
                    text={"black"}
                  >
                    Find Workers
                  </Button>
                </div>
              </div>
            </CSSTransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}
