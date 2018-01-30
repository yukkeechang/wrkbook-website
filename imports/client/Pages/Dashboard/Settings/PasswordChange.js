import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import MTextField from '../../Shared/MTextField';
import ReactDOM from 'react-dom';
import EmailChange from './EmailChange';

export default class PasswordChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // The error messages that will go alongside each input field
            opError: '',
            npError: '',
            np2Error: '',
        };
    }

    componentDidMount(){
      let dropdowns = ReactDOM.findDOMNode();
      $(dropdowns).ready(()=>{

        $('.modal').modal({
           complete: function() { this.props.history.push('/') }.bind(this)
        });
      });


    }


    handleSubmit(event) {
        event.preventDefault();

        // Clear the error messages of each field
        Object.keys(this.state).map((key) => {
            this.setState({[key]: ''});
        });

        // Check if the password entered into the new password field matches our format
        const passIsValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{8,}$/.test(this.refs.newPass.value());

        // If new passwords match and fit our format, call Accounts.changePassword()
        if (this.refs.newPass.value() === this.refs.newPass2.value() && passIsValid) {
            Accounts.changePassword(this.refs.oldPass.value(), this.refs.newPass.value(), (err) => {
                // If the old password doesn't match what Meteor has on file, spit back an error
                if (err && err.reason === "Incorrect password") {
                    this.setState({opError: 'Old password is incorrect'});
                }else {
                  $('#').modal('open');
                }
            });
        } else {
            // Various errors messages for incorrect input cases
            if (!passIsValid) {
                this.setState({npError: "New password must have a number, capital letter, and at least 8 characters"})
            } else if (this.refs.newPass.value() !== this.refs.newPass2.value()) {
                this.setState({np2Error: "New passwords don't match"})
            }
        }

        let empty = 'This cannot be empty';

        // Set the error messages to be "this cannot be empty" if they are empty
        if (!this.refs.oldPass.value()) {
            this.setState({opError: empty});
        }
        if (!this.refs.newPass.value()) {
            this.setState({npError: empty});
        }
        if (!this.refs.newPass2.value()) {
            this.setState({np2Error: empty});
        }
    }

    render() {
        return (
            <div className="container">
            <EmailChange/>
                <div className="card">
                    <div className="card-content center-align" style={{paddingTop: '-10px'}}>
                        <h5>Change Password</h5>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-field">
                                <MTextField id="oldPass" ref="oldPass" type="password" error={this.state.opError} label="Old Password" required />
                            </div>
                            <div className="input-field">
                                <MTextField id="newPass" ref="newPass" type="password" error={this.state.npError} label="New Password" required />
                            </div>
                            <div className="input-field">
                                <MTextField id="newPass2" ref="newPass2" type="password" error={this.state.np2Error} label="New Password (Again)" required />
                            </div>
                            <div className="input-field">
                                <input type="submit" className="waves-effect waves-light btn" />
                            </div>
                        </form>
                    </div>
                </div>

                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h5>Your password has been sucessfully changed!</h5>

                  </div>
                  <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Aiight Bet</a>
                  </div>

                </div>
            </div>
        )
    }
}
