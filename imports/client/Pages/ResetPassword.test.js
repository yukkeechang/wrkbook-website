import React from 'react';
import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { configure,shallow } from 'enzyme';
import Enzyme from 'enzyme'
import ResetPasswordComponent from './ResetPassword';
import Footer from './Shared/Footer';
import Header from './Shared/Header';
import MTextField from './Shared/MTextField';

import Adapter from 'enzyme-adapter-react-15';


Enzyme.configure({ adapter: new Adapter()});


if ( Meteor.isClient ) {
  describe('<ResetPassword />',()=>{
      it('renders Header , Two Textfields and Footer components',()=>{
        const wrapper = shallow(<ResetPasswordComponent/>);
        expect(wrapper.find(Header)).to.have.length(1);
        expect(wrapper.find(MTextField)).to.have.length(2);
        expect(wrapper.find(Footer)).to.have.length(1);
      });
  });
}
