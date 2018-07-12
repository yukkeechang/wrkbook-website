import MSpinner from '../../../Shared/MSpinner';

import NotFound from '../../../Shared/ItemNotFound';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import EditJob from './EditJob';
class EditJOB extends Component{
  componentWillUnmount(){
    this.props.handle.stop();
  }
    render(){
      return(
          <div>


              {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div></div> :
                      !!this.props.job ?
                      <EditJob key={this.props.job._id} jobPost={this.props.job}/>
                      :
                      <NotFound/>
              }
          </div>
      )
    }
}


export default EditJobs = withTracker(params =>{
  let handle = Meteor.subscribe('job-post-employer-edit',params.match.params.value);
  let ready = handle.ready();
  console.log(ready);
  return {
    handle:handle,
    ready: ready,
    job: Job.find({}).fetch()[0]

  };
})(EditJOB);
