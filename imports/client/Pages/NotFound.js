import React from 'react';
import Header from './Shared/Header';
//FLAG should be a stateless component and other things 
export default class NotFound extends React.Component{
    render(){
    return(
        <div>
            <div className="header-nav-bar-offset"></div>
            <div className="container">
                <div className="row">
                    <div className="col s12 center-align">
                        <h3 className="to-bold">404 Not Found</h3>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
