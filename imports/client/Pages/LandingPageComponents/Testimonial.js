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
              <div className="col s12 m6 l6" >
              <p style={{fontStyle:'italic',fontSize:'30px'}}>“Working with John was great! He told us exactly what to do and we were paid on time” -  William </p>
              </div>
              <div className="col s12 m6 l6" >
                <div className="card">
                  <div className="card-content center-align">
                    <img src="images/william-pro.png"/>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>William</p>
                    <img src="images/Rating-4.png"/>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>Ziggy Painting Corp</p>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>Brooklyn, New York</p>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>2 Jobs Posted</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m6 l6" >
                <div className="card">
                  <div className="card-content center-align">
                    <img src="images/william-con.png"/>
                    <p style={{fontStyle: 'bold',fontSize:'15px'}}>William</p>
                    <img src="images/Rating-4.png"/>
                    <p style={{fontStyle: 'heavy',fontSize:'15px'}}>Ziggy Painting Corp</p>
                    <p style={{fontStyle: 'italic',fontSize:'15px'}}>Painter, Demolitioner</p>
                    <p style={{fontStyle: 'italic',fontSize:'15px'}}>Brooklyn, New York</p>
                      <p style={{fontSize:'15px'}}>10 Jobs Completed</p>

                  </div>
                </div>
              </div>
              <div className="col s12 m6 l6" >
              <p style={{fontStyle:'italic',fontSize:'30px'}}>“Working with William  was great! He told us exactly what to do and we were paid on time” -  John</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
