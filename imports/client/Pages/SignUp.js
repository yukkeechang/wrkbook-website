import React, {Component} from 'react';
import StepOne from '../Components/RegisterLogin/StepOne';
import Header from '../Components/Shared/Header';
import StepTwo from '../Components/RegisterLogin/StepTwo';
import Footer from '../Components/Shared/Footer';


export default class SignUp extends Component{
    constructor(props){
        super(props);
        let pro = props.match.params.value === "Contractor" ? false : true;
        this.state={
            pro:pro,
            step: true
        }
    }
    proState(pro){
        this.setState({
            pro:pro
        });
    }
    nextStep(){
        this.setState({
            step: false
        });
    }
    render(){
        let step = this.state.step ? <StepOne isPro={this.state.pro} handler={this.proState.bind(this)} submit={this.nextStep.bind(this)}/> :  <StepTwo isPro={this.state.pro}/>;
        return(
            <div>
                <Header/>
                <div className="fullWidth" style={{height:'64px',backgroundColor:'rgba(0,0,0,0.3)'}}></div>
                <div id="howTo"className="fullWidth">
                    <div className="container">
                        {step}
                        <Footer/>   
                    </div>
                </div>
            </div>
        )
    }
}