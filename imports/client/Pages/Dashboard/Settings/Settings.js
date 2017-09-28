import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Notifications from './Settings/Notifications';
import PasswordChange from './Settings/PasswordChange';
import Subscription from './Settings/Subscription';

export default class Settings extends Component {
    render() {
        const url = this.props.match.url;

        return (
            <div>
                <Route path={url + '/notifications'} component={Notifications} />
                <Route path={url + '/password'} component={PasswordChange} />
                <Route path={url + '/subscription'} component={Subscription} />
            </div>
        );
    }
}
