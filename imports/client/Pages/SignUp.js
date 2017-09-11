import React, {Component} from 'react';
import Header from './Shared/Header';
import StepOne from './SignUp/StepOne';
import Footer from './Shared/Footer';
import StepTwoC from './SignUp/StepTwoC';
import { CSSTransitionGroup } from 'react-transition-group';
import StepTwoE from './SignUp/StepTwoE';
import Congrats from './SignUp/Congrats';
import StepThree from './SignUp/StepThree';

export default class SignUp extends Component{
    constructor(props){
        super(props);
        let pro = localStorage.isPro == "true";
        this.state={
            pro : pro,
            step: 1,
            User: {}
        }
    }
    next(step,User,pro){
        this.setState({step: step,User:User,pro:pro});

    }
    render(){
        let step;
        switch(this.state.step){
            case 1:
                step = <StepOne next={this.next.bind(this)} isPro={this.state.pro}/>
                break;
            case 2:
                step = (this.state.pro) ?<StepTwoE user={this.state.User}next={this.next.bind(this)}/> :<StepTwoC user={this.state.User}next={this.next.bind(this)}/>;
                break;
            case 3:
                step = <StepThree history={this.props.history} user={this.state.User} next={this.next.bind(this)}/>
                break;
            case 4:
                step = <Congrats/>
            default:
                break;
        }
        return(
            <div>
                <Header/>
                <div style={{height:'64px'}}></div>
                <div className="container"style={{paddingTop:'50px'}}>
                    <div className="progress">
                        <div className="determinate red accent-2" style={{width: this.state.step*25+'%'}}></div>
                    </div>
                </div>
                {step}

                <Footer/>


            </div>
        )
    }
}
