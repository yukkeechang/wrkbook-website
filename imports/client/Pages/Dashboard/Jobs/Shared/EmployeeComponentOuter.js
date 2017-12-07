import React ,{Component}from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import EmployeeCompletedComponent from './EmployeeComponentInner';

class EmployeeComponentOut extends Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
    render(){
      return(

          <div>
              {!this.props.loading && !this.props.loading2 ?
                <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div>
                </div> :
                       this.props.event.length > 0?
                      <EmployeeCompletedComponent
                      completed={this.state.completed}
                      current={this.state.current}
                      job={this.props.job}
                      id={this.props.id}
                      review={this.props.review[0]}
                      event={this.props.event[0]}
                      proId={this.props.id}
                      conId={this.props.job.employerId}
                      jobId={this.props.job._id}
                      />
                      :
                      <h1>This Page Cannot Be Loaded</h1>
              }
          </div>
      )
    }
}


export default EmployeeComponentOuter = createContainer((props) =>  {
  let event=[];
  let review=[];
  let loading = false
  let loading2 = false
  let jobId = props.job._id
  let proId = props.id
  let conId = props.job.employerId
  let handleReview =  Meteor.subscribe('review-for-pro-completed', proId, conId, jobId);
  let handle = Meteor.subscribe('completed-job-pro-event',jobId);
  loading = handle.ready();
  loading2 = handleReview.ready();
  event = Event.find({}).fetch();
  review = Review.find({}).fetch();


  return {
    loading: loading,
    loading2: loading2,
    event: event,
    review: review,
    proId: props.id,
    conId: props.job.employerId,
    jobId: props.job._id
  };
}, EmployeeComponentOut);
