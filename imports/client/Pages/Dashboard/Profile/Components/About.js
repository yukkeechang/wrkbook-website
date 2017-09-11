import React from 'react';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    const {user, isPro} = this.props
      if(!isPro) {
        this.state = {
          about: user.profile.employerData.about.text
        }
      } else {
        this.state = {
          about: user.profile.employeeData.about.text,
          languages: user.profile.employeeData.languages,
          skills: user.profile.employeeData.skills.text
        }
      }
  }

  renderEdu() {
    const {highGED, tradeSchool, higherEdu} = this.props.user.profile.employeeData.education
    return (
      <div>
      <p>Education Level:</p>
      <p>{highGED ? " High School/GED" : null }</p>
      <p>{tradeSchool ? " Trade School" : null }</p>
      <p>{higherEdu ? " Higher Education" : null }</p>
      </div>
    )
  }

  renderLanguages() {
    return (
      <div>
      <p>Languages Spoken:</p>
      <p>{this.state.languages
        .map(i => <span>{i}</span>)
        .reduce((prev, curr) => [prev, ', ', curr])
      }</p>
      </div>
    )
  }

  renderSkills() {
    return (
      <div>
      Skills: {this.state.skills}
      </div>
    )
  }

  render() {

    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5>About</h5>
            <div className="row">
              <div className="col s12" style={{ marginBottom: 10 }}>
               {this.state.about}
              </div>
              <div className="col s12" style={{ marginBottom: 10 }}>
              {
                this.props.isPro ? this.renderSkills() : null
              }
              </div>
              <div className="col s12">
              {
                this.props.isPro ? this.renderLanguages() : null
              }

              </div>
              <div className="col s12">
              {
                this.props.isPro ? this.renderEdu() : null
              }

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
