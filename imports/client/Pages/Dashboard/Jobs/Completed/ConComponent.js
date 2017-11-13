import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

 class ConComponentPage extends React.Component {
  constructor(props) {
    super(props);

  }

  //Get date from event details here
  componentDidMount(){

  }

  cardHeader() {
    return (
      <div className="row">
        <div className="center-align">
        <div className="col s10 push-s1 card grey lighten-1">
          <div className="card-content white-text">
          <span className="card-title center-align">{this.props.title}</span>
          </div>
          </div>
        </div>
     </div>
    )
  }

  cardLabel() {
    return (
        <div className="row center-align">
          <div className="col s10">
            <h4 className="col m4 l4">Professional</h4>
            <h4 className="col m4 l4">Details</h4>
            <h4 className="col m4 l4">Rating and Reviews</h4>
          </div>
        </div>
    )
  }
  // console.log("employee:  "+ this.props.admitemployeeIds)
  // console.log("job:  "+ this.props.jobinfo)
  // console.log("pay: "+ this.props.jobinfo.pay)

  render() {
    console.log("loading: "+ this.props.loading)
    console.log(this.props.jobinfo._id)
    return(
      <div>
      <h1 className="center-align">Completed Jobs</h1>
        <div className="container">
          <div className="card">

          {this.cardHeader()}
          {this.cardLabel()}
          this.props.title
          {this.props.additionText}
          {this.props.pay}
          </div>
        </div>
      </div>

    )
  }

}
export default ConComponent = createContainer((props) => {
  let user = Meteor.user();
  let loading = false
  if(!('undefined' === typeof(user))){

    let handle = Meteor.subscribe('admit-employee-job', props.jobinfo._id );
    loading = handle.ready();
    console.log("loading: "+loading);
  }
  return {
    user: user,
    loading: loading
  };
}, ConComponentPage);
