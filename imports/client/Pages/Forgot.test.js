import React from 'react';
import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { configure,shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Header from './Shared/Header';
import Forgot from './Forgot';
import Footer from './Shared/Footer';
import MTextField from './Shared/MTextField';
import Adapter from 'enzyme-adapter-react-15';


Enzyme.configure({ adapter: new Adapter()});


if ( Meteor.isClient ) {
  describe('<Forgot />',()=>{
      it('renders components that make up forgot page ',()=>{
        const wrapper = shallow(<Forgot/>);
        expect(wrapper.find(Header)).to.have.length(1);
        expect(wrapper.find(Footer)).to.have.length(1);
        expect(wrapper.find(MTextField)).to.have.length(1);
        expect(wrapper.find('a')).to.have.length(1);
      });
      it('proply switches components for forgot page ',()=>{
        const wrapper = shallow(<Forgot/>);
        expect(wrapper.find(MTextField)).to.have.length(1);
        expect(wrapper.find('a')).to.have.length(1);
        wrapper.setState({showEmail:true});
        expect(wrapper.find(MTextField)).to.have.length(0);
        expect(wrapper.find('a')).to.have.length(0);

      });

  });
}
