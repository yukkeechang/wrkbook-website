import React from 'react';
import Hero from '../Components/Home/Hero';
import HowTo from '../Components/Home/HowTo';
import About from '../Components/Home/About';
import Footer from '../Components/Shared/Footer';

import Header from '../Components/Shared/Header';

export default Home = ()=>{
    
    return(
        <div id="mainC">
            <Header/>
            <Hero/>
            <HowTo/>
            <About/>
            <Footer/>   
        </div>
    )
}
