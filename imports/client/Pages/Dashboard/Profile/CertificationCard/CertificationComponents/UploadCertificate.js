import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import ViewPDF from './ViewPdf';


export default class UploadCertificate extends Component {
  constructor(props) {
    super(props);
    this.state={
      isImage: false,
      isPDF : false,
      validImage: '',
      shownlink: '',
      certImage: '',
      certSources: '',
      docWidth:0,
    }

  }
  closeModal(){
      $(this.refs.submitModal).modal('close');
  }
  updateDimensions(){

    this.setState({
      docWidth:document.getElementById("thingcard").offsetWidth- 50,
      picWidth: String(document.getElementById("things").offsetWidth -64)+'px',
      smallz: String((document.getElementById("things").offsetWidth -64)/5)+'px'
    });
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions.bind(this));

    // console.log(this.res);
    if(!this.refs)this.closeModal();
  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode(this.refs.submitModal);
    $(dropdowns).ready(()=>{
      $('.modal').modal();
    });

      this.setState({
          docWidth:document.getElementById("thingcard").offsetWidth- 50,
        picWidth: String(document.getElementById("things").offsetWidth -64)+'px',
      });

       window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  imageSubmit(){
    let certImage = this.state.certImage;

    if(this.state.isImage){
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
                $(this.refs.submitModal).modal('open');
              }
            });

          }
        });
      }
    if(this.state.isPDF){
      PDFs.insert(certImage, (err, fileObj)=>{
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
              $(this.refs.submitModal).modal('open');
            }
          });

        }
      });
    }
  }


      toggleFileBrowser(e){
        let inputField =document.getElementById('fileInput');
        inputField.click();
        this.setState({pesonalPic:true});
      }

      onFileInputChange(e){
        if(e.target.files.length){
          let files = e.target.files;
          console.log(files);
          if(files[0].type.includes('image')){
            this.setState({validImage:'valid', isImage:true,isPDF:false});
          }
          else if(files[0].type.includes('pdf')){
            console.log("pdf");
            this.setState({isPDF:true,validImage:'valid', isImage:false,pageNumber:1})
          }
          else{
            this.setState({isPDF:false,isImage:false,validImage: 'invalid',shownlink:'',button:'disabled'});
            return;
          }
          console.log(this.state);
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

  render() {
    return(
    <div>
      <div id="things"  className="card" >
        <div className="card-content">

          {
            !this.state.isImage && !this.state.isPDF ?
                <div className="col s12 center-align">
                      <img id="certificationImage" style={{height: '10vh'}} src={'/images/circle-logo.svg'}/>
                </div>
                :
                (this.state.shownlink.length > 1 ?
                    (this.state.isImage ?
                      <div className="col l6 m6 s12">
                        <img id="certificationImage" style={{width: this.state.picWidth}} src={this.state.shownlink}/>
                      </div>
                      :
                      <div className="col s12">
                        <ViewPDF width={this.state.docWidth} linkOrData={this.state.shownlink}/>
                      </div>
                    )
                  :
                  null
                )
          }

          <div id="thingcard" className="row">
            <div className="file-field input-field col m8 s12">
              <div className="btn">
                <span>Upload Certification</span>
                <input id="fileInput" onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*, application/pdf"/>
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
      <div ref="submitModal" id="submitModal" className="modal">
        <div className="modal-content">
          <h4 className="flow-text">You have successfully uploaded your certification.</h4>
        </div>
        <div className="modal-footer">
          <a className="waves-effect waves-light red lighten-3 btn-flat" onClick={this.closeModal.bind(this)}>Done</a>
        </div>
      </div>
    </div>
  );
  }
}
