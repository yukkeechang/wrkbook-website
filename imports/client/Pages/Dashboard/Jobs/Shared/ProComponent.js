import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import EmployeeComponentOuter from './EmployeeComponentOuter';
import MSpinner from '../../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class proComp extends React.Component{
    //get employer info here
  render(){
    //or get eomployer info here
    let EmpIdArray = this.props.jobinfo.admitemployeeIds;
    let job = this.props.jobinfo;
    let current = this.props.current;
    let completed = this.props.current;
    let upcoming = this.props.upcoming;
    return(
      <div>
        <div className="container">
          <div className="card">
            <div className="col s10 l12 push-s2 card grey lighten-1">
              <div> <Link style={{color: 'black'}} to={"/job/"+ job._id}> <p className="flow-text">Location: {job.location.locationName}</p></Link></div>
            </div>
            <div>
              {EmpIdArray.map(function(info, index) {
                return (
                  <EmployeeComponentOuter
                    id = {info}
                    job = {job}
                    current = {current}
                    completed = {completed}
                    upcoming = {upcoming}
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
export default ProComponent = withTracker(props => {
  let user = Meteor.user();
  let current = false;
  let completed = false;
  let upcoming = false;
  let loading = false;
  if(!('undefined' === typeof(props.current))){

    current = props.current;
  }
  else if(!('undefined' === typeof(props.completed))){

    completed = props.completed;
  }
  else if(!('undefined' === typeof(props.upcoming))){

    upcoming = props.upcoming;
  }
  return {
    user: user,
    current: current,
    completed: completed,
    upcoming: upcoming
  };
})(proComp);
