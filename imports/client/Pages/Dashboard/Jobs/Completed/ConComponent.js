import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ARating from '../../Profile/ProProfile/Components/ARating';
import EmployeeCompletedComponent from './EmployeeCompletedComponent';
import EmployeeComponentOuter from './EmployeeComponentOuter';

 export default class ConComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labelFontSize: 25,
      titleFontSize: 30
    }
  }

  componentDidMount(){
    this.textSize();
    console.log(this.props.jobinfo);
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




  render() {
    let EmpIdArray = this.props.jobinfo.admitemployeeIds;
    let job = this.props.jobinfo;

    return(
    <div>
        <div className="container">
          <div className="card">
            <div className="col s10 l12 push-s2 card grey lighten-1">
              <div style={{fontSize: this.state.labelFontSize}}>{this.props.location}</div>
            </div>
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


let styles = {

     fontWeight: 'bold',
     color: "black",

}
