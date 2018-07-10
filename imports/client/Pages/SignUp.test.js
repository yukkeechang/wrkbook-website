import React from 'react';
import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { configure,shallow } from 'enzyme';
import Enzyme from 'enzyme'
import SignUpComponent from './SignUp';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import MTextField from './Shared/MTextField';

import Adapter from 'enzyme-adapter-react-15';

import StepOne from './SignUp/StepOne';
import StepTwoE from './SignUp/StepTwoE';
import StepTwoC from './SignUp/StepTwoC';
import StepThree from './SignUp/StepThree';
import Congrats from './SignUp/Congrats';

Enzyme.configure({ adapter: new Adapter()});


if ( Meteor.isClient ) {
  describe('<SignUp />',()=>{
      it('renders Header , StepOne and Footer components',()=>{
        const wrapper = shallow(<SignUpComponent/>);
        expect(wrapper.find(Header)).to.have.length(1);
        expect(wrapper.find(StepOne)).to.have.length(1);
        expect(wrapper.find(Footer)).to.have.length(1);
      });
      it('can change states ',()=>{
        const wrapper = shallow(<SignUpComponent/>);

        wrapper.setState({step:3,pro:true,User:{}});
        expect(wrapper.find(StepThree)).to.have.length(1);
        expect(wrapper.find(StepTwoE)).to.have.length(0);
        expect(wrapper.find(Congrats)).to.have.length(0);
        wrapper.setState({step:4,pro:true,User:{}});
        expect(wrapper.find(StepThree)).to.have.length(0);
        expect(wrapper.find(StepTwoE)).to.have.length(0);
        expect(wrapper.find(Congrats)).to.have.length(1);
      });
      it('can change states professional and professional side',()=>{
        const wrapper = shallow(<SignUpComponent/>);
        wrapper.setState({step:2,pro:true,User:{}});
        expect(wrapper.find(StepTwoE)).to.have.length(1);
        expect(wrapper.find(StepThree)).to.have.length(0);
        expect(wrapper.find(Congrats)).to.have.length(0);
        wrapper.setState({step:2,pro:false,User:{}});
        expect(wrapper.find(StepTwoC)).to.have.length(1);
        expect(wrapper.find(StepThree)).to.have.length(0);
        expect(wrapper.find(Congrats)).to.have.length(0);
      });
  });
}
