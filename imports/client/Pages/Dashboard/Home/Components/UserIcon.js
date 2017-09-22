import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


let styles = {  

  profileimageC: {
     position: 'absolute', width:'160px', height:'100px' ,padding: '17px 10px' , left: '35px'
  }

}

class UserI extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div  className="profilepicmain2">
                
                    <img  style={{width: '100%', height: 'auto',borderRadius:'100px',cursor:'pointer'}} src={this.props.link} alt=""/>
                
            </div>
        )
    }
}
export default UserIcon = createContainer((props) => {
    let user = Meteor.user();
    let imageId = user.profile.employerData.image;
    let employerId =  props.employerId;
  
    let things = [];
    const handle = Meteor.subscribe('images-id',imageId);
    const ready = handle.ready();
    things = Images.find({}).fetch()
    return {
        ready : handle.ready(),
        link : "cfs/files/images/" + imageId
    };
}, UserI);
