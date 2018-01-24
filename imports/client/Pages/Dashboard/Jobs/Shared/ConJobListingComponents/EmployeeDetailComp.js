
import React from 'react';


export default EmployeeDetail = (props)=>{
    return (
      <div className="col s12 m4">
        <div className="center-align">
          <div className="row" style={{fontWeight:'bold'}}>
            Details
          </div>
          <div className="row">
            <h6>{props.profession}</h6>
            <br/>
            <h6>{props.jobDate}</h6>
            <h6>{props.jobTime}</h6>
            {props.weekendExcluded ? <h6>Weekends are excluded for this job*</h6> : null}
            <br/>
            <h6>${props.hourPay}/hr</h6>
            <h6>${props.dayPay}/day</h6>
          </div>

        </div>
      </div>
    )
  }
