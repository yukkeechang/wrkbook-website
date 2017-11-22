import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import EmployeeCompletedComponent from './EmployeeCompletedComponent';
import EmployeeComponentOuter from './EmployeeCompletedComponent';

 class ConComponentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labelFontSize: 25,
      titleFontSize: 30
    }
  }

  componentDidMount(){
    this.textSize();
  }

  textSize() {
    let width = document.body.scrollWidth;
    if (width >= 600) {
      this.setState({
        labelFontSize: 25,
        titleFontSize: 30
      });
    } else if (width >= 375){
      this.setState({
        labelFontSize: 15,
        titleFontSize: 20
      });
    } else {
      this.setState({
        labelFontSize: 12,
        titleFontSize: 18
      });
    }
  }


  cardLabel() {
    return (
      <div>
        <div className="row center-align">
          <div className="col l11">
            <div className="col m4 l4"style ={{fontSize:this.state.labelFontSize}} >Professional</div>
            <div className="col m4 l4"style ={{fontSize:this.state.labelFontSize}}>Details</div>
            <div className="col m4 l4"style ={{fontSize:this.state.labelFontSize}}>Rating and Reviews</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    let EmpIdArray = this.props.jobinfo.admitemployeeIds
    let job = this.props.jobinfo
    //console.log("ids: "+EmpIdArray[0])
    return(
    <div>
        <div className="container">
          <div className="card">
            <div className="col s10 l12 push-s2 card grey lighten-1">
              <div style={{fontSize: this.state.labelFontSize}}>{this.props.location}</div>
            </div>
            {this.cardLabel()}
            <div>
              {EmpIdArray.map(function(info, index) {
                return (
                  <EmployeeComponentOuter
                    id={info}
                    job={job}
                  />
                )
              })}
            </div>
          </div>
        </div>
    </div>

    )
  }
}
export default ConComponent = createContainer((props) => {
  let user = Meteor.user();
  let loading = false
  if(!('undefined' === typeof(user))){

    let handle = Meteor.subscribe('current-job-con', props.jobinfo._id );
    loading = handle.ready();
    //console.log("loading: "+loading);
  }
  return {
    user: user,
    loading: loading
  };
}, ConComponentPage);



let styles = {

     fontWeight: 'bold',
     color: "black",

}
