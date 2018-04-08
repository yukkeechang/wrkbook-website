import React from 'react';
import ReactDOM from 'react-dom';


 export default class JobLocation extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);

    let geoThings ={lat:this.props.latitude,lng:this.props.longitude};
    let mapGoogle = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map),{
      zoom: 12,
      center:geoThings,
    });

    let cityCircle = new google.maps.Circle({
      strokeColor: '#80cbc4',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#80cbc4',
      fillOpacity: 0.35,
      map: mapGoogle,
      center: geoThings,
      radius: 2500
    });

  }
  componentWillUnmount(){

  }
  render(){

      return(
        <div className="col l7 m6 s12 ">
          <div ref="map" style={{width:'100%',height:'350px'}}>

          </div>
          <br/>
           <p> Exact address and contact number is given after employer accepts your application to the job</p>

        </div>
      )
  }

}
