import React from 'react';
import { Link } from 'react-router-dom';

export default SuperVisor= (props)=>{
  return(
      <div className="row">

          <div className="row">
              <div className="col l9 m9 s9">
                <h4 style={{margin:'0px'}} >{props.jobTitle}</h4>
              </div>
              <div style={{height:'100%'}}className="col l2 m2 s2">
                <div className="valign-wrapper">
                  {/*Comment out untill messenger works
                    <Link style={{padding:'0px'}} to={"/message/"+ props.jobId}>
                    <a style={{padding:'0px', color:'#03a9f4'}} className="waves-effect tooltipped"  data-position="right" data-tooltip="Open Messaging for this Job"><div style={{height:'50px',width:'50px'}} className="circle blue-grey  center-align  lighten-5"> <i style={{paddingRight:'5px',fontSize:'35px',paddingTop:'10px'}} className="material-icons ">message</i></div></a>
                  </Link>*/}
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col l8 m8 s8">
              <p>Supervisor: {props.supervisorName}</p>
              {
                props.isAdmitted?
                  <p>Phone: {props.supervisorPhone}</p>
                  :
                  null
              }
            </div>

        </div>
      </div>
    )
  }
