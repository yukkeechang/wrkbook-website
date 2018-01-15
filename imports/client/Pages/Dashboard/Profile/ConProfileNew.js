import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import ConHeader from './ConHeader';
import InfoCard from './InfoCard';
import About from './About';
import Contact from './Contact';
import Certificates from './Certificates';
import ReviewsCurrent from './ReviewsForCurrent';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default class ConProFile extends React.Component {
constructor(props) {
  super(props);
  this.state={
    about:true,
    contact:false,
    reviews:false,
  }


}
handleClick=(e)=>{
  this.clearState();

  if(e==="about")this.setState({about:true});
  if(e==="contact")this.setState({contact:true});
  if(e==="reviews")this.setState({reviews:true});

}
componentDidMount(){

}
clearState=()=>{
  this.setState({
    about:false,
    contact:false,
    reviews:false,
  })
}

render() {
  // console.log(this.state.upcoming);
    //
    const url = this.props.match.url;
    console.log(url);
  return (
    <div>
      <ConHeader pageRender={this.state} tellParent={this.handleClick}/>
      <div className="container">
        <div className="row">
          <div className="col m4 s12">
            <InfoCard name={"HHHH"}
            subTopic={'dasfa'}
            Url={url}
            location={"HHHHHH"}
            />
          </div>
          <div className="col m8 s12">
            <Switch>
            <Route exact path={url} render={()=> (<About  aboutText={"ert"} isPro={false}/>)}/>
            <Route exact path={url+'/contact'} render={()=> (<Contact phone={"71888888"}email={"hah@ha.com"}/>)}/>
            <Route exact path={url+'/reviews'} render={()=> (  <ReviewsCurrent/>)}/>


            </Switch>
          </div>
        </div>
      </div>
    </div>

  )
 }
}
