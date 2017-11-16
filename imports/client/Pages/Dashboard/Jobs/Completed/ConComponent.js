import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

 class ConComponentPage extends React.Component {
  constructor(props) {
    super(props);

  }

  //Get date from event details here
  componentDidMount(){

  }


  cardLabel() {
    return (
      <div>
        <div className="row center-align">
          <div className="col l11">
            <h4 className="col m4 l4">Professional</h4>
            <h4 className="col m4 l4">Details</h4>
            <h4 className="col m4 l4">Rating and Reviews</h4>
          </div>
        </div>
      </div>
    )
  }


  render() {
    console.log("loading: "+ this.props.loading)
    console.log(this.props.jobinfo._id)
    return(
      <div>
      <h1 className="center-align">Completed Jobs</h1>
        <div className="container">
          <div className="card">
            <div className="col s10 l12 push-s2 card grey lighten-1">
              <span className="card-title center-align">{this.props.title}</span>
            </div>
          {this.cardLabel()}

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



let styles = {

     fontWeight: 'bold',
     color: "black",

}
