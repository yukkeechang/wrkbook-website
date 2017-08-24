import React from 'react';
import { Link } from 'react-router-dom';
import WrkBookIcon from '../WrkBookIcon';
export default Base = ()=>{
    let styles = {
        logofull : {
            position: 'relative',
            height: '54px',
            top: '5px'
        },
        logo : {
            position: 'relative',
            height: '44px',
            top: '10px'
        },

        heading : {
            position: 'relative',
            top: '9px',
            fontSize:'30px',
            textAlign:'right'
        },
        headIcon: {
            position: 'relative',
            textAlign: 'right',
            top: '17px'
        },
        icon : {
            fontSize: '30px'
        }
    }
    return(
        <div className="row">
            <Link to="/">
                <div className="col m4 hide-on-small-only">
                    <div style={{height: '54px',position:'relative',top:'5px'}}>
                        <WrkBookIcon/>
                    </div>

                </div>
                <div className="col s10 hide-on-med-and-up">
                    <img style={styles.logo} src="/images/circle-logo.svg"/>
                </div>
            </Link>
            <Link to="/login">
                <div style={styles.heading} className="col m4 offset-m4 hide-on-small-only">
                    <span className="genText">Login</span>
                </div>
                <div  style={styles.headIcon} className="col s2 hide-on-med-and-up">
                    <i style={styles.icon} className="genText material-icons">account_circle</i>
                </div>
            </Link>
        </div>
    )
}
