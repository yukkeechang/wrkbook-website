import React, {Component} from 'react';

const ProHowTo = () => {
  return (
    <div>
      <h4 className='center-align' style={{fontFamily: 'Montserrat-Medium', paddingBottom: '20px'}}>Are you a handy man, a skilled trade or construction worker?</h4>
      <div className="row">
        <div className="col m4 l4">
          <img  src="/images/Professionals-tag.png"/>
          <div className="container-space">
            <img  src="/images/one.png"/>
            <span style={{fontSize: '20px', fontFamily: 'Montserrat-Medium', paddingLeft: '10px'}}>Make a profile with:</span>
          </div>
            <div className="container">
             <ul>
                <li>{`\u2022`} Certifications</li>
                <li>{`\u2022`} Specific Skills</li>
                <li>{`\u2022`} Profession (skilled trade)</li>
                <li>{`\u2022`} Distance willing to travel</li>
             </ul>
            </div>
          </div>
          <div className="col m2 l2">
            <img  src="/images/pro-profile.png"/>
          </div>
          <div className="col m2 l2">
            <img  src="/images/pro-profile.png"/>
          </div>
      </div>

    </div>
  )
}

export default ProHowTo;


// <div className="col s2 m2 l2">
//   <span className="montText nav-bar-heading" style={{backgroundColor: "#26a69a"}} > Professionals </span>
// </div>
