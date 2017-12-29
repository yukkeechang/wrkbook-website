import React from 'react';
import Hero from './LandingPageComponents/Hero';
import HowTo from './LandingPageComponents/HowTo';
import About from './LandingPageComponents/About';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';

export default class LandingPage extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){

  }
  handleClick=(words)=>{
    console.log("clickly-click");
    console.log(words);
    let node = ReactDOM.findDOMNode(this.refs.HowTo);
    if(words === "HowTo"){
      node.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }
  render(){
    return(

        <div>
        <Header handleClick={this.handleClick}/>

        <Hero/>
        <HowTo ref="HowTo"/>
        <About/>
        <Footer/>

        </div>

    )
  }
}
