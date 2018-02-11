import React, { Component } from 'react';
import MTextField from '../../Shared/MTextField';
export default class EditRef extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameErr: false,
            posErr: false,
            compErr: false,
            emailErr: false,
            phoneErr: false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let Reference = {
            name: {
                text: this.refs.employerName.value()
            },
            companyName: {
                text: this.refs.companyName.value()
            },
            position: {
                text: this.refs.position.value()
            },
            email: this.refs.email.value(),
            phone: this.refs.empPhone.value()
        };
        Meteor.call('validateReference', Reference, (err) => {
            if (err) {
                this.setState(err.reason);
            } else {
                Meteor.call('updateReference', this.props.reference._id, Reference, (err) => {
                    if (err) console.log(err);
                });
            }
        });
    }
    deletThis(){
        Meteor.call('deleteReference', this.props.reference._id,(err)=>{
            if(err) console.log(err);
        })
    }
    componentDidMount(){
        Materialize.updateTextFields();
    }
    render() {
        let tooLong = "must be between 1 and 250 characters";
        let nameErr = this.state.nameErr ? 'Name ' + tooLong : '';
        let posErr = this.state.posErr ? 'Position ' + tooLong : '';
        let compErr = this.state.compErr ? 'Company name ' + tooLong : '';
        let emailErr = this.state.emailErr ? 'Email not valid' : '';
        let phoneErr = this.state.phoneErr ? 'Not a valid phone no.' : '';
        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <span className="col s10 card-title">
                            Update your Reference
                        </span>
                        <div className="col s2" style={{textAlign:'right'}}>
                            <a onClick={this.deletThis.bind(this)} className="waves-effect" style={{height: '40px', width:'40px',borderRadius:'100%',textAlign: 'center', fontSize: '30px', color: 'red'}}><i className="material-icons">delete_forever</i></a>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col s12 m6">
                                <MTextField ref="employerName" id="employerName" error={nameErr} label="Employer Name" value={this.props.reference.name.text}/>
                            </div>
                            <div className="col s12 m6">
                                <MTextField ref="companyName" id="companyName" error={compErr} label="Company Name" value={this.props.reference.companyName.text}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <MTextField ref="email" id="email" error={emailErr} label="Email" value={this.props.reference.email}/>
                            </div>
                            <div className="col s12 m6">
                                <MTextField ref="empPhone" id="empPhone" error={phoneErr} label="Employer phone no." value={this.props.reference.phone}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <MTextField ref="position" id="position" error={posErr} label="Your position at the job" value={this.props.reference.position.text}/>
                            </div>
                        </div>
                        <div className="center-align">
                          <input type="submit" className="btn blue-grey " data-html="true" value="Update Reference" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
