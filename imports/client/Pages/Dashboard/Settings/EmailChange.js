import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import MTextField from '../../Shared/MTextField';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

export default class EmailChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
          isEmail:true,
          eEmpty :false,
          nEqual :false,
          sameEmail:false,
          existAlready:false
        };
    }

    componentDidMount(){

    }
    handleSubmit(event) {
        event.preventDefault();
        let Emails = {
          email1 : this.refs.newEmail1.value(),
          email2 :  this.refs.newEmail2.value()
        }

        Meteor.call('updateEmail', Emails, (err, res)=>{
          if(err){
            console.log(err);
            this.setState(err.reason);
          }else{
            this.setState({
              isEmail:true,
              eEmpty :false,
              nEqual :false,
              sameEmail:false,
              existAlready:false
            });
            M.toast({html:'Your Email has been Updated'});
          }

        });
    }



    render() {
        let empty = 'This cannot be empty';
        let notEmail = 'This is not a valid email';
        let emailneq = 'Emails do not match';
        return (

                <div className="card">
                    <div className="card-content center-align" style={{paddingTop: '-10px'}}>
                        <h5>Change email</h5>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                          <MTextField id="newEmail1" ref="newEmail1" type="email" error={this.state.eEmpty ? empty: (!this.state.isEmail ? notEmail : '')} label="New Email *" required />
                          <MTextField id="newEmail2" ref="newEmail2" type="email" error={this.state.nEqual ? emailneq: ''} label="Confirm Email *" required />
                          <button onClick={this.handleSubmit.bind(this)} className="btn-flat teal lighten-5" style={{color: 'black'}}>Update</button>
                        </form>

                        <div className="row">
                            {this.state.sameEmail ? (
                                <CSSTransitionGroup
                                    transitionName="err"
                                    transitionAppear={true}
                                    transitionAppearTimeout={1500}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                                <p className="col s12 m6" style={{textAlign: 'center',lineHeight: '36px', marginTop: '8px',borderRadius: '2px'}}>The new email is the same you registered with</p>
                                </CSSTransitionGroup>
                            ):''}
                            {this.state.existAlready ? (
                                <CSSTransitionGroup
                                    transitionName="err"
                                    transitionAppear={true}
                                    transitionAppearTimeout={1500}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                                <p className="col s12 m6" style={{textAlign: 'center',lineHeight: '36px', marginTop: '8px',borderRadius: '2px'}}>This email address has already been taken</p>
                                </CSSTransitionGroup>
                            ):''}
                        </div>
                    </div>
                </div>
        )
    }
}
