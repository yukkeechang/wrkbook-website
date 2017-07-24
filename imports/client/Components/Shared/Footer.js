import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render(){
        return (
            <div id="footerC">
                <div id="footer" >
                    <div className="footerdivs">
                        <img id="footerwrkbookimg" src="/images/wrkbookfooter.png"/>
                        <p>Wrkbook is a mobile app and web platform<br/>that connects the supply of workers with the<br/>demand for jobs. Opening doors to<br/>connections that otherwise would never<br/>happen.</p>
                    </div>
                    <div className="footerdivs">
                        <p>Have any questions? Reach us at <a>info@wrkbook.com</a></p>
                    </div>
                    <div className="footerdivs">
                        <a href="https://instagram.com/wrkbook/" target="_blank"><img id="footericons" src="/images/instagram.png"/></a>
                        <a href="https://facebook.com/wrkbookapp/" target="_blank"><img id="footericons" src="/images/facebook.png"/></a>
                    </div>
                </div>
            </div>
        )
    }

}
