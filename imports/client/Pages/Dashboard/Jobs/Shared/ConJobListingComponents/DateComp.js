
import React from 'react';


export default DateComp = (props)=>{
    return (
      <div>

        <div className="col s12 m2">
          <div className="row center-align" style={{fontWeight:'bold'}}>
            Profession
          </div>
          <div className="row center-align">
              <h6>{props.profession}</h6>
          </div>
        </div>

        <div className="col s12 m2">
          <div className="center-align">
            <div className="row" style={{fontWeight:'bold'}}>
              Date
            </div>
            <div className="row">
              <h6>{props.jobDate}</h6>
              <h6>{props.jobTime}</h6>
            </div>
          </div>
        </div>

      </div>
    )
  }
