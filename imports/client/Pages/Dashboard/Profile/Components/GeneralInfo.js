import React from 'react';
import Rating from './Rating';

export default class GeneralInfo extends React.Component {

  constructor(props) {
    super(props);

    const {isPro, user} = this.props
    console.log("general info" + user)
    if(isPro) {
      this.state = {
        jobTitle: user.profile.employeeData.jobTitle
      }
    } else {
      this.state = {
        companyName: user.profile.employerData.companyName.text
      }
   }
}

  render() {
    const {user} = this.props
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel" style={{ paddingRight: 0 }}>
            <h4 className="user-name-text">{user.profile.firstName} {user.profile.lastName}</h4>
            <div className="row" style={{ marginLeft: 0 }}>
              <Rating
                rating={4.5}
                starSize={15}
                textSize={12}
              />
              <a
                style={{ fontSize: 12, display: "inline", padding: 0 }}
                onClick={this.props.onReviewsClick}
              >
                View all
              </a>
            </div>

            <div>
            {this.state.jobTitle
              .map(i => <span>{i}</span>)
              .reduce((prev, curr) => [prev, ',  ', curr])
            }
            </div>
            <p>{this.state.companyName}</p>
            <p className="gray-text" ></p>
          </div>
        </div>
      </div>
    )
  }
}
