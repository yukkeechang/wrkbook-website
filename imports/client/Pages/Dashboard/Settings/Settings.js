import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Notifications from './Notifications';
import PasswordChange from './PasswordChange';
import Subscription from './Subscription';
//import Payment from './Payment';

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
//  <Route path={url + '/payment'} component={Payment} />
