import React, {Component} from 'react';
import MTextField from '../Shared/MTextField';
import ReactDOM from 'react-dom';
import Location from '../Shared/Location';
import { CSSTransitionGroup } from 'react-transition-group';

export default class StepTwoE extends Component{
    constructor(props){

        super(props);
        this.state = {
            validJobTitles: true,
            validEdu: true,
            validLang: true,
            validOsha: true,
            validLocation: true,
            validCar: true,
            validDriver: true,
            validTools: true,
            validDistance: true,

            locErr: false,
            err: false,
            dist: 20

        };
    }
    handleNext(){
        let loc = this.refs.loc.getAddress();
        if(loc.valid){
            this.setState({locErr: false});
            let employeeData = {
                jobTitle: $(this.refs.titles).val(),
                languages: $(this.refs.langs).val(),
                osha: {
                    osha10: this.refs.o1.checked,
                    osha30: this.refs.o3.checked
                },
                about: {
                    text: this.refs.ea.value
                },
                skills: {
                    text: this.refs.sk.value
                },
                education: {
                    highGED : this.refs.hs.checked,
                    tradeSchool:this.refs.ts.checked,
                    higherEdu: this.refs.he.checked
                },
                location: loc.location,
                hasCar: this.refs.cy.checked,
                driverLicense: this.refs.dy.checked,
                bringTools: this.refs.ty.checked,
                maxDistance: this.state.dist
            }

            Meteor.call('validateEmployee', employeeData,(err)=>{
                if(err){
                    console.log(err);

                    this.setState(err.reason,()=>{
                        let title = ReactDOM.findDOMNode(this.refs.titles);
                        $(title).material_select();
                        let langs = ReactDOM.findDOMNode(this.refs.langs);
                        $(langs).material_select();
                    });
                    this.setState({err: true});
                }else{
                    let user = this.props.user;
                    user.profile.employeeData = employeeData;
                    this.props.next(3, user, false);
                }
<<<<<<< HEAD
            })
        }else {
           Materialize.toast('Please Verify Your Address', 4000);
=======
            });
        }else{
            this.setState({locErr:true});
>>>>>>> 54caaad1b079c9b92bb81388a9c8c43505ada6eb
        }
    }
    componentDidMount(){
        let title = ReactDOM.findDOMNode(this.refs.titles);
        $(title).material_select();
        let langs = ReactDOM.findDOMNode(this.refs.langs);
        $(langs).material_select();
        let dist = ReactDOM.findDOMNode(this.refs.dist);
        noUiSlider.create(dist, {
<<<<<<< HEAD
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
=======
            start: [20],
            connect: true,
            step: 1,
            orientation: 'horizontal',
            range: {
                'min': 0,
                'max': 100
            },
            format: wNumb({
                decimals: 0
            })
>>>>>>> 54caaad1b079c9b92bb81388a9c8c43505ada6eb
        });
        dist.noUiSlider.on('change',(value, handle)=>{
            this.setState({dist: parseInt(value[0])});
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
                                <select className={this.state.validJobTitles? '':"invalid"} multiple ref="titles" defaultValue={["0"]}>
                                <option value="0" disabled>Choose one or more</option>
<<<<<<< HEAD
                                <option value="1">Painter</option>
                                <option value="2">Demolititoner</option>
                                <option value="3">Masonry/Stone Worker</option>
                                <option value="4">Concrete Finisher</option>
                                <option value="5">Plumber</option>
                                <option value="6">Electrician</option>
                                <option value="7">Heat/Air conditioning Worker</option>
=======
                                <option value="Painter">Painter</option>
                                <option value="Demolititoner">Demolititoner</option>
                                <option value="Masonry/Stone Worker">Masonry/Stone Worker</option>
                                <option value="Concrete Finisher">Concrete Finisher</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Heat/Air conditioning Worker">Heat/Air conditioning Worker</option>
>>>>>>> 54caaad1b079c9b92bb81388a9c8c43505ada6eb
                                </select>
                                <label>Job Titles *</label>
                            </div>
                            <div className="input-field col s12">
                                <select className={this.state.validLang ? '':"invalid"} multiple ref="langs" defaultValue={["0"]}>
                                <option value="0" disabled>Choose one or more</option>
<<<<<<< HEAD
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
=======
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Chinese">Chinese</option>
                                <option value="French">French</option>
                                <option value="Tagalog">Tagalog</option>
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Korean">Korean</option>
                                <option value="German">German</option>
                                <option value="Russian">Russian</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Italian">Italian</option>
                                <option value="Polish">Polish</option>
>>>>>>> 54caaad1b079c9b92bb81388a9c8c43505ada6eb
                                </select>
                                <label>Languages I Speak *</label>
                            </div>
                            <div className="col s12">
                            <div className="input-field">
                                <textarea ref="sk" id="skills" className="materialize-textarea" data-length="250"></textarea>
                                <label htmlFor="skills">Addional skills you have</label>
                            </div>
                            <div className="input-field">
                                <textarea ref="ea" id="about" className="materialize-textarea" data-length="250"></textarea>
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
                                <input ref="on"name="osha" type="radio" id="on" defaultChecked='checked'/>
                                <label htmlFor="on">None</label>
                                </p>
                                <p>
                                <input ref="o1"name="osha" type="radio" id="o1"/>
                                <label htmlFor="o1">Osha 10</label>
                                <input ref="o3"name="osha" type="radio" id="o3"/>
                                <label htmlFor="o3">Osha 30</label>
                                </p>
                            </div>
                            <div className="col s12">
                                <p className="gen-text" style={{color:'#9e9e9e',marginBottom:'8px'}}>Education</p>
                                <p>
                                <input ref="hs" type="checkbox" id="hs" defaultChecked="checked"/>
                                <label htmlFor="hs">HighSchool/GED</label>
                                </p>
                                <p>
                                <input ref="ts" type="checkbox" id="ts"/>
                                <label htmlFor="ts">Trade Shool</label>
                                </p>
                                <p>
                                <input ref="he" type="checkbox" id="he"/>
                                <label htmlFor="he">Higher Education</label>
                                </p>
                            </div>
                        </div>
                        <Location ref="loc"/>
<<<<<<< HEAD
                        <a onClick={this.handleNext.bind(this)}type="submit"className="waves-effect waves-light btn">Next</a>
                    </form>

=======
                        <div className="row">
                            <a onClick={this.handleNext.bind(this)} className="btn-flat teal lighten-5 col s12 m6" style={{color: 'black',textAlign:'center',marginTop: '8px'}}type="submit">Next</a>
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

>>>>>>> 54caaad1b079c9b92bb81388a9c8c43505ada6eb
                </div>
                </div>
            </div>
        )
    }
}
