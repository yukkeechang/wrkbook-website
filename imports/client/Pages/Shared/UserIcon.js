
import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

class UserI extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div style={{width:'54px', height:'30px'}}>
                <a className="dropdown-button" data-activates="logdrop">
                    <img style={{width: '30px', height: '30px',borderRadius:'100px',cursor:'pointer'}} src={this.props.link} alt=""/>
                </a>
                <i className="material-icons">arrow_drop_down</i>
            </div>
        )
    }
}
export default UserIcon = withTracker(props => {
    let things = [];
    const handle = Meteor.subscribe('images-id',props.imageId);
    const ready = handle.ready();
    things = Images.find({}).fetch()
    return {
        ready : handle.ready(),
        link : "cfs/files/images/" + props.imageId
    };
})(UserI);
