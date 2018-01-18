import React from 'react';

export default SuperVisor= (props)=>{
  return(
      <div className="row">
        <div className="col l8 m8 s8">
          <h1>{props.jobTitle}</h1>
          <p>Supervisor: {props.supervisorName}</p>
          {
            props.isAdmitted?
              <p>Phone: {props.supervisorPhone}</p>
              :
              null
          }

        </div>
      </div>
    )
  }
