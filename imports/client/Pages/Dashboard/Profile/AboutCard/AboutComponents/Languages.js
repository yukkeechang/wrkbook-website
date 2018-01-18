import React from 'react'

export default Languages = (props)=>{

  return(

    <div className="col s12 m6">
      <div className="row center-align">
        <h5>
          Languages Spoken:
        </h5>
      </div>
      <div className=" center-align row">
        <p>{props.languages
          .map(i => <span>{i}</span>)
          .reduce((prev, curr) => [prev, ', ', curr])
        }</p>
      </div>
    </div>
  );
}
