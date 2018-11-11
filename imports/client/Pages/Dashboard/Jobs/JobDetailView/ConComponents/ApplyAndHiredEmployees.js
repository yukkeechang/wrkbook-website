import React from 'react';
import Employees from './AppliedEmployees'

export default class ApplyAndHired extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="row">
        <div className="col m6 s12">
            <Employees
            isAdmitted={false}
            job={this.props.job}
            filterIds={this.props.applyemployees}/>
        </div>

        <div className="col m6 s12">
            <Employees
            isAdmitted={true}
            job={this.props.job}
            filterIds={this.props.admitemployees}/>
        </div>
      </div>
    )
  }
}
