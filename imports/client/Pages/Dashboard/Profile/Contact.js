import React from 'react'
import Education from './AboutComponents/Education';
import Languages from './AboutComponents/Languages';
import Skills from './AboutComponents/Skills';
export default Contact = (props)=>{

  return(
    <div className="card-panel">
      <div className="row center-align">
        <h5>
          Contact
        </h5>
      </div>
      <div className="row">
      <h6> Phone Number: {props.phoneNumber}</h6>
      </div>
      <div className="row">
      <h6> Email: {props.email}</h6>
      </div>

    </div>
  );
}
