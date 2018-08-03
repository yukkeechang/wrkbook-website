
import React from 'react';
import WrkBookIcon from './WrkBookIcon';
export default Footer = (props)=>{
    return(
        <footer id="footer" className="page-footer dark-grey">
            <div className="container">
                <div style={{paddingTop:'20px',marginBottom:'0'}} className="row">
                    <div className="col s12 m5">
                        <WrkBookIcon height={'100px'} />
                        <p style={{textAlign:'justify'}}className="genText">
                            Wrkbook is a website and soon to be mobile application that connects the supply of workers with the demand for jobs. Opening doors to connections that otherwise would never happen.
                        </p>
                    </div>
                    <div className="col s12 m7">
                        <div className="row">
                            <p className="genText col s12" style={{fontSize:'1.3em'}}>
                                Have any questions? Reach us at <a className="teal-text" href="mailto:info@wrkbook.com?subject=[Information Inquiry]">info@wrkbook.com</a>
                            </p>
                            <div className="col s12">
                                <div className="row">
                                    <div style={{textAlign:'center'}} className="col s4 m2 offset-m3"><a href="https://twitter.com/wrkbookapp"><img src="/images/Twitter_White.png" alt=""/></a></div>
                                    <div style={{textAlign:'center'}} className="col s4 m2"><a href="https://www.facebook.com/wrkbookapp/"><img src="/images/Facebook_White.png" alt=""/></a></div>
                                    <div style={{textAlign:'center'}} className="col s4 m2"><a href="https://www.instagram.com/wrkbook/"><img src="/images/Instagram_White.png" alt=""/></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginBottom:'0'}} className="row">
                    <div className="col s6 m3 offset-m3">
                        <p style={{textAlign:'center',textDecoration:'underline'}}>
                            <a style={{color:'white'}}href="WrkbookUser AccessTerms.pdf">Terms of Service</a>
                        </p>
                    </div>
                    <div className="col s6 m3">
                        <p style={{textAlign:'center',textDecoration:'underline'}}>
                            <a style={{color:'white'}}href="WrkbookPrivacyPolicy.pdf">Privacy Policy</a>
                        </p>
                    </div>
                </div>
                <div style={{marginBottom:'0'}} className="row">
                    <div className="col s12">
                        <p className="teal-text" style={{padding:'0',marginTop:'0',textAlign:'center'}}>© 2017 by WrkBook LLC.</p>
                    </div>
                </div>

            </div>
        </footer>
    )
}
