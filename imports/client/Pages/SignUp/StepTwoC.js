import React, {Component} from 'react';
import MTextField from '../Shared/MTextField';
import ReactDOM from 'react-dom';
import Location from '../Shared/Location';
import { CSSTransitionGroup } from 'react-transition-group';
import {initGA, logPageView} from  '../Shared/GoogleAnalytics';

export default class StepTwoC extends Component{
    constructor(props){
        let savedObject = window.sessionStorage.getItem('reg');

        let firstTime  = !savedObject;
        let UserObjectArray = JSON.parse(savedObject);
        let firstTimeSecondPage = firstTime || !UserObjectArray[1];
        console.log(firstTimeSecondPage);
        console.log(UserObjectArray);

        super(props);
        console.log(props.user);
        this.state = {
        validCompany: true,
        validLocation : true,
        err: false,
        locErr: false,
        companyName: firstTimeSecondPage ? '': UserObjectArray[1].companyName.text,
        webPage : firstTimeSecondPage ? '': UserObjectArray[1].webPage,
        about : firstTimeSecondPage ? '': UserObjectArray[1].about.text,

      };

    }
    handlePrev(){
      let thin = window.sessionStorage.getItem('reg');

      UserObjectArray = JSON.parse(thin);
      this.props.next(1,UserObjectArray[0],false)
    }
    handleNext(){
        let loc = this.refs.loc.getAddress();
          // this.props.next(3, {}, false);
        if(loc.valid){
            this.setState({locErr: false});
            let employerData = {
                companyName: {
                    text: this.refs.cn.value()
                },

                webPage: this.refs.wp.value(),
                location: loc.location,
                about: {
                    text: this.refs.ca.value
                }

            }
            console.log(employerData);
            Meteor.call('validateEmployer', employerData,(err)=>{
                if(err){
                    console.log(err);
                    this.setState(err.reason);
                    this.setState({err: true});
                }else{
                    let user = this.props.user;
                    console.log(employerData);
                    console.log(user);
                    user.profile.employerData = employerData;
                    this.props.next(3, user, false);

                    let savedObject = window.sessionStorage.getItem('reg');

                    let UserObjectArray = JSON.parse(savedObject);
                    UserObjectArray[1] = employerData;
                    window.sessionStorage.setItem('reg',JSON.stringify(UserObjectArray))



                }

            });

        }else{
            this.setState({locErr:true});
        }
    }
    componentDidMount(){
      initGA()
      logPageView()
        let el = ReactDOM.findDOMNode(this.refs.ca);
        $(el).characterCounter();
        $(el).val(this.state.about);
        $(el).trigger('autoresize');

    }
    render(){
        let empty = 'This cannot be empty';
        return(
            <div className="container">
                <div className="card">
                <div className="row card-content">
                    <span className="col s12 card-title">Step 2 of 3</span>

                    <form className="col s12">
                        <div className="row">
                            <div className="col s12">
                            <MTextField ref="cn" id="CompanyName" error={this.state.validCompany ? '': "This field is required"} label="Company Name *" value={this.state.companyName}/>
                            <MTextField ref="wp" id="WebPage" error='' label="Website" value={this.state.webPage}/>


                            <div className="input-field">
                                <textarea ref="ca" id="about" className="materialize-textarea" data-length="250"></textarea>
                                <label htmlFor="about">About You</label>
                            </div>
                            </div>
                        </div>
                        <Location ref="loc"/>
                        <div className="row">

                              <a onClick={this.handlePrev.bind(this)} className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>Back</a>
                              <a onClick={this.handleNext.bind(this)} className="btn-flat teal lighten-5 col s5 offset-s2 m3 offset-m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}}type="submit">Next</a>


                            {this.state.err ? (
                                <CSSTransitionGroup
                                    transitionName="err"
                                    transitionAppear={true}
                                    transitionAppearTimeout={1500}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                                <p className="col s12 m6" style={{textAlign: 'center',lineHeight: '36px', marginTop: '8px',borderRadius: '2px'}}>There are errors with your form</p>
                                </CSSTransitionGroup>
                            ):''}
                            {this.state.locErr ? (
                                <CSSTransitionGroup
                                    transitionName="err"
                                    transitionAppear={true}
                                    transitionAppearTimeout={1500}
                                    transitionEnter={false}
                                    transitionLeave={false}>
                                <p className="col s12 m6" style={{textAlign: 'center',lineHeight: '36px', marginTop: '8px',borderRadius: '2px'}}>You need to verify your address</p>
                                </CSSTransitionGroup>
                            ):''}
                        </div>

                    </form>

                </div>
                </div>
            </div>
        )
    }
}
