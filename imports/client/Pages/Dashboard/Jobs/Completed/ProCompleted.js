//make page for emp con import React from 'react';
import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';

class ProCompletedJobsPage extends React.Component {
  constructor(props) {
    super(props);

  }

render() {
  return (
    <div>
    blah
    </div>
  )
 }
}

export default ProCompleted = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, ProCompleted);
