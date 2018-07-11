import React, {Component} from 'react';

export default class ProHowTo extends React.Component {


render () {


  return (
    <div>
      <h4 className='center-align how-to-heading' style={{fontFamily: 'Montserrat-Medium', paddingBottom: '20px'}}>Are you a handy man, a skilled trade or construction worker?</h4>
      <div className="row">
        <div className="col m4 l3" >
          <img style={{maxWidth: '100%',maxHeight: '100%'}} src="/images/Professionals-tag.png"/>
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
          <div className="col m2 l3 offset-s2 " >
            <img style={{maxWidth: '90%',maxHeight: '90%'}} src="/images/pro-profile-2.png"/>
          </div>
          <div className="col m2 l3 hide-on-small-only ">
            <img style={{maxWidth: '87%',maxHeight: '87%'}} src="/images/pro-job-match.png"/>
          </div>
          <div className="section"/>
          <div className="section"/>
          <div className="section"/>

          <div className="row">

          <div className="container-space col s8 m4 l3  offset-s2">
            <img  src="/images/two.png"/>
            <span style={{fontSize: '20px', fontFamily: 'Montserrat-Medium', paddingLeft: '10px'}}>Get matched to jobs based on your profile </span>
          </div>

          <div className="col s8 hide-on-med-and-up offset-s2 img-responsive" >
            <div className="section"/>
            <img style={{maxWidth: '110%',maxHeight: '110%'}} src="/images/pro-job-match.png"/>
          </div>
          <div className="section"/>
          <div className="section"/>
          <div className=" col m4 l3 s8 offset-s2">
            <img  src="/images/three.png"/>
            <span style={{fontSize: '20px', fontFamily: 'Montserrat-Medium', paddingLeft: '10px'}}>Apply to the offer and the contractor will let you know if you’re hired! </span>
          </div>
          </div>


      </div>
    </div>
  )
  }

}




// <div className="col s2 m2 l2">
//   <span className="montText nav-bar-heading" style={{backgroundColor: "#26a69a"}} > Professionals </span>
// </div>
