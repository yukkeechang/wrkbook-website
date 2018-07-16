import React from 'react';

export default class HowTo extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div>
          <div className="section"/>
          <div className="container">
            <div className="row">
              <h4 className="montserrat-med" style={{textAlign: 'center',margin:'0'}}>Our Customers </h4>
              <div className="section hide-on-small-only"/>
              <br/>
              {/*Pro Testimonial*/}
              <div className="col s12 m5 l5">
                <br className="hide-on-small-only"/>
                <br className="hide-on-small-only"/>
                <p style={{fontStyle:'italic',fontSize:'25px'}}>“Working with John was great! He told us exactly what to do and we were paid on time” -  Michael </p>
              </div>
              <div className="col m1 l1 hide-on-small-only"/>
              <div className="col s12 m6 l6" >
                <div className="card">
                  <div className="card-content center-align">
                    <img className="circle" src="images/michael-pro.png" height="266" width="266"/>
                    <p style={{fontStyle: 'bold',fontSize:'20px'}}>Michael S.</p>
                    <img src="images/Rating-4.png"/>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>Painter, General Laborer</p>
                    <p style={{fontStyle: 'italic',fontSize:'15px'}}>Brooklyn, New York</p>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>3 Jobs Completed</p>
                  </div>
                </div>
              </div>
              {/*Con Testimonial*/}
              <div className="col s12 m6 l6" >
                <div className="card">
                  <div className="card-content center-align">
                    <img className="circle" src="images/ziggy-con.png" height="266" width="266"/>
                    <p style={{fontStyle: 'bold',fontSize:'20px'}}>John G.</p>
                    <img src="images/Rating-4.png"/>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>Ziggy Painting Corp.</p>
                    <p style={{fontStyle: 'italic',fontSize:'15px'}}>White Plains, New York</p>
                      <p style={{fontSize:'15px'}}>2 Jobs Posted</p>

                  </div>
                </div>
              </div>
              <div className="col m1 l1 hide-on-small-only"/>
              <div className="col s12 m5 l5" >
                <br/> <br/>
                <p style={{fontStyle:'italic',fontSize:'25px'}}>“Michael was well skilled and very flexible. His work was done with care and quality in mind” -  John</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
