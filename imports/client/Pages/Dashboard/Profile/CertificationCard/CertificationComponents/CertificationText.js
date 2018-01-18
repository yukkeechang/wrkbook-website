import React from 'react'

export default CertificationText = (props)=>{

  return(
    <div className="col s12">
      <div className="row center-align">
        <h5>
            Certifications
        </h5>
      </div>
      <div className="row">
          {props.backGround &&
            <div className="col center-align s12 m6">
            <p> Background Check: <i className="material-icons">check</i></p>
            </div>
          }
        {props.tradeSchool&&
          <div className="col center-align s12 m6">
            <p><b>Trade School: </b>{props.tradeSchoolName} <i className="material-icons">check</i></p>
        </div>
        }
        {props.driver&&
        <div className="col center-align s12 m6">
           <p> Driver's License: <i className="material-icons">check</i></p>
        </div>
        }

        {!props.osha10 && !props.osha30 ?
            null
            :
            (props.osha10 ?
                <div className="col center-align s12 m6">
                   <p> OSHA 10 <i className="material-icons">check</i></p>
                 </div>
               :
               <div className="col  center-align s12 m6">
                <p> OSHA 30 <i className="material-icons">check</i></p>
               </div>

            )
        }

      </div>


    </div>
  );
}
