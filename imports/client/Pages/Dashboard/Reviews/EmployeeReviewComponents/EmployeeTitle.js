import React, {Component}  from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Avatar from '../../../Shared/Avatar';


export default class EmployeeTitle extends Component {
  constructor(props) {
      super(props);
      this.state ={
        name:'',
        image:''
      }
      Meteor.call('findUserbyId', this.props.proId, function(err, res){
        if (err) {
          console.log("error finding user: "+err)
        } else {
          this.setState({
            name: res.profile.firstName+ " "+ res.profile.lastName,
            image: res.profile.employeeData.image,

          })
        }
      }.bind(this));
  }
  render(){
    return(
      <div className="row">
          <span className="col s12 card-title">
              Thank you for using WrkBook!
          </span>
          <span className="col s12 card-title">
              Please take a second to review <b>{this.state.name} </b>to help other contractors and professionals in the future
          </span>
          <div className="col s12">
            <Avatar imageId={this.state.image} size={100}/>
          </div>

      </div>
    );
  }
}
