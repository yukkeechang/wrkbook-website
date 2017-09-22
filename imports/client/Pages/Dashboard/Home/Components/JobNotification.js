import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


let styles = {  

  profileimageC: {
     position: 'absolute', width:'160px', height:'100px' ,padding: '17px 10px' , left: '35px'
  }

}

class JobNotificationI extends React.Component{
    
    constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    if(!isEmpty(this.props.jobPost)){
      let jobz = this.props.jobPost;
      return(
        <div className="row">
        <div className="card-panel" style={this.style.newJobConfirmContainer}>
          <p
            className="center-align"
            style={{ margin: 0, padding: 0 }}
          >
            New Job Confirmations/Job Matches
          </p>

          {jobz.map(function(job, index){
            return(
                <div>DATA</div>
            )
          })}

        </div>
      </div>

      );
    }
    else if(!this.props.loading){
      return (
        <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
          <MSpinner />
        </div>
      );
    }
    else{
      return(
        <h1>You have no current jobs</h1>
      );
    }
  }

}
export default JobNotification = createContainer((props) => {
   let user = Meteor.user();
  let jobPost =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('job-post-employer',user._id);
    loading = handle.ready();
    jobPost = Job.find({}).fetch();
    console.log(jobPost);
  }
  return {
    user: user,
    loading:loading,
    jobPost:jobPost
  };
}, JobNotificationI);
