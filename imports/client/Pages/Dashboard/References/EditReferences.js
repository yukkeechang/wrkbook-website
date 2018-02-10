import React, {Component} from 'react';
import NewRef from './NewRef';
import EditRef from './EditRef';
import RefCard from  './RefCard.js';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import MSpinner from '../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
class EditRefs extends Component{

    render(){
        return(
          <div className="container">
                <h3 className="center-align">Edit References</h3>
                {!this.props.ready ? <div className="row"><div className="col s4 offset-s4" style={{textAlign: 'center'}}>You have no references</div></div> : this.props.myRefs.map((reference,index)=>{
                  return(
                    <EditRef key={reference._id} reference={reference}/>
                  )
                })}
          </div>
        )
    }
}
export default EditReferences = withTracker(params  => {
    let handle = Meteor.subscribe('your-references');
    let ready = handle.ready();
    return {
        ready: ready,
        myRefs: Reference.find({}).fetch()
    };
})(EditRefs);
