import React from 'react';
import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { configure,shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Hero from './LandingPageComponents/Hero';
import LandingPage from './LandingPage';
import Header from './Shared/Header';
import Footer from './Shared/Footer';
import Banner from './LandingPageComponents/VersionTwoPrelaunch/BetaAnnouncement';
import ProHowTo from './LandingPageComponents/VersionTwoPrelaunch/ProHowTo';
import ConHowTo from './LandingPageComponents/VersionTwoPrelaunch/ConHowTo';
import CollectEmails from './LandingPageComponents/VersionTwoPrelaunch/CollectEmails'
import Adapter from 'enzyme-adapter-react-15';
import Testimonial from './LandingPageComponents/Testimonial';
import Services from './LandingPageComponents/Services';

Enzyme.configure({ adapter: new Adapter()});


if ( Meteor.isClient ) {
  describe('<LandingPage />',()=>{
      it('renders components that make up tthe landing page',()=>{
        const wrapper = shallow(<LandingPage/>);
        expect(wrapper.find(Header)).to.have.length(1);
        expect(wrapper.find(Banner)).to.have.length(1);
        expect(wrapper.find(ProHowTo)).to.have.length(1);
        expect(wrapper.find(ConHowTo)).to.have.length(1);
        expect(wrapper.find(Testimonial)).to.have.length(1);
        expect(wrapper.find(Services)).to.have.length(1);
        expect(wrapper.find(Footer)).to.have.length(1);
        expect(wrapper.find(Hero)).to.have.length(1);
      });

  });
}
