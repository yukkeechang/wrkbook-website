import React from 'react';

export default JobInfo = (props)=>{
  return(
    <div className="row">
      <div className="col l6 m6 s12">
        <div className="row">
          <div className="col l6 m6 s12">
            <p><b>Job dates: </b>{props.startAt}</p>
            <p><b>Job times: </b>{props.endAt}</p>
            {props.weekendExcluded ? <p>Weekends are excluded for this job*</p> : <p>Weekends are not excluded for this job*</p>}
            <p><b>Pay: </b>${props.pay}/hr</p>
            <p><b>Location: </b>{props.location}</p>
          </div>
          <div className="col l6 m6 s12">

            {
              !props.osha10 && !props.osha30 ?
                <p><b>OSHA: </b>No preference</p>
                :
                props.osha30 ?
                    <p><b>OSHA: </b>OSHA 30</p>
                    :
                    <p><b>OSHA: </b>OSHA 10</p>
            }
            {
              props.license ?
              <p><b>Driver license: </b>Yes</p>
              :
              <p><b>Driver license: </b>None</p>
            }
          </div>
        </div>
      </div>
      <div className="col l5 m5 s12 offset-l1 offset-m1">
        <p><b>Professionals needed: </b>{props.numWorkers}</p>
        <p><b>Responsibilities: </b>{props.responsibilities}</p>
      </div>
    </div>
  )
}
