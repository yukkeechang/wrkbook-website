import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EmpJobPost from './EmpJobPost';
import RefreshIndicator from 'material-ui/RefreshIndicator';


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
function isEmpty(obj) {
   for (var x in obj) { return false; }
   return true;
}


class JobPostsA extends Component {
  constructor(props){
    super(props);
    this.state ={
      height: 50,
      width: 50
    }
  }
  updateDimensions(){

    let height = document.body.scrollHeight/2;
    let width = document.body.scrollWidth/2;

    this.setState({
      height:height,
      width: width
    });


  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }


  render () {
    if(!isEmpty(this.props.jobPost)){
      let jobz = this.props.jobPost;
          return(
                  <div>
                  <br/>
                  {jobz.map(function(job, index){
                      return(

                          <EmpJobPost
                              key={index}
                              isAdmitted={true}
                              jobinfo ={job}
                              title={job.title.text}
                              startAt={job.startAt}
                              endAt={job.endAt}
                              description={job.description.text}
                              location={job.location}
                              pay={job.pay}
                          />
                      )
                  })}
                  </div>

          );


    }else if(!this.props.loading){
      return (

        <MuiThemeProvider>
          <div style={{display:'flex',justifyContent:'center',alignItem:'center'}} >
            <RefreshIndicator
                size={100}
                top={this.state.height}
                left={this.state.width}
                loadingColor="#00C499"
                status="loading"
              />
          </div>
          </MuiThemeProvider>

      );

    }else{
      return(
        <h1>Sorry No Jobs</h1>
      );
    }

  }
}

export default JobPostsEmployeeAdmit= createContainer(({ params }) => {


  let user = Meteor.user();
  let jobPost =[];
  let loading = false;
  let hackIdThing =[];
  if(!('undefined' === typeof(user))){

    let handle = Meteor.subscribe('job-post-admitted',user._id);
    loading = handle.ready();
    hackIdThing[0] = user._id;
    jobPost = Job.find({admitemployeeIds: {$in: hackIdThing}}).fetch();
    console.log(jobPost);

  }

  return {
    user: user,
    loading:loading,
    jobPost:jobPost
  };
}, JobPostsA);
