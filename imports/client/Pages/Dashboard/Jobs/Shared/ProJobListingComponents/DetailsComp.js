
import React from 'react';


export default JobDetail = (props)=>{
    return (
      <div className="col s12 m4">
        <div className="center-align">
          <div className="row" style={{fontWeight:'bold'}}>
            Details
          </div>
          <div className="row">
            <h6>{props.jobDate}</h6>
            <h6>{props.jobTime}</h6>
            <h6>{props.responsibilities}</h6>
            {
              props.isCompeleted ?
              <h6>Total Pay: ${props.pay}</h6>
              :
              null
            }
          </div>

        </div>
      </div>
    )
  }
