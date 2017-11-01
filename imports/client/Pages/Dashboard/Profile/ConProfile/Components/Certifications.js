import React from 'react';

export default class Certifications extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    const { bringTools, driverLicense} = user.profile.employeeData
    const {osha10, osha30} = user.profile.employeeData.osha

    osha10 ? this.state = {osha10: true} : this.state = {osha10: false}
    osha30 ? this.state = {osha30: true} : this.state = {osha30: false}
    bringTools ? this.state = {bringTools: true} : this.state = {bringTools: false}
    driverLicense ? this.state = {driverLicense: true} : this.state = {driverLicense: false}
    //why is this.state.osha10 or osha30 undefined?
    console.log(this.state.osha10)
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5>Certifications</h5>
                {
                  this.state.driverLicense ?

                  <p>
                    <i className="material-icons left" style={{color: "green" }}>
                        check
                    </i>
                    Driver's License
                  </p> : null
                }
                {
                  this.state.osha10 ?
                  <p>
                    <i className="material-icons left" style={{color: "green" }}>
                        check
                    </i>
                    Osha 10
                  </p> : null
                }
                {
                  this.state.osha30 ?
                  <p>
                  <i className="material-icons left" style={{color: "green" }}>
                      check
                    </i>
                    Osha 30
                  </p> : null
                }
                {
                  this.state.bringTools ?

                  <p>
                    <i className="material-icons left" style={{color: "green" }}>
                        check
                    </i>
                    Has tools
                  </p> : null
                }
          </div>
        </div>
      </div>
    )
  }
}
