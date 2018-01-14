import React from 'react';
import Hero from './LandingPageComponents/Hero';
import HowTo from './LandingPageComponents/HowTo';
import About from './LandingPageComponents/About';
import Price from './LandingPageComponents/PricingPage'
import ReactDOM from 'react-dom';
import Header from './Shared/Header';
import Footer from './Shared/Footer';

export default class LandingPage extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log(this.props);
  }
  handleClick=(words)=>{
    let node = ReactDOM.findDOMNode(this.refs.HowTo);
    let node2 = ReactDOM.findDOMNode(this.refs.price);
    let node3 = ReactDOM.findDOMNode(this.refs.home);

    if(words === "HowTo"){
      node.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
    if (words === "price") {
      node2.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
    if (words === "home") {
      node3.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }
  render(){
    return(

        <div>

        <Header handleClick={this.handleClick}/>

        <Hero ref="home"/>
        <HowTo ref="HowTo"/>
        <Price history={this.props.history} ref="price"/>
        <About/>
        <Footer/>

        </div>

    )
  }
}
