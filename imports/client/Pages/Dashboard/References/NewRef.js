import React, {Component} from 'react';
import MTextField from '../../Shared/MTextField';
export default class NewRef extends Component{
    constructor(props){
        super(props);
        this.state={
            nameErr: false,
            posErr: false,
            compErr: false,
            emailErr: false,
            phoneErr: false
        }
    }
    handleSubmit(e){
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
        Meteor.call('validateReference',Reference,(err)=>{
          console.log('createReference');
            if(err){
                this.setState(err.reason);
                console.log(err);
            }else{
                Meteor.call('createReference',Reference,(err)=>{
                  console.log("things things");
                    if(err) console.log(err);
                    else{
                        this.refs.employerName.reset();
                        this.refs.companyName.reset();
                        this.refs.position.reset();
                        this.refs.email.reset();
                        this.refs.empPhone.reset();
                    }
                });
            }
        });
    }
    render(){
        let tooLong = "must be between 1         and 250 characters";
        let nameErr = this.state.nameErr ? 'Name '+ tooLong : '';
        let posErr = this.state.posErr ? 'Position ' + tooLong : '';
        let compErr = this.state.compErr ? 'Company name ' + tooLong: '';
        let emailErr = this.state.emailErr ? 'Email not valid':'';
        let phoneErr = this.state.phoneErr ? 'Not a valid phone no.' : '';
        return(
            <div className="card">
                <div className="card-content">
                    <span className="card-title">
                        Add a Reference
                    </span>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="col s12 m6">
                                <MTextField ref="employerName"id="employerName" error={nameErr} label="Employer Name"/>
                            </div>
                            <div className="col s12 m6">
                                <MTextField ref="companyName"id="companyName" error={compErr} label="Company Name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <MTextField ref="email"id="email" error={emailErr} label="Email"/>
                            </div>
                            <div className="col s12 m6">
                                <MTextField ref="empPhone"id="empPhone" error={phoneErr} label="Employer phone no."/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <MTextField ref="position"id="position" error={posErr} label="Your position at the job"/>
                            </div>
                        </div>

                        <input type="submit" className="btn blue-grey " data-html="true" value="Add Reference" />

                    </form>
                </div>
            </div>
        )
    }
}
