import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';


import '../imports/client/App';
import '../imports/client/Verification';

Meteor.startup(()=>{
    window.localStorage.setItem('isPro',true);
});
