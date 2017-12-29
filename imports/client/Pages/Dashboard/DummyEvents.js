import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

//Just Pull EVENTS




class Eventz extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    console.log(this.props.events);
    return(
      <div>
        j
      </div>
    )
  }
}

export default DummyEvents = withTracker( params  => {
  let user = Meteor.user();
  let events =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('today-events',new Date());
    loading = handle.ready();
    events = Event.find({}).fetch();

  }
  return {
    user: user,
    loading:loading,
    events:events
  };
})(Eventz);
