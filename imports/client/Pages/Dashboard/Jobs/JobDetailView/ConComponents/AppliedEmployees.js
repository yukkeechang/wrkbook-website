
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import EmployeeComponent from './EmployeeComponent'
class AppiedEmployee extends React.Component{
  componentDidMount(){
    this.setState({
      isCompleted: this.props.isCompleted
    });


  }
  constructor(props){
    super(props);
    this.state={
      isCompleted:'false'
    };
  }
  render(){
    return(
      <div>
        <div className='z-depth-0 center-align'>
          {
            this.props.employees.length < 1 ?
              !this.props.isAdmitted ?
                  <h5>No Professionals applied</h5>
                    :
                  <h5>No admitted Professionals</h5>
            :
              !this.props.isAdmitted ?
                <h5>Professionals that applied</h5>
                  :
                <h5>Admitted Professionals</h5>
          }
        </div>

        <div style={{height:'350px',overflow:'auto'}}>
          <ul ref="listedItem"  className="collection">
            {
              this.props.employees.map((user,index)=>{
                return(
                  <li  key = {user._id} className="collection-item">
                    <EmployeeComponent
                      isCompleted={this.state.isCompleted}
                      jobInfo = {this.props.job}
                      employeeId = {user._id}
                      profile = {user.profile}
                      isAdmitted = {this.props.isAdmitted}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
  )
  }
}

export default Employees = withTracker(props=>{
  let people = Meteor.users.find({_id:{$in: props.filterIds}}).fetch();
  return {
    employees:people,
  }
})(AppiedEmployee);
