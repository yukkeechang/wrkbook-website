import React , { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactDOM from 'react-dom';
export default class ProHeader extends React.Component {
constructor(props) {
  super(props);
  this.state={
    unClickHeight:0,
    clickHeight:0,
    defaultRoute:true,
    link:'',
  }
}

componentDidMount(){

  // let arrayofPaths=['about','certificates','reviews'];
  //
  // let about = ReactDOM.findDOMNode(this.refs.about);
  // let restoreHeight=$(about).height();
  // let clickHeight = restoreHeight + restoreHeight/2.5;
  // this.setState({
  //   unClickHeight:restoreHeight,
  //   clickHeight:clickHeight,
  //   textSize:'1em',
  // })
  // let defaultRoute = true;
  // let newLink = this.props.url;
  // for (var variable in arrayofPaths) {
  //   // console.log(this.props.pageRender[variable]);
  //   if(this.props.url.includes(arrayofPaths[variable])){
  //     $(ReactDOM.findDOMNode(this.refs[arrayofPaths[variable]])).height(clickHeight);
  //
  //     newLink = newLink.replace(arrayofPaths[variable],'')
  //     defaultRoute=false;
  //   }

//   }
//   if(defaultRoute)$(ReactDOM.findDOMNode(this.refs.about)).height(clickHeight);
//   this.setState({defaultRoute:defaultRoute , link:newLink});
//    this.changingText();
//   window.addEventListener('resize',this.changingText)
// }
//  componentWillMount(){
//    this.changingText();
//  }
// componentWillUnMount(){
//     window.removeEventListener('resize',this.changingText)
// }
// changingText=()=>{
//   let textSize = window.innerWidth <= 820 ? '.65em':'1em';
//
//   this.setState({textSize:textSize});

}


render() {
  return (
    <div className="container">
      <div className="row">
  <div className="col s12">
    <ul className="tabs">
      <li className="tab col s3"><a href="#test1">Test 1</a></li>
      <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
      <li className="tab col s3"><a href="#test3"> Tab</a></li>
      <li className="tab col s3"><a href="#test4">Test 4</a></li>
    </ul>
  </div>
</div>
    </div>
  )
 }
}
