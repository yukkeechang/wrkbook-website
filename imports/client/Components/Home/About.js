import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';
export default class About extends Component {
    componentWillMount(){
        window.addEventListener('scroll',(e)=> {
            if(this.refs.story){
                let scrollPos = window.scrollY;
                window.requestAnimationFrame(()=>{
                    this.refs.story.style.backgroundSize = 'auto ' + (75+ (scrollPos/30))+'vmax';
                });
            }

        });
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',()=>{
            
        });
    }
    render(){
        return (
            <div ref="story" id="story" className="fullWidth">
                <div className="container">
                    <div className="less">
                        <h4 id="OStory" className="wwd">Our Story</h4>
                        <p>William De Andrade, the son of a contractor, was always seeing the problems and stress that his father faced when looking for employees, especially during deadlines. Currently, contractors can only find employees by word of mouth, references, phone calls, and as a last resort, finding workers at the corner. These methods are time consuming, stressful, and risky. The construction industry has been left behind by the technology industry. WrkBook is here to help it out, with the help of co-founders Yuk Kee Chang and Eric Wiener. </p>
                        <p>WrkBook was started in December 2016 while participating in the Zahn Innovation Center's Annual Venture Competition. After winning first place and the grand prize, the company was accepted in to the Zahn Center's Accelerator Program. The company is currently working with mentors at BNY Mellon and Willkie Farr & Gallagher to help bring the solution to your fingertips. </p>
                    </div>
                </div>
            </div>
        )
    }
}