import React from 'react'

export default Skills = (props)=>{

  return(
    <div className="col s12 m6">
      <div className="row center-align">
        <h5>
            Skills
        </h5>
      </div>
      <div className="center-align row">
        <h6>{props.skills}</h6>
      </div>


    </div>
  );
}
