import React from 'react';

export default Requirements = (props) =>{
  return(
    <div>
        <ul>
        {
            !props.osha10 && !props.osha30 ?
              <li>No OSHA preference</li>
              :
              props.osha30 ?
                  <li>OSHA 30</li>
                  :
                  <li>OSHA 10</li>

        }
        </ul>
        <ul>

      {
        props.license ?

          <li>Driver license</li>

        :
        null
      }
      </ul>

    </div>
  )

}
