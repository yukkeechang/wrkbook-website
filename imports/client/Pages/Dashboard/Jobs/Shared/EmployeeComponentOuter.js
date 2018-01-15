import React ,{Component}from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import EmployeeCompletedComponent from './EmployeeComponentInner';

class EmployeeComponentOut extends Component{
  constructor(props){
    super(props);
    this.state = {
      user : {}
    }
  }
  componentWillMount(){
    Meteor.call('findUserbyId', this.props.id, function(err, res){
      if(err) {
        console.log("eror");
      } else {
        console.log(res);
        this.setState({
          user: res,
        })
      }
    }.bind(this));
  }
    render(){
      console.log(this.props.event);
      return(

          <div>
              {!this.props.loading && !this.props.loading2 ?
                <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}><MSpinner /></div>
                </div> :
                      this.props.event.length > 0 ?
                      this.props.event.map((eventNum, index)=>{
                        for (var i = 0; i < this.state.user.profile.employeeData.jobTitle.length; i++){
                          if(this.state.user.profile.employeeData.jobTitle[i] == this.props.event[index].title.text  && this.props.event[index].jobId == this.props.job._id){
                          return(
                            <EmployeeCompletedComponent
                            upcoming={this.props.upcoming}
                            completed={this.props.completed}
                            current={this.props.current}
                            job={this.props.job}
                            id={this.props.id}
                            review={this.props.review[0]}
                            event={this.props.event[index]}
                            proId={this.props.id}
                            conId={this.props.job.employerId}
                            jobId={this.props.job._id}
                            />
                          )}
                          else{<div></div>}
                        }
                      })
                      :
                      <h1>This Page Cannot Be Loaded</h1>
              }
          </div>
      )
    }
}


export default EmployeeComponentOuter = withTracker(props =>  {
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
  console.log(event);


  return {
    loading: loading,
    loading2: loading2,
    event: event,
    review: review,
    proId: props.id,
    conId: props.job.employerId,
    jobId: props.job._id
  };
})(EmployeeComponentOut);
