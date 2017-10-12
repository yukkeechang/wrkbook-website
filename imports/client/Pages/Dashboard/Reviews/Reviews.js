import React, { Component } from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import ReviewsComponent from './ReviewsComponent';

export class ReviewsPage extends Component {
  render() {
    constructor(props){
      super(props);

      }
    }

    return (
      <div>
      gfss
      </div>
    )
  }
}


export default ConJobPosts = createContainer(({ params }) => {
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
}, ReviewsPage);
