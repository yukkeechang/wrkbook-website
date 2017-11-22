import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CreateReviewForCon from '../../Reviews/CreateReviewForCon';
import ReactDOM from 'react-dom';
import EmployeeCompletedComponent from './EmployeeCompletedComponent';

class EmployeeComponentOuter extends Component{

    render(){

      return(
        console.log("props from employee component outter: "+ this.props.review)
        console.log("props from employee component outter: "+ this.props.event)
          <div>
              {!this.props.loading && !this.props.loading2 ?
                <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div>
                </div> :
                      !!this.props.review && !!this.props.event?
                      <EmployeeCompletedComponent review={this.props.review} event={this.props.event}/>
                      :
                      <h1>This Page Cannot Be Loaded</h1>
              }
          </div>
      )
    }
}





export default createContainer(props => {
  let event=[];
  let review=[];
  let loading = false
  let loading2 = false
  let jobId = props.job._id
  let proId = props.id
  let conId = props.job.employerId
  let handleReview =  Meteor.subscribe('review-for-pro-completed', jobId, proId, conId);
  let handle = Meteor.subscribe('completed-job-pro-event',jobId);
  loading = handle.ready();
  loading2 = handleReview.ready();
  event = Event.find({}).fetch();


  return {
    loading: loading,
    loading2: loading2,
    event: event,
    review: review
  };
}, EmployeeCompletedOutter);
