import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';






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

export default DummyEvents = createContainer(({ params }) => {
  let user = Meteor.user();
  let events =[];
  let loading = false;

  if(!('undefined' === typeof(user))){
    let handle = Meteor.subscribe('today-events');
    loading = handle.ready();
    events = Event.find({}).fetch();

  }
  return {
    user: user,
    loading:loading,
    events:events
  };
}, Eventz);
