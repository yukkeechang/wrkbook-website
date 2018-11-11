import React from 'react';
import ReactDOM from 'react-dom';


 export default class JobLocation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    let geoThings ={lat:this.props.latitude,lng:this.props.longitude};
    let mapGoogle = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map),{
      zoom: 11,
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
  render(){
      return(
        <div>
          <div ref="map" style={{width:'100%',height:this.props.height}}></div>
          <br/>
        </div>
      )
  }

}
