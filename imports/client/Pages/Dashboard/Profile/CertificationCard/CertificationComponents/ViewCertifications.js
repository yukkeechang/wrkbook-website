import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../../Shared/MSpinner';
import SingleCertifcate from './SingleCertification';
class ViewCert extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    if(!this.props.ready){
      return(
        <MSpinner/>
      )
    }else if (this.props.certifications.length>0) {

      return(
        <div className="row">
          {this.props.certifications.map((certImage,index)=>{
            return(
              <div key={index} className="col s12 m6">
                <SingleCertifcate isPDF={certImage.original.type.includes('pdf')}
                  imageID={certImage._id}
                />
              </div>
            );
          })}
        </div>
      )

    }else{
      return(
        <div className="row center-align">
          <h5>No Certifications</h5>
        </div>
      )
    }
  }

}
export default ViewCertifications = withTracker( props  => {
    let certifications=[];
    let pdf = [];
    let certificationsHandle = Meteor.subscribe('cert-images',props.imageIds);
    let PDfhandle = Meteor.subscribe('cert-pdfs',props.imageIds);
    let ready = certificationsHandle.ready();
    let pdfready= PDfhandle.ready();
    certifications = Images.find({_id:  {$in : props.imageIds}}).fetch();
    pdf = PDFs.find({_id:{$in : props.imageIds}}).fetch();
    let combined = [];
    combined = certifications.concat(pdf);

    return {
      ready:pdfready&&ready,
      certifications:combined
    };
})(ViewCert);
