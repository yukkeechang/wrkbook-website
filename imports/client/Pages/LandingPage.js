import React from 'react';
import Hero from './LandingPageComponents/Hero';
import HowTo from './LandingPageComponents/HowTo';
import HowTos from './LandingPageComponents/HowTos';
import Testimonial from './LandingPageComponents/Testimonial';
import About from './LandingPageComponents/About';
import Price from './LandingPageComponents/PricingPage';
import Services from './LandingPageComponents/Services';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';

import {initGA, logPageView} from  './Shared/GoogleAnalytics';

export default class LandingPage extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    initGA()
    logPageView()
    //console.log(this.props);
  }
  handleClick=(words)=>{
    let node = ReactDOM.findDOMNode(this.refs.HowTo);
    let node3 = ReactDOM.findDOMNode(this.refs.home);

    if(words === "HowTo"){
      node.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    if (words === "home") {
      node3.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }
  render(){
    return(

        <div>

        <Header handleClick={this.handleClick}/>

        <Hero ref="home"/>
        <Services/>
        <HowTos ref="HowTo"/>
        <Testimonial/>
        <Footer/>
        </div>

    )
  }
}
