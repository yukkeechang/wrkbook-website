import React from 'react';
import Header from './Shared/Header';

export default class LoggedOutNotFound extends React.Component{
    render(){
    return(
        <div>
            <Header/>
            <div style={{height:'64px'}}></div>
            <div style={{paddingTop:'50px'}} className="container">
                <div className="row">
                    <div className="col s12">
                        <h3 style={{lineHeight:'70px',textAlign:'center'}}>I swer to <span style={{fontWeight:'bold',backgroundColor:'yellow',color:'red'}}>YEEEZY</span> you not messing around on my <span style={{fontWeight:'bold'}}>SERVER</span> battery cause I cant find your <br/><span>BULL</span></h3>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
