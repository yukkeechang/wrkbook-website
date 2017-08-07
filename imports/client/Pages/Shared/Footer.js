import React from 'react';

export default Footer = (props)=>{
    return(
        <footer style={props.style}>
            <div className="container">
                <div style={{marginTop:'20px'}} className="row">
                    <div className="col s12 m4">
                        <img style={{width: '193px'}}src="/images/wrkbookfooter.png" alt=""/>
                        <p>
                            Wrkbook is a mobile app and web platform that connects the supply of workers with the demand for jobs. Opening doors to connections that otherwise would never happen.
                        </p>
                    </div>
                    <div className="col s12 m4">
                        <p>
                            Have any questions? Reach us at <br/><a href="mailto:info@wrkbook.com?subject=[Information Inquiry]">info@wrkbook.com</a>
                        </p>
                    </div>
                    <div className="col s12 m4">
                        <div className="row">
                            <div style={{textAlign:'center'}} className="col s6">
                                <a href="https://www.facebook.com/wrkbookapp/"><img style={{margin:'auto'}} src="/images/facebook.png" alt=""/></a>
                            </div>
                            <div style={{textAlign:'center'}} className="col s6">
                                <a href="https://www.instagram.com/wrkbook/"><img style={{margin:'auto'}} src="/images/instagram.png" alt=""/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}