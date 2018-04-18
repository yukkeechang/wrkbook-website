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
              <div className="col s6 m6 l6" >
              <p style={{fontStyle:'italic',fontSize:'30px'}}>“Working with John was great! He told us exactly what to do and we were paid on time” -  William </p>
              </div>
              <div className="col s6 m6 l6" >
                <div className="card">
                <img src="images/william-pro.png"/>
                <p style={{fontStyle: 'bold',fontSize:'15px'}}>William</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
