import React from 'react';
import SignUpComponent from '../Components/signup';

export default class Register extends React.Component{
    constructor(props){
        super(props);
    }


    render(){

        return(
          <div>
            <SignUpComponent history={this.props.history} data-pageName={this.props.match.params.value}/>
          </div>


        )
    }
}
