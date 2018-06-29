import React from 'react';
import Hero from './LandingPageComponents/Hero';
import HowTos from './LandingPageComponents/HowTos';
import Testimonial from './LandingPageComponents/Testimonial';
import Price from './LandingPageComponents/PricingPage';
import Services from './LandingPageComponents/Services';
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './LandingPageComponents/VersionTwoPrelaunch/BetaAnnouncement';
import ProHowTo from './LandingPageComponents/VersionTwoPrelaunch/ProHowTo';
import ConHowTo from './LandingPageComponents/VersionTwoPrelaunch/ConHowTo';
import CollectEmails from './LandingPageComponents/VersionTwoPrelaunch/CollectEmails'
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
    let node1 = ReactDOM.findDOMNode(this.refs.home);
    let node2 = ReactDOM.findDOMNode(this.refs.collectEmails);
    let node3 = ReactDOM.findDOMNode(this.refs.howTo);


    if(words === "home"){
      node1.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    if (words === "collectEmails") {
      node2.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
    if (words === "howTo") {
      console.log("made it this far- still an error")
      node3.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  }
  render(){
    return(

        <div style={{backgroundColor: "#f1f1f1"}}>

        <Header handleClick={this.handleClick}/>
        <Hero handleClick={this.handleClick} ref="home"/>
        <Banner handleClick={this.handleClick}/>
        <Services/>
        <ProHowTo ref="howTo"/>
        <ConHowTo/>
        <CollectEmails ref="collectEmails"/>
        <Testimonial/>
        <Footer/>

        </div>

    )
  }
}
