import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactDOM from 'react-dom';
import { hotjar } from 'react-hotjar';

hotjar.initialize(790931, 6);
export default class Hero extends Component {

    //UNCOMMENT AFTER V2 RELEASE
    // pro(){
    //     window.localStorage.isPro = true;
    // }
    // con(){
    //     window.localStorage.isPro = false;
    // }

    handleClick = () => {
      console.log("handle click")
      this.props.handleClick("collectEmails");
    }
    componentDidMount(){
      let things = ReactDOM.findDOMNode(this.refs.hero);

      const observer = lozad(things);
      observer.observe();
    }
    render(){

      hotjar.initialize(790931, 6);
        return (
            <div id="hero" ref="hero" className="valign-wrapper lozad"  data-background-image="/images/carpet.jpg">
                <div className="container">
                  <div className="center-align">
                    <div className="row">
                      <div className="col s12" >

                        <h4 className="valign montserrat-med" style={{color:'white'}}>Linking skilled trade workers and construction contractors</h4>
                      </div>
                    </div>
                    <CSSTransitionGroup
                        transitionName="hBut"
                        transitionAppear={true}
                        transitionAppearTimeout={700}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={0}
                      >
                        {/*button styles for med screen and up*/}
                        <div className="row valign-wrapper hide-on-small-only" style={{position: 'relative'}}>
                          <Button onClick={this.handleClick} stylez={{margin:'20px'}} className="button fill-green col s12 m6 l6" text={"white"}  >Find Work</Button>
                          <Button onClick={this.handleClick} stylez={{margin:'20px'}} className="button fill-white col s12 m6 l6"  text={"black"} >Find Workers</Button>
                       </div>

                      {/*button styles for small screen*/}
                      <div className="row hide-on-med-and-up" style={{position: 'relative'}}>
                      <div className="col s12 m5 l6" >
                        <div className= "button fill-green">
                          <Button onClick={this.handleClick} text={"white"}style={"button fill-green"} paddingTop={'0px'}>Find Work</Button>
                        </div>
                      </div>
                      {/*padding for small screens*/}
                      <div className="col s12 hide-on-med-and-up" style={{marginBottom: '10px'}}></div>
                      <div className="col s12 m5 l6" >
                        <div className= "button fill-white">
                          <Button onClick={this.handleClick} text={"black"}  style={"button fill-white"} paddingTop={'0px'}>Find Workers</Button>
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
