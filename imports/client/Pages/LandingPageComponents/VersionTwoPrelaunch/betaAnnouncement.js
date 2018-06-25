import React, {Component} from 'react';



 const banner = () => {
  return (
    <div className= 'center-align' style={{backgroundColor: "#26a69a", fontSize: '25px', padding: '10px', fontFamily:'Montserrat-Medium', color:'white'}}>
      <span> Our Beta Version 2.0  is coming out July 2018.</span>
      <button style={{border: 'None', backgroundColor: "#26a69a"}}>Sign Up</button>
      <span>to find out more</span>
    </div>
  )
}

export default banner;
