import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MTextField from '../Shared/MTextField';
import {initGA, logPageView} from  '../Shared/GoogleAnalytics';
export default class StepOne extends Component{
    constructor(props){

        super(props);
        let savedObject = window.sessionStorage.getItem('reg');

        let firstTime  = !savedObject;
        let UserObjectArray = JSON.parse(savedObject);
        this.state = {
          fEmpty : false,
          lEmpty : false,
          eEmpty : false,
          isEmail: true,
          phoneE : false,
          gPhone : true,
          pValid : true,
          nEqual : false,
          p1Empty: false,
          accountExists: false,
          firstName : firstTime ? '': UserObjectArray[0].profile.firstName,
          lastName: firstTime ? '': UserObjectArray[0].profile.lastName,
          phone:  firstTime ? '': UserObjectArray[0].profile.phone,
          email:  firstTime ? '': UserObjectArray[0].email,
          pro: props.isPro
      };
    }
    componentDidMount(){
        initGA()
        logPageView()
        let tooltip = ReactDOM.findDOMNode(this.refs.tool);
        $(tooltip).tooltip({delay: 50});
        $(ReactDOM.findDOMNode(this)).ready(function() {
          Materialize.updateTextFields();
        });

    }
    handleNext(e){

        e.preventDefault();
        let fn = this.refs.fn.value();
        let ln = this.refs.ln.value();
        let em = this.refs.em.value();
        let ph = this.refs.ph.value();
        let p1 = this.refs.p1.value();
        let p2 = this.refs.p2.value();
        let User = {
            email: em,
            password: p1,
            password2:p2,
            profile: {
                firstName: fn,
                lastName : ln,
                phone    : ph,
                isPro    : this.refs.pro.checked
            }
        }
        Meteor.call('validateBasicUserData', User, (err)=>{
            if(err){
                this.setState(err.reason);
            }else{
                let savedObject = window.sessionStorage.getItem('reg');
                let UserObjectArray = JSON.parse(savedObject);
                console.log(UserObjectArray);
                if(!UserObjectArray || UserObjectArray.length < 1){
                    UserObjectArray = [User];
                }else{
                    UserObjectArray[0] = User;
                }

                window.sessionStorage.setItem('reg',JSON.stringify(UserObjectArray));
                this.props.next(2, User, this.state.pro);

            }

        });
    }
    con(){
        this.setState({pro : false});
    }
    pro(){
        this.setState({pro : true});
    }
    render(){
        let empty = 'This cannot be empty';
        let uExists = 'User with this email already exists';
        let notEmail = 'This is not a valid email';
        let pass = 'Not a valid password';
        let pequ = 'Passwords do not match';
        let phErr = 'Not a valid phone number';

        return(
            <div className="container">
                <div className="card">
                <div className="row card-content">
                    <span className="col s12 card-title">Step 1 of 3</span>

                    <form className="col s12">
                    <div className="row">
                        <div className="col s12 m6">
                            <MTextField ref="fn" id="firstName" error={this.state.fEmpty ? empty : ''} label="First Name *" value={this.state.firstName}/>
                            <MTextField ref="ln" id="lastName"  error={this.state.lEmpty ? empty : ''} label="Last Name *"  value={this.state.lastName}/>
                            <MTextField ref="em" id="email"     error={this.state.eEmpty ? empty : (!this.state.isEmail ? notEmail : (this.state.accountExists ? uExists : ''))} label="Email Address *" value={this.state.email}/>
                            <MTextField ref="ph" id="phone"     error={this.state.phoneE ? empty : (!this.state.gPhone? phErr:'')} label="Phone Number *" value={this.state.phone}/>
                        </div>
                        <div className="col s12 m6">
                            <MTextField style={{display:'inline-block',width:'90%'}} ref="p1" id="pass1"     error={this.state.p1Empty? empty : (!this.state.pValid ? pass : '')} type="password" label="Password *"/><i ref="tool" style={{whiteSpace:'pre',color:'#888'}}className="material-icons tooltipped" data-html="true" data-background-color="#888"data-tooltip="Password must contain at least 8 characters,</br> a capital letter and a number.">info</i>
                            <MTextField ref="p2" id="pass2"     error={this.state.nEqual ? pequ: ''} type="password" label="Confirm Password *"/>

                            <p>
                            <input ref="con"name="group1" type="radio" id="test1" onClick={this.con.bind(this)} defaultChecked={(this.props.isPro)? '' :"checked"}/>
                            <label htmlFor="test1">Contractor</label>
                            </p>
                            <p>
                            <input ref="pro"name="group1" type="radio" id="test2" onClick={this.pro.bind(this)} defaultChecked={(this.props.isPro)? "checked" :''}/>
                            <label htmlFor="test2">Professional</label>
                            </p>
                        </div>
                    </div>
                    <button onClick={this.handleNext.bind(this)} className="btn-flat pale-teal col s5 m3" style={{color: 'black'}}>Next</button>
                    </form>
                </div>

                </div>
            </div>
        )
    }
}
