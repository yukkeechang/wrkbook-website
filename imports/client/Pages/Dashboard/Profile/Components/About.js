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

  render() {
    const {highGED, tradeSchool, higherEdu} = this.props.user.profile.employeeData.education
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
                Skills: {this.state.skills}
              </div>
              <div className="col s12">
              Languages Spoken:
              {this.state.languages
                .map(i => <span>{i}</span>)
                .reduce((prev, curr) => [prev, ', ', curr])
              }
              </div>
              <div className="col s12">
              Education Level:
              {highGED ? " High School/GED" : null }
              {tradeSchool ? " Trade School" : null }
              {higherEdu ? " Higher Education" : null }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
