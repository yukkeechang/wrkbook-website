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
handleClick(e){
  for (var variable in this.refs) {
    $(ReactDOM.findDOMNode(this.refs[variable])).height(this.state.unClickHeight);
  }
  $(ReactDOM.findDOMNode(this.refs[e])).height(this.state.clickHeight)
}

componentDidMount(){

  let arrayofPaths=['about','certificates','reviews'];

  let about = ReactDOM.findDOMNode(this.refs.about);
  let restoreHeight=$(about).height();
  let clickHeight = restoreHeight + restoreHeight/2.5;
  this.setState({
    unClickHeight:restoreHeight,
    clickHeight:clickHeight,
    textSize:'1em',
  })
  let defaultRoute = true;
  let newLink = this.props.url;
  for (var variable in arrayofPaths) {
    // console.log(this.props.pageRender[variable]);
    if(this.props.url.includes(arrayofPaths[variable])){
      $(ReactDOM.findDOMNode(this.refs[arrayofPaths[variable]])).height(clickHeight);

      newLink = newLink.replace(arrayofPaths[variable],'')
      defaultRoute=false;
    }

  }
  if(defaultRoute)$(ReactDOM.findDOMNode(this.refs.about)).height(clickHeight);
  this.setState({defaultRoute:defaultRoute , link:newLink});
   this.changingText();
  window.addEventListener('resize',this.changingText)
}
 componentWillMount(){
   this.changingText();
 }
componentWillUnMount(){
    window.removeEventListener('resize',this.changingText)
}
changingText=()=>{
  let textSize = window.innerWidth <= 820 ? '.65em':'1em';

  this.setState({textSize:textSize});

}


render() {
  //console.log(this.props);
  return (
    <div className="container">

      <div style={{height:'25%',backgroundColor: '#F0F0F0'}}>
        <div className="row">
            <div className="col s2">
            {this.props.isUser&&
              <Link to="/edit">
                <div>
                    <a className="waves-effect waves-light btn"><i className="material-icons left">settings</i>Edit Profile</a>
                </div>
              </Link>
            }
            </div>

        </div>
          <div style={{height:'20vh'}} className="row ">
                <div className="col center-align s12 m4 l4 ">
                    <img
                    className="circle"
                    style={{height:'150px',width:'150px'}}
                      src={'/cfs/files/images/'+this.props.user.profile.employeeData.image}
                    />
                </div>

          </div>

          <div   style={{marginBottom:'0px',position:'relative'}} className="row " >
            <div className="col s12 m8 l8 offset-l3  offset-m3">
              <div  style={{paddingRight:'3px',paddingLeft:'3px'}} className="col center-align s3 m3 l3">

                <Link style={{backgroundColor:'white',height:'100%',width:'100%'}} to={this.state.defaultRoute ? this.props.url+"/about": this.state.link+"about"} onClick={this.handleClick.bind(this,'about')}>
                  <div style={{backgroundColor:'white',height:'100%',width:'100%'}} >
                    <a style={{padding:'0px',fontSize:this.state.textSize}} id="about" ref="about"  className="waves-effect white  waves-light btn-flat" onClick={this.handleClick.bind(this,'about')}>About</a>
                  </div>
                </Link>

              </div>

          {/*  <div style={{paddingRight:'3px',paddingLeft:'3px'}} className="col center-align s3 m3 l3">
                <Link style={{backgroundColor:'white',height:'100%',width:'100%'}} to={this.state.defaultRoute ? this.props.url+"/contact": this.state.link+"contact"} onClick={this.handleClick.bind(this,'contact')}>
                  <div style={{backgroundColor:'white',height:'100%',width:'100%'}}>
                    <a style={{padding:'0px',fontSize:this.state.textSize}}  id="contact" ref="contact"  className="waves-effect  white waves-light btn-flat" onClick={this.handleClick.bind(this,'contact')}>Contact</a>
                  </div>
                </Link>
              </div>   */}

              <div style={{paddingRight:'3px',paddingLeft:'3px'}} className="col center-align s3 m3 l3">
                <Link style={{backgroundColor:'white',height:'100%',width:'100%'}} to={this.state.defaultRoute ? this.props.url+"/certificates":  this.state.link+"certificates"} onClick={this.handleClick.bind(this,'certificates')}>
                  <div   style={{backgroundColor:'white',height:'100%',width:'100%'}}>
                    <a id="certificates" ref="certificates"  style={{padding:'0px',fontSize:this.state.textSize}} className="waves-effect white waves-light btn-flat" onClick={this.handleClick.bind(this,'certificates')}>Certifications</a>
                  </div>
                </Link>
              </div>

              <div  style={{paddingRight:'3px',paddingLeft:'3px'}} className="col center-align s3 m3 l3">
                <Link style={{backgroundColor:'white',height:'100%',width:'100%'}} to={this.state.defaultRoute ? this.props.url+"/reviews": this.state.link+"reviews"}  onClick={this.handleClick.bind(this,'reviews')} >
                  <div style={{backgroundColor:'white',height:'100%',width:'100%'}}>
                    <a id="reviews" style={{padding:'0px',fontSize:this.state.textSize}} ref="reviews" className="waves-effect center-align  white waves-light btn-flat" onClick={this.handleClick.bind(this,'reviews')}>Reviews</a>
                  </div>
                </Link>
              </div>

            </div>
          </div>

        </div>




      </div>
  )
 }
}
