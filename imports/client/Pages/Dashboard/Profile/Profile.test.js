import React from 'react';
import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import Enzyme, { configure,shallow } from 'enzyme';
//import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15';


import CurrentUserProfile from './CurrentUserProfile';
import Header from './Header/Header';
//import GeneralInfo from './GeneralCard/GeneralInfo';
//import ContactInfo from './GeneralCard/GeneralComponents/ContactInfo';


const HeaderProps = {
  isUser: {},
  user: {},
  url: {}
};
Enzyme.configure({adapter:new Adapter()});

// if(Meteor.isClient){
//   describe('Current User Profile', ()=> {
//     it('renders the header', ()=> {
//       const wrapper = shallow(<CurrentUserProfile/>)
//       expect(wrapper.find(<div className="container" />)).to.have.length(1);
//
//     })
//   })
// }

//problem: needs user id to render general info
// describe('Info Card Component render in General Info', () => {
//   it('renders gen info', () => {
//     const wrapper = shallow(<GeneralInfo/>)
//     expect(wrapper.find(<ContactInfo/>));
//   })
// })
