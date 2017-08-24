import React from 'react';

export default class Certifications extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    console.log("user from certif" + user)
    const {osha10, osha30, bringTools, driverLicense} = user.profile.employeeData

    if (!osha10 && osha30) {
      this.state = {
        osha30: user.profile.employeeData.osha.osha30
      }
    } else if (osha10 && !osha30) {
      this.state = {
        osha10: user.profile.employeeData.osha.osha10
      }
    }
    //why is bringTools undefined?
    bringTools ? this.state = {bringTools: true} : this.state = {bringTools: false}
    driverLicense ? this.state = {driverLicense: true} : this.state = {driverLicense: false}
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5>Certifications</h5>
                {
                  this.state.driverLicense ? <i className="material-icons left" style={{color: "green" }}>
                      check
                    </i> : null
                }
                {
                  this.state.osha10 ? <i className="material-icons left" style={{color: "green" }}>
                      check
                    </i> : null
                }
                {
                  this.state.osha30 ? <i className="material-icons left" style={{color: "green" }}>
                      check
                    </i> : null
                }
          </div>
        </div>
      </div>
    )
  }
}
