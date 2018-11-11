import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import One from './CreateJob/One';
import Two from './CreateJob/Two';
import Three from './CreateJob/Three';
import Four from './CreateJob/Submit';

export default class CreateJob extends Component {
  constructor(props) {
      super(props);
      this.state = {
        step:1,
        Job: {}
      }
  }

  next=(step, Job)=> {
    this.setState({step: step,Job:Job});
  }
  render() {
    let step;
    console.log(this.state.step);
    switch(this.state.step) {
      case 1:
         step = <One next={this.next}/>
         break;
      case 2:
          step = <Two next={this.next} job={this.state.Job}/>
          break;
      case 3:
          step = <Three next={this.next} job={this.state.Job}/>
        break;
      case 4:
          step = <Four next={this.next} job={this.state.Job}/>
          break;
      default:
          step = null;
          break;
    }
    return (
      <div style={{height:'100vmin'}}>
        <div className="container">
          <div className="progress">
            <div className="determinate red accent-2" style={{width:`${this.state.step*25}%`}}></div>
          </div>
        </div>
          {step}
      </div>
    )
    }



}
