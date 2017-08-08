import React, {Component} from 'react';
import MTextField from '../Shared/MTextField';
import ReactDOM from 'react-dom';
import Location from '../Shared/Location';
export default class StepTwoE extends Component{
    constructor(props){

        super(props);
        console.log(props.user);
        this.state = {
            validJobTitles: true,
            validEdu: true,
            validLang: true,
            validOsha: true,
            validAbout: true,
            validSkills : true,
            validLocation: true,
            validCar: true,
            validDriver: true,
            validTools: true,
            validDistance: true,
            dist: '25'
        };
    }
    handleNext(){
        let loc = this.refs.loc.getAddress();
        if(loc.valid){
            let employeeData = {
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
            console.log(employeeData);
            Meteor.call('validateEmployee', employeeData,(err)=>{
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
        let title = ReactDOM.findDOMNode(this.refs.titles);
        $(title).material_select();
        let langs = ReactDOM.findDOMNode(this.refs.langs);
        $(langs).material_select();
        let dist = ReactDOM.findDOMNode(this.refs.dist);
        noUiSlider.create(dist, {
        start: [25],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
            'min': 0,
            'max': 100
        },
        format: wNumb({
            decimals: 0
        })
        });
        dist.noUiSlider.on('update',(value, handle)=>{
            this.setState({dist: value});
        })
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
                            <div className="input-field col s12">
                                <select multiple ref="titles" defaultValue={["0"]}>
                                <option value="0" disabled>Choose one or more</option>
                                <option value="1">Painter</option>
                                <option value="2">Demolititoner</option>
                                <option value="3">Masonry/Stone Worker</option>
                                <option value="4">Concrete Finisher</option>
                                <option value="5">Plumber</option>
                                <option value="6">Electrician</option>
                                <option value="7">Heat/Air conditioning Worker</option>
                                </select>
                                <label>Job Titles *</label>
                            </div>
                            <div className="input-field col s12">
                                <select multiple ref="langs" defaultValue={["0"]}>
                                <option value="0" disabled>Choose one or more</option>
                                <option value="1">English</option>
                                <option value="2">Spanish</option>
                                <option value="4">Chinese</option>
                                <option value="5">French</option>
                                <option value="6">Tagalog</option>
                                <option value="7">Vietnamese</option>
                                <option value="8">Arabic</option>
                                <option value="9">Korean</option>
                                <option value="10">German</option>
                                <option value="11">Russian</option>
                                <option value='12'>Portuguese</option>
                                <option value="13">Italian</option>
                                <option value="14">Polish</option>
                                </select>
                                <label>Languages I Speak *</label>
                            </div>
                            <div className="col s12">
                            <div className="input-field">
                                <textarea ref="sk" id="skills" className="materialize-textarea" data-length="250"></textarea>
                                <label htmlFor="skills">Addional skills you have</label>
                            </div>
                            <div className="input-field">
                                <textarea ref="ca" id="about" className="materialize-textarea" data-length="250"></textarea>
                                <label htmlFor="about">About You</label>
                            </div>
                            <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Distance You're willing to travel <span style={{fontWeight:'bold'}}>{this.state.dist} miles</span></p>
                            <div ref="dist"></div>
                            </div>


                        </div>
                        <div className="row">
                            <div className="col s6">
                                <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Can you bring your own tools?</p>
                                <p>
                                <input ref="ty"name="tools" type="radio" id="ty" defaultChecked=''/>
                                <label htmlFor="ty">Yes</label>
                                </p>
                                <p>
                                <input ref="tn"name="tools" type="radio" id="tn" defaultChecked="checked"/>
                                <label htmlFor="tn">No</label>
                                </p>
                            </div>
                            <div className="col s6">
                                <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Do you have a driver's license</p>
                                <p>
                                <input ref="dy"name="driver" type="radio" id="dy" defaultChecked=''/>
                                <label htmlFor="dy">Yes</label>
                                </p>
                                <p>
                                <input ref="dn"name="driver" type="radio" id="dn" defaultChecked="checked"/>
                                <label htmlFor="dn">No</label>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Do you have a car?</p>
                                <p>
                                <input ref="cy"name="car" type="radio" id="cy" defaultChecked=''/>
                                <label htmlFor="cy">Yes</label>
                                </p>
                                <p>
                                <input ref="cn"name="car" type="radio" id="cn" defaultChecked="checked"/>
                                <label htmlFor="cn">No</label>
                                </p>
                            </div>
                            <div className="col s6">
                                <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>What is your osha certification level</p>
                                <p>
                                <input ref="on"name="osha" type="radio" id="on" defaultChecked=''/>
                                <label htmlFor="on">None</label>
                                </p>
                                <p>
                                <input ref="o1"name="osha" type="radio" id="o1" defaultChecked="checked"/>
                                <label htmlFor="o1">Osha 10</label>
                                <input ref="o3"name="osha" type="radio" id="o3" defaultChecked="checked"/>
                                <label htmlFor="o3">Osha 30</label>
                                </p>
                            </div>
                            <div className="col s12">
                                <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Education</p>
                                <p>
                                <input ref="hs"name="edu" type="radio" id="hs" defaultChecked=''/>
                                <label htmlFor="hs">HighSchool/GED</label>
                                </p>
                                <p>
                                <input ref="ts"name="edu" type="radio" id="ts" defaultChecked="checked"/>
                                <label htmlFor="ts">Trade Shool</label>
                                </p>
                                <p>
                                <input ref="he"name="edu" type="radio" id="he" defaultChecked="checked"/>
                                <label htmlFor="he">Higher Education</label>
                                </p>
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
