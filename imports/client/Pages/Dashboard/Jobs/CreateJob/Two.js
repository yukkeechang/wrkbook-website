import React, { Component } from "react";
import ReactDOM from "react-dom";
import MTextField from "../../../Shared/MTextField";
import Location from '../../../Shared/Location';
import  RequirementSchema from '../../../../../api/Schemas/requirementSchema';
import Tools from './Tools';
import SocialS from './SocialS';
import Osha from './Osha';
import WkEnd from './WkEndInfo';
import { initGA, logPageView } from "../../../Shared/GoogleAnalytics";
import { CSSTransitionGroup } from 'react-transition-group';


export default class StepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locErr: false
    };
  }
  componentDidMount() {
    initGA();
    logPageView();
  }
  handleNext(e) {
    e.preventDefault();
    let loc = this.refs.location.getAddress()
    if(loc.valid){
      let requirements = RequirementSchema.clean({});

      requirements.osha = this.refs.osha.value();
      requirements.socialPref = this.refs.social.value();
      requirements.weekendExcluded = this.refs.wkend.value();

      let job ={
        tools: this.refs.tools.value(),
        location: loc.location,
        requirements:requirements
      }

      Meteor.call('validateRequirementsLocationTools',job,(err)=>{
        if(err)console.log(err);
        else{
          let joinObject = {...job,...this.props.job};
          this.props.next(3,joinObject)
        }
      });
    }else{
      this.setState({locErr:true})
    }
  }
  handleCancel(){
    this.props.next(1,{});
  }
  render() {
    return (
    <div className="container">
      <div className="card">
        <div className="row card-content">


          <span className="col s12 card-title">Step 2: Basic Job Information</span>
                <Location ref="location"/>
                <Tools ref="tools"/>
                <Osha ref="osha" />
                <div className="row">
                  <SocialS ref="social"/>
                  <WkEnd ref="wkend"/>
                </div>
            {this.state.locErr ? (
              <CSSTransitionGroup
              transitionName="err"
              transitionAppear={true}
              transitionAppearTimeout={1500}
              transitionEnter={false}
              transitionLeave={false}>
              <p className="col s12 thin-border red-border" style={{textAlign: 'center',lineHeight: '36px', marginTop: '8px',borderRadius: '2px'}}>You need to verify your address</p>
              </CSSTransitionGroup>
            ):''}
            <a onClick={e => this.handleCancel(e)} className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>back</a>
            <a onClick={e => this.handleNext(e)} className="btn-flat teal lighten-5 col s5 offset-s2 m3 offset-m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>Next</a>


          </div>
        </div>
      </div>
    );
  }
}
