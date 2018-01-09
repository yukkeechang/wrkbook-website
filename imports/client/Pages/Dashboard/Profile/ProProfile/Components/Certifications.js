import React from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import MSpinner from '../../../../Shared/MSpinner';
import { Document, Page } from 'react-pdf/build/entry.noworker';

class Cert extends React.Component{
  updateDimensions(){

    this.setState({
      docWidth: document.getElementById('someCard').offsetWidth,
      picWidth: String(document.getElementById("things").offsetWidth -64)+'px',
      smallz: String((document.getElementById("things").offsetWidth -64)/5)+'px'
    });
  }
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.carousel').carousel({indicators: true,});
    });
    this.setState({
      docWidth: document.getElementById('someCard').offsetWidth,
      picWidth: String(document.getElementById("things").offsetWidth -64)+'px',
    });

     window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  onDocumentLoad = ({ numPages }) => {
  let thingz = Array(numPages).fill().map((e,i)=>i+1);

  this.setState({ numPages , pagesTomap:thingz});
}
onDocumentRender = () => {
  let node = ReactDOM.findDOMNode(this.refs[1]);
  //  node.classList.toggle('active');
}
  constructor(props) {
    super(props);
    this.state={
      isImage: false,
      isPDF : false,
      validImage: '',
      shownlink: '',
      certImage: '',
      certSources: '',
      numPages: null,
      pageNumber: 1,
      docWidth:0,
      pagesTomap: [],
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
      console.log(files);
      if(files[0].type.includes('image')){
        this.setState({validImage:'valid', isImage:true,isPDF:false});
      }
      else if(files[0].type.includes('pdf')){
        this.setState({isPDF:true,validImage:'valid', isImage:false,pageNumber:1})
      }
      else{
        this.setState({validImage: 'invalid',shownlink:'',button:'disabled'});
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
            }
          });
          console.log(user.profile.employeeData);
        }
      });
    }
  pageClick(e){
    console.log(e);
    let node = ReactDOM.findDOMNode(this.refs[e]);
    for (let i = 1; i <= this.state.numPages; i++) {
      let removeclass = ReactDOM.findDOMNode(this.refs[i]);
      removeclass.classList.remove('active');
    }



    node.classList.toggle('active');
    this.setState({pageNumber:e});
  }
  leftClick(e){

  }
  rightClick(e){

  }

  render() {

    return (
      <div className="card-panel">
        <div id="someCard" className="card">
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
                <a className="carousel-item"><img src="images/worker.png"/></a>
            }
            </div>
          </div>
        </div>

        <Document
            file={this.state.certImage}
            loading={MSpinner}
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page onRenderSuccess={this.onDocumentRender} width={this.state.docWidth} pageNumber={this.state.pageNumber} />
        </Document>
      <div className="center-align">
      <ul className="pagination">
        <li className="waves-effect" onClick={this.leftClick.bind(this)}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        {
          this.state.pagesTomap.map((number,index)=>{
            return (
              <li ref={number} className="waves-effect" onClick={this.pageClick.bind(this,number)}><a href="#!">{number}</a></li>
            )
          })
        }

        <li className="waves-effect" onClick={this.rightClick.bind(this)}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
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
