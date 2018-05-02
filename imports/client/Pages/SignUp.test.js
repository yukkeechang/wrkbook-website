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

Enzyme.configure({ adapter: new Adapter()});


if ( Meteor.isClient ) {
  describe('<SignUp />',()=>{
      it('renders Header , StepOne and Footer components',()=>{
        const wrapper = shallow(<SignUpComponent/>);
        expect(wrapper.find(Header)).to.have.length(1);
        expect(wrapper.find(StepOne)).to.have.length(1);
        expect(wrapper.find(Footer)).to.have.length(1);
      });
  });
}
