import { Link } from 'react-router-dom';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Rating from './ReviewStars';
import RatingO from './ReviewStarsOther';
import ContactPage from './ContactInfo';

export default class InfoCard extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let changeUrl= false
    let arrayofPaths=['about','certificates','reviews','contact'];

    for (var variable in arrayofPaths) {
      // console.log(arrayofPaths[variable]);
      if ((this.props.Url.includes(arrayofPaths[variable]))) {
        changeUrl=true;
      }
    }
    let addArr = this.props.location.split(",");
    let parsedAddress = addArr[1]+","+addArr[2];
    return(
      <div className="card-panel">
        <div className="row" style={{marginBottom: '5px'}}>
          <div className="center-align">
            <div  className="col s12 ">
              <h5 style={{textTransform: "capitalize" }}>{this.props.name}</h5>
            </div>
          </div>
          <div  className="col s12 center-align" style={{marginBottom: 'none'}}>
          {this.props.subTopic.constructor === Array ?
            <h7>{this.props.subTopic
              .map(i => <span key={i}>{i}</span>)
              .reduce((prev, curr) => [prev, ', ', curr])
            }</h7>
            :
            <h6>{this.props.subTopic}</h6>
          }
          </div>
        </div>
        <div className="row"  style={{marginBottom: '0px'}}>
            <div className="col s12 center-align">
                 {this.props.isUser ?

                                  <Rating userId={this.props.userId}/>

                                  :
                                  <RatingO userId={this.props.userId}/>
                    }
            </div>
            <div  className="col s12 center-align">
              <Link to={changeUrl ? this.props.Url+"/../reviews": this.props.Url+"/reviews"}>View All</Link>
            </div>
        </div>
        <div className="row" style={{marginBottom: '10px'}}>
          <div  className="col s12 center-align">
            <h6>{parsedAddress}</h6>
          </div>
        </div>
        <div className="divider" style={{marginBottom: '10px'}}> </div>
          <div className="row" >
            <div  className="col s12 center-align">
              <ContactPage user={this.props.user}/>
           </div>
         </div>




        </div>

    );
  }
}
