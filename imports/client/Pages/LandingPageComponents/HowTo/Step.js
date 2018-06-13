import React from 'react';

export default Step = (props)=>{
    return(
        <div className={props.className}>
            <img src={props.img}/>
            <h6>{props.title}</h6>
            <p>{props.text}</p>
        </div>
    )
}
