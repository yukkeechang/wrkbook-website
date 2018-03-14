import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import MTextField from '../../Shared/MTextField';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class EmailChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oeError: '',
            neError: ''
        };
    }

    componentDidMount(){
      let dropdowns = ReactDOM.findDOMNode();
      // $(dropdowns).ready(()=>{
      //
      //   $('.modal').modal({
      //      complete: function() { this.props.history.push('/') }.bind(this)
      //   });
      // });
    }

    closeModal() {
      $('#modal1').modal('close');
      $('#modal2').modal('close');
      $('#modal3').modal('close');
    }



    handleSubmit(event) {
        event.preventDefault();
        let user = Meteor.user();
        // Clear the error messages of each field
        Object.keys(this.state).map((key) => {
            this.setState({[key]: ''});
        });
        // Check if the email entered into the new email field matches our format
        const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.refs.newEmail.value());
        let oldEmailMatch = user.emails[0].address == this.refs.oldEmail.value();
        let Emails = {
          email1 : this.refs.newEmail.value(),
          email2 : user.emails[0].address
        }
        if (emailIsValid && oldEmailMatch) {
          Meteor.call('updateEmail', Emails, function(err, res){
            if(err) {
              console.log(err.reason)
              if(err.reason == "Email already exists.") {
                $('#modal2').modal('open');
              } else {
                $('#modal3').modal('open');
              }
            } else {
              $('#modal1').modal('open');
            }
          })
        } else {
          if(!emailIsValid) {
            this.setState({neError: "Wrong email format"})
          }
          else if(!oldEmailMatch) {
            this.setState({neError: "Email does not match old email"})
          }

        }
        let empty = 'This cannot be empty';
        // Set the error messages to be "this cannot be empty" if they are empty
        if (!this.refs.oldEmail.value()) {
            this.setState({oeError: empty});
        }
        if (!this.refs.newEmail.value()) {
            this.setState({neError: empty});
        }

    }

    render() {
      let user = Meteor.user()
        return (

                <div className="card">
                    <div className="card-content center-align" style={{paddingTop: '-10px'}}>
                        <h5>Change email</h5>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-field">
                                <MTextField id="oldEmail" ref="oldEmail" type="email" error={this.state.oeError} label="Old email" required />
                            </div>
                            <div className="input-field">
                                <MTextField id="newEmail" ref="newEmail" type="email" error={this.state.neError} label="New email" required />
                            </div>
                            <div className="input-field">
                                <input type="submit" className="waves-effect waves-light btn" />
                            </div>
                        </form>
                    </div>


                <div id="modal1" className="modal">
                  <div className="modal-content">
                    <h5>Your email has been sucessfully changed!</h5>
                  </div>
                  <div className="modal-footer">
                  <Link style={{padding:'0px'}} to={"/profile"}>
                   <a className="modal-action modal-close waves-effect waves-gray btn-flat" onClick={this.closeModal.bind(this)}>Close</a>
                  </Link>
                  </div>
                </div>
                <div id="modal2" className="modal">
                  <div className="modal-content">
                    <h5>This email already exists!</h5>
                  </div>
                  <div className="modal-footer">
                    <Link style={{padding:'0px'}} to={"/settings/password"}>
                      <a className="modal-action modal-close waves-effect waves-gray btn-flat" onClick={this.closeModal.bind(this)}>Close</a>
                    </Link>
                  </div>
                </div>
                <div id="modal3" className="modal">
                  <div className="modal-content">
                    <h5>Error updating email. Please try again later or contact info@wrkbook.com</h5>
                  </div>
                  <div className="modal-footer">
                    <Link style={{padding:'0px'}} to={"/settings/password"}>
                      <a className="modal-action modal-close waves-effect waves-gray btn-flat" onClick={this.closeModal.bind(this)}>Close</a>
                    </Link>
                  </div>
                </div>


            </div>
        )
    }
}
