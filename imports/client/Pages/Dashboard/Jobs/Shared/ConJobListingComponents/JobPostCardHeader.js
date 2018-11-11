import React from 'react';
import { Link } from 'react-router-dom';
export default CardHeader = (props)=>{
  return (
    <div className="container">
      <div className="card">
        <div  className="row">
          <div className=" card grey lighten-1">
            <div className="row">
              <div className="col s12 center-align">
                <Link style={{color: 'black'}} to={`/job/${props.jobId}`}> <p className="truncate" style={{fontSize:'2em', margin:'0px'}}>Job Title: {props.jobTitle}</p></Link>
              </div>
            </div>
            <div  className="row">
              <div className="col s12 center-align">
                <Link style={{color: 'black'}} to={`/job/${props.jobId}`}><p style={{fontSize:'1.5em', margin:'0px'}} >Location: <u>{props.locationName}</u>{props.notificationsLen >0 ?
                  <span style={{marginRight:'10px'}}className="new badge notification-red-alert darken-1">{props.notificationsLen}</span> : null}</p></Link>
              </div>
            </div>
          </div>
        </div>

        {props.children}

          </div>
        </div>
  )
}
