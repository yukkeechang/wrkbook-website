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

    osha10 ? this.state = {osha10: true} : this.state = {osha10: false}
    osha30 ? this.state = {osha30: true} : this.state = {osha30: false}
    bringTools ? this.state = {bringTools: true} : this.state = {bringTools: false}
    driverLicense ? this.state = {driverLicense: true} : this.state = {driverLicense: false}
    //why is this.state.osha10 or osha30 undefined?
    console.log(this.state.osha10)
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
