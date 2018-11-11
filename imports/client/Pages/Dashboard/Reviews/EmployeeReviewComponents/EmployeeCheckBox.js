import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class EmployeeCheckBoxs extends Component{
  constructor(props){
    super(props);
    this.state={
      onTime: false,
      neatJob: false,
      wouldRecommend: false,
    }
  }
  value(){
    return{
      onTime: this.state.onTime,
      neatJob: this.state.neatJob,
      wouldRecommend: this.state.wouldRecommend
    };

  }
  handleOnTime=()=> {
    this.state.onTime ? this.setState({onTime: false}) : this.setState({onTime: true})
  }
  handleNeatJob=()=>{
    this.state.neatJob ? this.setState({neatJob: false}) : this.setState({neatJob: true})
  }
  handleRecommend=()=> {
    this.state.wouldRecommend ? this.setState({wouldRecommend: false}) : this.setState({wouldRecommend: true})
  }


  render(){
    return(

      <div className="row">
        <div className="row">
          <div className="col s12">
              <p>Please select the categories that apply</p>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m4 ">
              <label>
              <input type="checkbox" className="filled-in" id="onTime"  value={this.state.onTime} onChange={this.handleOnTime.bind(this)}/>
              <span>Shows up on time</span>
              </label>
          </div>

          <div className="col s12 m4 ">
          <label>
            <input type="checkbox" className="filled-in" id="neatJob" value={this.state.neatJob} onChange={this.handleNeatJob.bind(this)} />
            <span>Neat Job</span>
            </label>
          </div>

          <div className="col s12 m4 ">
            <label>
            <input type="checkbox" className="filled-in" id="recommend" value={this.state.wouldRecommend} onChange={this.handleRecommend.bind(this)}/>
            <span>Recommended</span>
            </label>
          </div>

        </div>
      </div>
    )
  }
}
