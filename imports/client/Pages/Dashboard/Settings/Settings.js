import React, { Component } from 'react';
import {Switch, Route ,Link} from 'react-router-dom';
import Notifications from './Notifications';
import PasswordChange from './PasswordChange';
import Subscription from './Subscription';
import Payment from './Payment';
import Footer from '../../Shared/Footer';
import SettingMenu from './SettingMenu';
import NotFound from '../../../Pages/NotFound';
export default class Settings extends Component {
    render() {
        const url = this.props.match.url;
    
        return (
            <div>
            <Switch>
                <Route exact path={ url } render={()=><SettingMenu/> } />
                <Route exact path={url + '/notifications'} component={Notifications} />
                <Route exact path={url + '/password'} component={PasswordChange} />
                <Route exact path={url + '/subscription'} component={Subscription} />
                <Route exact path={url + '/payment'} component={Payment} />
                <Route path="*" component={NotFound}/>
            </Switch>




          </div>
        );
    }
}
