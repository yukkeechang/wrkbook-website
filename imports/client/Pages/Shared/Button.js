import React ,{Component} from 'react';
import { Link } from 'react-router-dom';


export default Button = (props)=> {
  let to = props.to ? props.to : ''
    return(


          <Link onClick={props.onClick} className={props.className} style={props.stylez} to={to} >
              <h5 className="txt hBut" style={{color: props.text, paddingTop: props.paddingTop}}>{props.children}</h5>
          </Link>

    )
}
