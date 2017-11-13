import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import MSpinner from '../../../Shared/MSpinner';
import ConComponent from './ConComponent';

// import ConProfile from './ConProfile/ConProfile';
// import ProProfile from './ProProfile/ProProfile';

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

class ConCurrentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  NoCurrentJob() {
    return (
      <div className="card-panel  center-align">
          <img src="/images/hardhat.png" height="150" width="150" />
          <h5>You dont have any current jobs!</h5>
          <Link to={"/createjob"} className="btn">
            <div className="col s12 m12 l12">
                  Create a New Job!
            </div>
            </Link>
      </div>
    )
  }

render() {
  if(!this.props.loading) {
    return (
      <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
        <MSpinner />
      </div>
    )
  }
  else if(!(isEmpty(this.props.jobPost))) {
    return (

        <ConComponent
        jobinfo={this.props.jobPost}
        />


    )
  }
  else {
    return (
      <div>
      {this.NoCurrentJob()}
      </div>
    )
  }
 }
}



export default ConCurrent = createContainer((props) => {
  let user = Meteor.user();
  let jobPost=[]
  let loading = false
  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-employer',user._id);
    loading = handle.ready();
    console.log("loading "+loading);
    jobPost = Job.find({}).fetch();
  }
  return {
    user: user,
    loading: loading,
    jobPost: jobPost
  };
}, ConCurrentPage);


//get employees from the job
//get the actual job
//check if job is closed <- that should be done in the completed jobs subscription

//return completed job componenent or no completed job component/page
