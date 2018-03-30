import React from 'react'

export default Skills = (props)=>{

  return(
    <div className="col s12">
      <div className="row center-align">
        <h5>
            Skills
        </h5>
      </div>
      <div className="center-align row">
        <p className="flow-text" style={{overflowWrap:'break-word', fontSize:'14px'}}>{props.skills}</p>
      </div>


    </div>
  );
}
