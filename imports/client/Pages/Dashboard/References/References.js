import React, {Component} from 'react';
import NewRef from './NewRef';
import EditRef from './EditRef';
import MSpinner from '../../Shared/MSpinner';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
class Refs extends Component{
    render(){
        return(
            <div className="container">
                <NewRef/>
                {!this.props.ready ? <div className="row"><div className="col s4 offset-s4"style={{textAlign: 'center'}}></div></div> : this.props.myRefs.map((reference,index)=>{
                    return(
                        <EditRef key={reference._id} reference={reference}/>
                    )
                })}
            </div>
        )
    }
}
export default References = createContainer(({ params }) => {
    let handle = Meteor.subscribe('your-references');
    let ready = handle.ready();
    return {
        ready: ready,
        myRefs: References.find({}).fetch()
    };
}, Refs);
