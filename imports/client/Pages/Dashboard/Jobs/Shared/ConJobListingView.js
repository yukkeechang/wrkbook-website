import React from 'react';
import MSpinner from '../../../Shared/MSpinner';
import ConJobListingPage from './ConJobListingComponent';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import EmployeeSelect from './ConJobListingComponents/ChangeEmployeeSelect';
class ConView extends React.Component{
  constructor(props){
    super(props);

  }
  componentDidMount(){


  }
  changeIndex=(e)=>{
    console.log(e);
    this.props.handleChangeIndex(e);
  }

  render(){

    let employeesBoi = this.props.employees;
    console.log(employeesBoi.length);
    if (!this.props.ready) {
      return(
        <MSpinner/>
      );
    }else if (employeesBoi.length>0) {
      return(
        <div className="container">
          <div className="card">
            <div className="row card grey lighten-1">
              <div  className="col s12 center-align">
                   <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'100%'}} className="flow-text">Location: {this.props.job.location.locationName}</p></Link>
              </div>
            </div>

            {
              employeesBoi.map((employeeInfo,index)=>{
                return(
                <ConJobListingPage
                  key={employeeInfo._id}
                  employeeInfo={employeeInfo}
                  job={this.props.job}
                  isCompeleted={this.props.isCompeleted}

                />
              );
              })
            }
            <EmployeeSelect  handleClick={this.changeIndex}
            jobTypes={this.props.job.jobTypes.texts}/>
          </div>

        </div>
      )
    }else{
      return(
        <div className="container">
          <div className="row card grey lighten-1">
            <div  className="col s12 center-align">
                 <Link style={{color: 'black'}} to={"/job/"+ this.props.job._id}> <p style={{fontSize:'100%'}} className="flow-text">Location: {this.props.job.location.locationName}</p></Link>
            </div>
          </div>
          <div className="row center-align">
            <p className="flow-text"> Sorry No Professionals Were Admitted to this Job</p>
          </div>
          <EmployeeSelect  handleClick={this.changeIndex}
          jobTypes={this.props.job.jobTypes.texts}/>
        </div>
      )
    }
  }
}


export default ConJobListingView = withTracker(props =>  {
  let handleAdmit = Meteor.subscribe('admit-employee-job',props.job._id);
  let admitPeople = [];
  let readyAdmit = handleAdmit.ready();

  if (!!Meteor.users.find({_id: {$in: props.employeeIds}}).fetch()) {
    admitPeople =  Meteor.users.find({_id: {$in: props.employeeIds}}).fetch();
  }

  return {
    employees:admitPeople,
    ready:readyAdmit

  };
})(ConView);
