import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MTextField from '../../../Shared/MTextField';
import {initGA, logPageView} from  '../../../Shared/GoogleAnalytics';
import One from './One';
import Two from './Two';


export default class CreateJob extends Component {
  constructor(props) {
      super(props);
      this.state = {
        step: 1
      }
  }

  next(step, job) {
    this.setState({step: step})
  }

  steps() {

    switch(this.state.step) {
      case 1:
       return(
         <One next={this.next(this.state.step)}/>
       )
       break;
      case 2:
       return (<Two next={this.next(this.state.step).bind(this)}/>)
    }
  }

  render() {

    return (
      <div>
      {this.steps()}
      </div>
    )
    }



  }
