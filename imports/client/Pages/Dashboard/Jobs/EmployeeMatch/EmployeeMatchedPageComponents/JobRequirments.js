import React from 'react';

export default Requirements = (props) =>{
  return(
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
  )

}
