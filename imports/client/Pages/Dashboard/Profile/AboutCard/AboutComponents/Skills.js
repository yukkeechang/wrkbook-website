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
        <h6 className="flow-text" style={{overflowWrap:'break-word'}}>{props.skills}</h6>
      </div>


    </div>
  );
}
