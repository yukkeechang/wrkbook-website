import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class Cert extends React.Component{
  updateDimensions(){
    this.setState({
      picWidth: String(document.getElementById("things").offsetWidth -64)+'px',
      smallz: String((document.getElementById("things").offsetWidth -64)/5)+'px'
    });
  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.modal').modal();
      $('.carousel').carousel({indicators: true,});
    });
    this.setState({
      picWidth: String(document.getElementById("things").offsetWidth -64)+'px',
    });

     window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  constructor(props) {
    super(props);
    this.state={
      validImage: '',
      shownlink: '',
      certImage: '',
      certSources: '',
    };
  }
  isEmpty(obj) {
    for (var key in obj){
        return false;
    }
    return true;
  }

  toggleFileBrowser(e){
    let inputField =document.getElementById('fileInput');
    inputField.click();
    this.setState({pesonalPic:true});
  }

  onFileInputChange(e){
    if(e.target.files.length){
      let files = e.target.files;

      if(files[0].type.includes('image')){
        this.setState({validImage:'valid'});
      }
      else{
        this.setState({validImage: 'invalid',shownlink:'',button:'disabled'});
        return;
      }
      let fr = new FileReader();
      fr.onload = function() {
        window.localStorage.setItem('image',fr.result);
        this.setState({shownlink:window.localStorage['image'],
        certImage:window.localStorage['image'],
        button:''});
        let certification = this.state.certImage;
        this.setState({certImage: certification})
      }.bind(this);
      fr.readAsDataURL(files[0]);
    }
    else{
      this.setState({button:'disabled',shownlink:'' });
    }
  }

  imageSubmit(){
    let certImage = this.state.certImage;
      Images.insert(certImage, (err, fileObj)=>{
        if(err){
          console.log(err);
        }
        else{
          let user = this.props.user
          console.log(fileObj);
          this.setState({certSources: fileObj._id});
          console.log(this.state.certSources);
          Meteor.call('uploadCertificate', this.state.certSources, (err)=>{
            if(err){
              console.log(err);
            }
            else{
              console.log('done boi');
              $('#submitModal').modal('open');
            }
          });
          console.log(user.profile.employeeData);
        }
      });
    }
    closeModal(){
      $('#submitModal').modal('close');
       window.location.reload();
    }

  render() {
    return (
      <div className="card-panel">
        <div className="card">
          <div className="card-content">
            <h5>Certifications</h5>
            <div className="carousel ">
            {
              this.props.user.profile.employeeData.certfi.length>0 ?
              this.props.user.profile.employeeData.certfi.map((title, index)=>{
                return(
                  <a className="carousel-item"><img src={ "cfs/files/images/" +this.props.links[index]}/></a>
                )
              })
              :
                <h4 className="flow-text">You have no uploaded certifications.</h4>
            }
            </div>
          </div>
        </div>
        <div id="things"  className="card" >
          <div className="card-content">
            <div className="col l6 m6 s12">
              <img id="certificationImage" style={{width: this.state.shownlink.length > 1 ? this.state.picWidth : this.state.smallz}} src={this.state.shownlink.length > 1 ? this.state.shownlink : 'images/circle-logo.svg'}/>
            </div>
            <div className="row">
              <div className="file-field input-field col m8 s12">
                <div className="btn">
                  <span>Upload Certification</span>
                  <input id="fileInput" onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
                </div>
                <div className="file-path-wrapper">
                  <input id='fileName'className={"file-path  "+ this.state.validImage} type="text"/>
                </div>
              </div>
              <div className="col m6 s12 offset-m4">
                <div className="btn" onClick={this.imageSubmit.bind(this)}>
                  <span>Submit Certification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="submitModal" className="modal">
          <div className="modal-content">
            <h4 className="flow-text">You have successfully uploaded your certification.</h4>
          </div>
          <div className="modal-footer">
            <a className="waves-effect waves-light red lighten-3 btn-flat" onClick={this.closeModal.bind(this)}>Done</a>
          </div>
        </div>
      </div>
    )
  }
}
export default Certifications = withTracker(props=>{
  let things = [];
  let user = Meteor.user();
  let handle = Meteor.subscribe('cert-images', user.profile.employeeData.certfi);
  let ready = handle.ready();
  things = Images.find({}).fetch()
  return{
    links: user.profile.employeeData.certfi
  };
})(Cert);
