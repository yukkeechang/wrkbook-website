import React ,{Component} from 'react';
import { Link } from 'react-router-dom';


export default Button = (props)=> {
    return(


          <Link onClick={props.onClick} to={props.to} >
              <h5 className="txt hBut" style={{color: props.text, paddingTop: props.paddingTop}}>{props.children}</h5>
          </Link>

    )
}
