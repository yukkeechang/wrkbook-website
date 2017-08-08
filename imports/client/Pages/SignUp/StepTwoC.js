import React, {Component} from 'react';
import MTextField from '../Shared/MTextField';
import ReactDOM from 'react-dom';
import Location from '../Shared/Location';
export default class StepTwoC extends Component{
    constructor(props){

        super(props);
        console.log(props.user);
        this.state = {
        validCompany: true,
        validAbout : true,
        validLocation : true,
        validWeb: true,
        validLicense: true
      };
    }
    handleNext(){
        let loc = this.refs.loc.getAddress();
        if(loc.valid){
            let employerData = {
                companyName: {
                    text: this.refs.cn.value()
                },
                licenseNumber: this.refs.ln.value(),
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
                }else{
                    let user = this.props.user
                    user.profile.employerData = employerData;
                    console.log(user);
                    this.props.next(3, user, false);
                }
            })
        }else {
           Materialize.toast('Please Verify Your Address', 4000);
        }
    }
    componentDidMount(){
        let el = ReactDOM.findDOMNode(this.refs.ca);
        $(el).characterCounter();
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
                            <MTextField ref="cn" id="CompanyName" error='' label="Company Name *"/>
                            <MTextField ref="wp" id="WebPage" error='' label="Website"/>
                            <MTextField ref="ln" id="LicenseNumber" error='' label="License Number"/>

                            <div className="input-field">
                                <textarea ref="ca" id="about" className="materialize-textarea" data-length="250"></textarea>
                                <label htmlFor="about">About You</label>
                            </div>
                            </div>
                        </div>
                    <Location ref="loc"/>
                        <a onClick={this.handleNext.bind(this)}type="submit"className="waves-effect waves-light btn">Next</a>
                    </form>

                </div>
                </div>
            </div>
        )
    }
}
