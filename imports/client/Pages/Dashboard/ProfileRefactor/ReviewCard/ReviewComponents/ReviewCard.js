import React from 'react';
import Avatar from '../../../../Shared/Avatar';
import MSpinner from '../../../../Shared/MSpinner';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';


import ReactDOM from 'react-dom';

class ReviewComp extends React.Component {
constructor(props) {
  super(props);
  }


render() {
  //console.log(this.props);
    return(
      <div>
        <div className="divider"></div>
        {this.props.ready?
        <div className="row" style={{paddingTop: '18px'}}>
          <div className="col center-align s12 m4">
            {Roles.userIsInRole(this.props.review.reviewerId,"PRO") ?

            <Avatar key={this.props.user.profile.employeeData.image} imageId={this.props.user.profile.employeeData.image} size={this.props.size}/>
            :
              <Avatar key={this.props.user.profile.employerData.image} imageId={this.props.user.profile.employerData.image} size={this.props.size}/>
            }

          </div>
          <div className="col s12 m8">
            <div className="row">

                <div className="col s6 m8">
                  <h6>{this.props.user.profile.firstName+" "+this.props.user.profile.lastName}</h6>

                </div>
                <div className="col s6 m4">
                  <h6>{this.props.review.createdAt.toLocaleDateString()}</h6>
                </div>
            </div>

            <div className="row">
              <h6 style={{overflowWrap:'break-word'}}>{this.props.review.review}</h6>
              <Rating
                initialRate={this.props.review.rating}
                readonly={true}
                empty={<i className="material-icons" style={{fontSize: "20px", color: "#26a69a"}}>star_border</i>}
                full={<i className="material-icons" style={{fontSize: "20px", color: "#26a69a"}}>star</i>}
                fractions={2}
              />
            </div>

          </div>
        </div>
        :
        <MSpinner/>

      }
      <div className="divider"></div>
      </div>
    )
  }
}

export default ReviewCard = withTracker(props=>{
  let user={}
  let handle = Meteor.subscribe('other-user',props.review.reviewerId);
  let ready = handle.ready();
  return {
    ready:ready,
    user:Meteor.users.find({_id:props.review.reviewerId}).fetch()[0],

  };


})(ReviewComp);
