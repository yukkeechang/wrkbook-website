import React from 'react';
import Hero from './LandingPageComponents/Hero';
import HowTos from './LandingPageComponents/HowTos';
import Testimonial from './LandingPageComponents/Testimonial';
import About from './LandingPageComponents/About';
import Price from './LandingPageComponents/PricingPage';
import Services from './LandingPageComponents/Services';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './LandingPageComponents/VersionTwoPrelaunch/betaAnnouncement';
import ProHowTo from './LandingPageComponents/VersionTwoPrelaunch/ProHowTo';
import ConHowTo from './LandingPageComponents/VersionTwoPrelaunch/ConHowTo';
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

        <div style={{backgroundColor: "#f1f1f1"}}>

        <Header handleClick={this.handleClick}/>
        <Hero ref="home"/>
        <Banner/>

        <Services/>
        <ProHowTo/>
        <ConHowTo/>
        <Testimonial/>
        <Footer/>

        </div>

    )
  }
}
