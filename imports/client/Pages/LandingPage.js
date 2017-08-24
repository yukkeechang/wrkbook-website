import React from 'react';
import Hero from './LandingPageComponents/Hero';
import HowTo from './LandingPageComponents/HowTo';
import About from './LandingPageComponents/About';

import Header from './Shared/Header';
import Footer from './Shared/Footer';

export default LandingPage = ()=>{

    return(

        <div>
        <Header/>

        <Hero/>
        <HowTo/>
        <About/>
        <Footer/>

        </div>

    )
}
