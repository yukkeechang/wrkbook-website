import React from 'react';

export default class HowTo extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div>
          <div className="container">
            <div className="row">
              <h4 style={{fontFamily:'avenir-lt-w01_35-light1475496',textAlign: 'center',margin:'0',paddingBottom:'20px'}}>Our Customers </h4>
              <br/>
              {/*Pro Testimonial*/}
              <div className="col s12 m5 l5">
                <br/> <br/>
                <p style={{fontStyle:'italic',fontSize:'25px'}}>“Working with John was great! He told us exactly what to do and we were paid on time” -  William </p>
              </div>
              <div className="col m1 l1 hide-on-small-only"/>
              <div className="col s12 m6 l6" >
                <div className="card">
                  <div className="card-content center-align">
                    <img src="images/william-pro.png"/>
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
                    <img src="images/william-con.png"/>
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
                <p style={{fontStyle:'italic',fontSize:'25px'}}>“William was well skilled and very flexible. His work was done with care and quality in mind” -  John</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
