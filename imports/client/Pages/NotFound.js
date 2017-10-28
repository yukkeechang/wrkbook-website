import React from 'react';
import Header from './Shared/Header';

export default class NotFound extends React.Component{
    render(){
    return(
        <div>
            <div style={{height:'64px'}}></div>
            <div style={{paddingTop:'50px'}} className="container">
                <div className="row">
                    <div className="col s12">
                        <h3 style={{lineHeight:'70px',textAlign:'center'}}>404 Not Found</h3>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
