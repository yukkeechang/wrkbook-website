import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import EmployeeComponentOuter from './EmployeeComponentOuter';

//This file will render job details (title of the job). Any details on the employee for the job is rendered in EmployeeComponentOutter
//and EmployeeCompletedComponent

 class ConComponentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labelFontSize: 25,
      titleFontSize: 30,
      completed: false,
      current: false
    }
    if(!('undefined' === this.props.completed)){
      this.setState({completed: true});
    };
    if(!('undefined' === this.props.current)){
      this.setState({current: true});
    };
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




  render() {
    let EmpIdArray = this.props.jobinfo.admitemployeeIds;
    let job = this.props.jobinfo;

    return(
    <div>
        <div className="container">
          <div className="card">
            <div className="col s10 l12 push-s2 card grey lighten-1">
              <div style={{fontSize: this.state.labelFontSize}}>locations</div>
            </div>
            <div>
              {EmpIdArray.map(function(info, index) {
                return (
                  <EmployeeComponentOuter
                    id={info}
                    job={job}
                    current={this.state.current}
                    completed={this.state.completed}
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
export default ConComponent = withTracker(props => {
  let user = Meteor.user();
  return {
    user: user,
  };
})(ConComponentPage);



let styles = {

     fontWeight: 'bold',
     color: "black",

}
