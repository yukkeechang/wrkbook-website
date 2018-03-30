import React , { Component } from 'react';
import CertificationText from './CertificationComponents/CertificationText';
import CertificationView from './CertificationComponents/ViewCertifications';
import CertificationUpload from './CertificationComponents/UploadCertificate';
export default class Certificates extends React.Component {
constructor(props) {
  super(props);


}

render() {

  return (
      <div className="card-panel">
          <div className="row">
            <CertificationText
              backGround={false}
              tradeSchool={this.props.user.profile.employeeData.education.tradeSchool.wentToSchool}
              tradeSchoolName={this.props.user.profile.employeeData.education.tradeSchool.schoolName}
              driver={this.props.user.profile.employeeData.driverLicense}
              osha10={this.props.user.profile.employeeData.osha.osha10}
              osha30={this.props.user.profile.employeeData.osha.osha30}
            />
          </div>

          <div className="row">
            <CertificationView
              imageIds={this.props.user.profile.employeeData.certfi}
            />
          </div>

          {this.props.isUser &&
          <div className="row">
            <CertificationUpload user={this.props.user}/>
          </div>
        }
      </div>
  )
 }
}
