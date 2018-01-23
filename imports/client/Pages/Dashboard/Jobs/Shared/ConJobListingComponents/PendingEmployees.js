import React from 'react';
// import { createContainer } from 'meteor/react-meteor-data';

import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

export default class PendingEmployees extends React.Component {

  constructor(props) {
    super(props);
    this.state = {


    }

  }

  componentDidMount(){


  }


  render(){
    console.log(this.props);
    return(
    <div className="row center-align">
      {this.props.numberofEmployees > 0 ?
        <p>{this.props.numberofEmployees} Professional have applied to this job to
          hire these professionals <Link to={"/job/"+this.props.jobId}>Click Here</Link>
        </p>
        :
        <p>
          No Professional have applied to this job
        </p>
      }

    </div>
  );
  }
}