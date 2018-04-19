import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import MTextField from '../../Shared/MTextField';
import ReactDOM from 'react-dom';
import EmailChange from './EmailChange';

export default class PasswordChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
          nEqual:false,
          pValid :true,
          p1Empty:false,
          oldValid:true

        };
    }

    componentDidMount(){



    }


    handleSubmit(event) {
        event.preventDefault();

        passwords ={
          password1: this.refs.newPass.value(),
          password2:  this.refs.newPass2.value()
        }


        Meteor.call('checkPasswords',passwords,(err)=>{
          if(err){
            this.setState(err.reason);
          }else{
            Accounts.changePassword(this.refs.oldPass.value(), this.refs.newPass.value(), (err) => {
                // If the old password doesn't match what Meteor has on file, spit back an error
                if (err && err.reason === "Incorrect password") {
                    this.setState({oldValid: false});
                }else {
                  Materialize.toast('Your Password has been changed',4000);
                  this.setState({
                    nEqual:false,
                    pValid :true,
                    p1Empty:false,
                    oldValid:true
                  });
                }
            });
          }
        });


    }


    render() {
      let pass = 'This password is incorrect'
      let empty = 'This cannot be empty';
      let notpass = 'This is not a valid password';
      let passneq = 'passwords do not match';
        return (
            <div className="container">
            <EmailChange/>
                <div className="card">
                    <div className="card-content center-align" style={{paddingTop: '-10px'}}>
                        <h5>Change Password</h5>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <MTextField id="oldPass" ref="oldPass" type="password" error={!this.state.oldValid ? pass:''} label="Old Password" required />
                            <MTextField id="newPass" ref="newPass" type="password" error={this.state.p1Empty ? empty : (!this.state.pValid ? notpass : '')} label="New Password *" required />
                            <MTextField id="newPass2" ref="newPass2" type="password" error={this.state.nEqual ? passneq: ''} label="Confirm Password *" required />
                            <button onClick={this.handleSubmit.bind(this)} className="btn-flat teal lighten-5" style={{color: 'black'}}>Update</button>
                        </form>
                    </div>
                </div>


            </div>
        )
    }
}
