import React, { Component } from 'react';

export default class Notifications extends Component {
    handleSubmit(event) {
        // To add in. Ultimately this component could use update user
        // notification state on each input change instead of on submit

        event.preventDefault();
    }

    render() {
        return (
            <div id="notifications" className="container">
                <div className="card">
                    <div className="card-content center-align">
                        <h4>Notifications</h4>
                        <div className="left-align">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <h5>Email</h5>
                                <div className="col s6">
                                    <p>
                                        <input id="ne-e" type="checkbox" className="filled-in" defaultChecked="checked"/>
                                        <label htmlFor="email-ne">New employee matches</label>
                                    </p>
                                    <p>
                                        <input id="ec-e" type="checkbox" className="filled-in" defaultChecked="checked"/>
                                        <label htmlFor="email-ec">New employee confirmations</label>
                                    </p>
                                    <p>
                                        <input id="nm-e" type="checkbox" className="filled-in" defaultChecked="checked"/>
                                        <label htmlFor="nm-e">New messages</label>
                                    </p>
                                    {/*<p>
                                        <input id="al-e" type="checkbox" className="filled-in" defaultChecked="checked"/>
                                        <label htmlFor="al-e">Alerts, news, updates from Wrkbook</label>
                                    </p>*/}
                                </div>
                                <br/>
                                <h5>Text Message</h5>
                                <div className="col s6">
                                    <p>
                                        <input id="ne-t" type="checkbox" className="filled-in" defaultChecked=""/>
                                        <label htmlFor="ne-t">New employee matches</label>
                                    </p>
                                    <p>
                                        <input id="ec-t" type="checkbox" className="filled-in" defaultChecked=""/>
                                        <label htmlFor="ec-t">New employee confirmations</label>
                                    </p>
                                    <p>
                                        <input id="nm-t" type="checkbox" className="filled-in" defaultChecked=""/>
                                        <label htmlFor="nm-t">New messages</label>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}