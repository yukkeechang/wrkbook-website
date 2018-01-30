import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import MTextField from '../../Shared/MTextField';
import ReactDOM from 'react-dom';

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
      $(dropdowns).ready(()=>{

        $('.modal').modal({
           complete: function() { this.props.history.push('/') }.bind(this)
        });
      });


    }


    handleSubmit(event) {
        event.preventDefault();
        let user = Meteor.user();
        // Clear the error messages of each field
        Object.keys(this.state).map((key) => {
            this.setState({[key]: ''});
        });
        console.log(this.refs.newEmail.value());
        // Check if the email entered into the new email field matches our format
        const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.refs.newEmail.value());
        let oldEmailMatch = user.emails[0].address == this.refs.oldEmail.value();

        if (emailIsValid && oldEmailMatch) {
          console.log("EMAIL IS VALID AND OLD EMAIL IS CORRECT");
          Meteor.call('updateEmail', user.emails[0].address, this.refs.newEmail.value(), function(err, res){
            if(err) {
              console.log("ERROR IN UPDATE EMAIL"+err)
            } else {
              console.log("uh email changed")
              console.log(user.emails[0].address)
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
      console.log(user)
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
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Aiight Bet</a>
                  </div>
                </div>

            </div>
        )
    }
}

// export default EmailChange = withTracker(props => {
//   let user = Meteor.user();
//
// })
