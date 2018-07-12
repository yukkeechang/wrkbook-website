import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../Shared/MSpinner';
import RefCard from  './RefCard.js';

class RefOther extends React.Component{
  constructor(props) {
    super(props);
}

render(){
    if(!this.props.ready) {
      return(
        <MSpinner/>
      )
    } else if(this.props.references.length > 0) {
      return(
        <div className="card-panel">
          <div className="center-align"><h5>References</h5></div>
          {this.props.references.map((references) => {
            return(
              <RefCard references={references} key={references._id}/>
            )
          })}
        </div>
      )
    } else {

      return( <div>
                No References
            </div>
      )
    }
 }
}

export default RefForOther = withTracker(props => {
  let handle = Meteor.subscribe('references-for-user',props.userId);
  let ready = handle.ready();
  let references = Reference.find({}).fetch();
  //console.log(references)
  return {
    handle: handle,
    ready: ready,
    references: references
  }
})(RefOther);
