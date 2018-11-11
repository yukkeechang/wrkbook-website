import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App  from '../imports/client/App';
import '../imports/client/Verification';
import '../imports/client/Collections';
Meteor.startup(()=>{
    // console.log('things should be happening', new Date());
    render(<App/>, document.getElementById('render-target'));
    window.localStorage.setItem('isPro',true);

});
