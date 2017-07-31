import React ,{Component} from 'react';
import { Link } from 'react-router-dom';


export default class Button extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            
                <Link to={this.props.to} >
                    <h5 className="heading hBut">{this.props.children}</h5>
                </Link>


        )
    }
}