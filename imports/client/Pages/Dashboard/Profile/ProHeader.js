import React , { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom';
export default class ProHeader extends React.Component {
constructor(props) {
  super(props);
  this.state={
    unClickHeight:0,
    clickHeight:0,
  }


}
handleClick(e){
  for (var variable in this.refs) {
    $(ReactDOM.findDOMNode(this.refs[variable])).height(this.state.unClickHeight);
  }
  $(ReactDOM.findDOMNode(this.refs[e])).height(this.state.clickHeight)
  this.props.tellParent(e);
}
componentDidMount(){
  let about = ReactDOM.findDOMNode(this.refs.about);
  let restoreHeight=$(about).height();
  let clickHeight = restoreHeight + restoreHeight/2.5;
  this.setState({
    unClickHeight:restoreHeight,
    clickHeight:clickHeight,
  })
  for (var variable in this.props.pageRender) {
    // console.log(this.props.pageRender[variable]);
    if(this.props.pageRender[variable]){
      $(ReactDOM.findDOMNode(this.refs[variable])).height(clickHeight)
    }
  }
  console.log(this.props.pageRender);
}

render() {
  // console.log(this.state.upcoming);
    //
  return (
    <div className="container">

      <div style={{height:'25%',backgroundColor: '#F0F0F0'}}>
        <div className="row">
            <div className="col s2">
                <a className="waves-effect waves-light btn"><i className="material-icons left">settings</i>Edit Profile</a>
            </div>

        </div>
          <div style={{height:'10vh'}} className="row ">
                <div className="col center-align s12 m4 l4 ">
                    <img
                      style={{height:'100%'}}
                      src={'images/ic_account_circle_black_48dp_2x.png'}
                    />
                </div>

          </div>

          <div style={{height:'30px'}} className="row " >
            <div className="col s12 m8 l8 offset-l4  offset-m4">
              <div  className="col s3 m3 l3">
<a id="about" ref="about"  className="waves-effect white  waves-light btn-flat" onClick={this.handleClick.bind(this,'about')}>About</a>

              </div>
              <div className="col s3 m3 l3">
                  <a id="contact" ref="contact"  className="waves-effect  white waves-light btn-flat" onClick={this.handleClick.bind(this,'contact')}>Contact</a>
              </div>
              <div className="col s3 m3 l3">
                  <a id="cert" ref="cert"  className="waves-effect white waves-light btn-flat" onClick={this.handleClick.bind(this,'cert')}>Certifications</a>
              </div>
              <div className="col  s3 m3 l3">
                  <a id="reviews" ref="reviews" className="waves-effect  center-align   white waves-light btn-flat" onClick={this.handleClick.bind(this,'reviews')}>Reviews</a>
              </div>
            </div>
          </div>

        </div>




      </div>
  )
 }
}
