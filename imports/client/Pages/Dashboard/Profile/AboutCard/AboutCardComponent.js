import React from 'react'
import Education from './AboutComponents/Education';
import Languages from './AboutComponents/Languages';
import Skills from './AboutComponents/Skills';
export default About = (props)=>{

  return(
    <div className="card-panel">
      <div className="row center-align">
        <h5>
          About
        </h5>
      </div>
      <div className="row center-align">
        <h6 className="flow-text" style={{overflowWrap:'break-word'}}>{props.aboutText}</h6>
      </div>
      {props.isPro&&
        <div>
          <div className="divider"/><br/>
          <div className="row">
            <div className="col m6 s12">
              <Skills
                skills={props.skillsText}
              />
            </div>
            <div className="col m6 s12">
              <Education
                highGED={props.highGED}
                tradeSchool={props.tradeSchool}
                tradeSchoolName={props.tradeSchoolName}
                higherEDU={props.higherEDU}
              />
            </div>
          </div>
          {props.languages.length>0 &&
            <div className="row">
              <Languages
                languages={props.languages}
                />
            </div>
          }

        </div>
      }
    </div>
  );
}
