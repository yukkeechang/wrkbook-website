import React, {Component} from 'react';
// import StepOne from '../Components/RegisterLogin/StepOne';
import Header from './Shared/Header';
import StepOne from './SignUp/StepOne';
import Footer from './Shared/Footer';


export default class SignUp extends Component{
    constructor(props){
        super(props);
        let pro = localStorage.isPro;
        this.state={
            pro : pro,
            step: true,
            User: {}
        }
    }
    render(){
        // let step = this.state.step ? <StepOne isPro={this.state.pro} handler={this.proState.bind(this)} submit={this.nextStep.bind(this)}/> :  <StepTwo isPro={this.state.pro}/>;
        return(
            <div>
                <Header/>
                    <div style={{height:'64px'}}></div>
                    <StepOne isPro={this.state.pro}/>
                <Footer/>   
            </div>
        )
    }
}