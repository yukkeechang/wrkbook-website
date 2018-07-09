import React, {Component} from 'react';



export default class Banner extends React.Component {

  handleClick = () => {
    this.props.handleClick("collectEmails");
  }

  render () {
    return (
      <div className= 'center-align' style={{backgroundColor: "#26a69a", fontSize: '25px', padding: '10px', fontFamily:'Montserrat-Medium', color:'white'}}>
        <span> Our Beta Version 2.0  is coming out August 2018.</span>
        <button style={{border: 'None', backgroundColor: "#26a69a"}} onClick={this.handleClick}><span style={{borderBottom: '2px', paddingBottom: '1px', borderBottomStyle: 'solid'}}>Sign Up</span></button>
        <span>to find out more</span>
      </div>
    )
  }
}
