import React , { Component } from 'react';
import Header from '../Shared/Header';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import P from './StepTwo/P';
import C from './StepTwo/C';
export default class StepTwo extends Component {
    constructor(props){
        super(props);
    }
    render(){
        let uType = this.props.isPro ?  <P/> : <C/>;
        return(
            <div style={{
                width: '100%',
            }}>
                {uType}
            </div>
        );
    }
}
