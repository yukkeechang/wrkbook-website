import React from 'react'

export default Education = (props)=>{

  return(

    <div className="col s12 ">
      <div className="row center-align">
        <h5>
          Education Level:
        </h5>
      </div>
      <div className="row center-align">
        {props.highGED &&
          <p>High School/GED: <i className="material-icons">check</i></p>
        }
        {props.tradeSchool&&
          <p>Trade School: {props.tradeSchoolName} <i className="material-icons">check</i></p>
        }
        {
          props.higherEDU&&
            <p>Higher Education: <i className="material-icons">check</i></p>
        }
      </div>
    </div>
  );
}
