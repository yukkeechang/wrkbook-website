import React from 'react';
import ReactDOM from 'react-dom';

export default class Certifications extends React.Component{
  componentDidMount(){
    let dropdowns = ReactDOM.findDOMNode();
    $(dropdowns).ready(()=>{
      $('.carousel').carousel({indicators: true});
    });
  }
  constructor(props) {
    super(props);
    this.state={
      validImage: '',
      shownlink: '',
      certSources: []
    };
    const {user} = this.props
    const {bringTools, driverLicense} = user.profile.employeeData
    const {osha10, osha30} = user.profile.employeeData.osha

    this.state={
      osha10 : osha10,
      osha30 : osha30,
      bringTools:bringTools,
      driverLicense:driverLicense,
      height: "0px",
      validImage: '',
      pesonalPic: false,
      basic : {}
    };

  }
  isEmpty(obj) {
    for (var key in obj){
        return false;
    }
    return true;
  }

  componentDidMount() {


    $('#fileInput').on('click',function(e){
      if(e.type === 'click'){
        this.setState({pesonalPic:true});
      }
    }.bind(this));


  }

  toggleFileBrowser(e){
    let inputField =document.getElementById('fileInput');
    inputField.click();
    this.setState({pesonalPic:true});


  }



  onFileInputChange(e){
    console.log(e.target.files);
    console.log(this.state.pesonalPic);
    if(e.target.files.length){
      if(!this.state.onc3 || this.isEmpty(this.state.basic) ){
        let basicz = $('#demo-basic-pls').croppie({
          viewport: {
            width: 350,
            height: 350,
            type: 'circle'
          }
        });
        this.setState({onc3:true,
          basic:basicz});
      }

      let files = e.target.files;

      if(files[0].type.includes('image')){
        this.setState({validImage:'valid'});
      }else{
        this.setState({validImage: 'invalid',shownlink:'',button:'disabled'});

        return;
      }
      let fr = new FileReader();
      fr.onload = function() {
        window.localStorage.setItem('image',fr.result);
        this.setState({shownlink:window.localStorage['image'],
        button:''});
        let basicz = this.state.basic;
        basicz.croppie('bind', {
          url:window.localStorage['image'],
        });
        this.setState({basic:basicz});
      }.bind(this);
      fr.readAsDataURL(files[0]);

    }else{
      console.log('On cancel ');

      this.setState({button:'disabled',
      shownlink:'',
      pesonalPic:false,
      basic:{}});
    }


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
        button:''});
      }.bind(this);
      fr.readAsDataURL(files[0]);
    }
    else{
      this.setState({button:'disabled',shownlink:'' });
    }
  }
  imageSubmit(){
    console.log('clickclack');
  }



  render() {
    return (
      <div className="card-panel">
        <div className="card teal">
          <div className="card-content">
            <h5>Certifications</h5>
            <div className="carousel">

              <a className="carousel-item" href="#one!"><img src="/images/facebook.png"/></a>
              <a className="carousel-item" href="#two!"><img src="/images/facebook.png"/></a>
              <a className="carousel-item" href="#three!"><img src="/images/facebook.png"/></a>
              <a className="carousel-item" href="#four!"><img src="/images/facebook.png"/></a>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="col l6 m6 s12">
              <img id="certificationImage" src={this.state.shownlink} height='350px' width='350px' style={{}}/>
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
      </div>
    )
  }
}
