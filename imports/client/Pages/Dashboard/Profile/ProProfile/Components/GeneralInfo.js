import React from 'react';
import Rating from './Rating';
import ARating from './ARating';

export default class GeneralInfo extends React.Component {

  constructor(props) {
    super(props);

    const {isPro, user} = this.props
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
              <ARating/>
              <a
                style={{ fontSize: 12, display: "inline", padding: 0 }}
                onClick={this.props.onReviewsClick}
              >
                View all
              </a>
            </div>

            <div>

            {this.props.isPro ? this.state.jobTitle
              .map(i => <span>{i}</span>)
              .reduce((prev, curr) => [prev, ',  ', curr]) : null
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
