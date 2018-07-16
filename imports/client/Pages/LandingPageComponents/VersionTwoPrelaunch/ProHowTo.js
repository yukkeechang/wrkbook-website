import React, {Component} from 'react';

export default class ProHowTo extends React.Component {


render () {


  return (
    <div>
      <h4 className='center-align how-to-heading montserrat-med' style={{ paddingBottom: '20px'}}>Are you a handy man, a skilled trade or construction worker?</h4>
      <div className="row">
        <div className="col s12 m4 l4" >
          <div className="row">
            <img style={{maxWidth: '100%',maxHeight: '100%'}} src="/images/Professionals-tag.png"/>
            <div className="col s11 offset-s1">
              <img  src="/images/one.png"/>
              <span className="montserrat-med" style={{fontSize: '25px', paddingLeft: '10px'}}>Make a profile with:</span>
            </div>
            <div className="col s9 offset-s3">
              <ul style={{fontSize: '20px'}}>
                 <li>{`\u2022`} Certifications</li>
                 <li>{`\u2022`} Specific Skills</li>
                 <li>{`\u2022`} Profession (skilled trade)</li>
                 <li>{`\u2022`} Distance willing to travel</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col s11 offset-s1">
              <img  src="/images/two.png"/>
              <span className="montserrat-med"style={{fontSize: '25px', paddingLeft: '10px'}}>Get matched to jobs based on your profile </span>
            </div>
          </div>
          <div className="row">
            <div className="col s11 offset-s1">
              <img  src="/images/three.png"/>
              <span className="montserrat-med" style={{fontSize: '25px', paddingLeft: '10px'}}>Apply to the offer and the contractor will let you know if you’re hired! </span>
            </div>
          </div>
          </div>
          <div className="col m8 l8 center-align show-on-large hide-on-med-and-down">
              <img  style={{maxWidth: '50%',maxHeight: '50%', height:'550px'}} src="/images/pro-profile-2.png"/>
              <img  style={{maxWidth: '50%',maxHeight: '50%', height:'550px'}} src="/images/pro-job-match.png"/>
          </div>
          <div className="col m4 center-align hide-on-large-only hide-on-small-only ">
            <img  style={{maxWidth: '90%',maxHeight: '90%', width:'700px', height:'550px' }} src="/images/pro-profile-2.png"/>
          </div>
          <div className="col m4 center-align hide-on-large-only hide-on-small-only ">
            <img  style={{maxWidth: '90%',maxHeight: '90%',width:'700px',height:'550px'}} src="/images/pro-job-match.png"/>
          </div>

          <div className="col s12 center-align show-on-small hide-on-med-and-up">
            <img  style={{maxWidth: '70%',maxHeight: '70%',height:'450px'}} src="/images/pro-profile-2.png"/>
          </div>
          <div className="col s12 center-align show-on-small hide-on-med-and-up">
            <img  style={{maxWidth: '70%',maxHeight: '70%',height:'450px'}} src="/images/pro-job-match.png"/>
          </div>

        </div>
      </div>
  )
  }

}

/*


          <div className="hide-on-med-and-up offset-s2 img-responsive" >
            <img style={{maxWidth: '110%',maxHeight: '110%'}} src="/images/pro-job-match.png"/>
          </div>

          <div className="col m2 l3 offset-s2 " >
            <img style={{maxWidth: '90%',maxHeight: '90%'}} src="/images/pro-profile-2.png"/>
          </div>
          <div className="col m2 l3 hide-on-small-only ">
            <img style={{maxWidth: '87%',maxHeight: '87%'}} src="/images/pro-job-match.png"/>
          </div>


 */


// <div className="col s2 m2 l2">
//   <span className="montText nav-bar-heading" style={{backgroundColor: "#26a69a"}} > Professionals </span>
// </div>
