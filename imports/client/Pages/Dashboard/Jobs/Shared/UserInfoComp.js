// Component holds user image, user first and last name and rating for the
// company or the indivudal and displays on EmployeeComponentInner.js
import React from 'react';

import UserIcon from '../../../Shared/UserIcon';
import Avatar from '../../../Shared/Avatar';
import ViewReview from '../../Reviews/ViewReview';
export default class UserInfoComp extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount(){
    // console.log(this.props);
  //  console.log(this.props);
  }
  render(){

    // console. log(this.props.imageId);
    return (
        <div className="col s12 m4">
          <div className="row" style={{fontWeight:'bold'}}>
            <div className="center-align">
                {this.props.isPro?"Company":"Professional"}
            </div>

          </div>

          <div className="row ">
            <div className="col s12 m6 center-align">
              <Avatar imageId={this.props.imageId} size={this.props.size}/>
            </div>
            <div className="col s12 m6 center-align">
              <h5>{this.props.name}</h5>
              {this.props.ratingValue>0 &&
              <ViewReview ratingValue={this.props.ratingValue}
                          ratingText={!!this.props.ratingText? this.props.ratingText :""} />
              }
            </div>
          </div>
        </div>

    )
  }
}
