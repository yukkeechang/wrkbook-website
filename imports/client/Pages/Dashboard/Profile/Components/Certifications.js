import React from 'react';

export default class Certifications extends React.Component {
  constructor(props) {
    super(props);
    const {user} = this.props
    const { bringTools, driverLicense} = user.profile.employeeData
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



  render() {
    return (
      <div >
        <div className="card">
          <div className="row card-content">
            <span className="col s12 card-title">Certifications</span>
              <div className="row">
                <div className="col s12 m6">
                {
                  this.state.driverLicense ?

                  <p>
                    <i className="material-icons left" style={{color: "green" }}>
                        check
                    </i>
                    Drivers License
                  </p> : null
                }
                </div>
                <div className="col s12 m6" >
                {
                  this.state.osha10 ?
                  <p>
                    <i className="material-icons left" style={{color: "green" }}>
                        check
                    </i>
                    Osha 10
                  </p> : null
                }
                </div>
                <div className="col s12 m6" >
                {
                  this.state.osha30 ?
                  <p>
                  <i className="material-icons left" style={{color: "green" }}>
                      check
                    </i>
                    Osha 30
                  </p> : null
                }
                </div>
                <div className="col s12 m6" >
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

                <div id="imageContain" style={{display:'flex', justifyContent:'center',alignItems:'center'}} className="col s12">
                {this.state.pesonalPic &&
                  <div  id="page">
                    <div id="demo-basic-pls">

                    </div>
                  </div>
                }
                </div>

                <div  style={{display:'flex', justifyContent:'center',alignItems:'center'}}  className="col s12">
                  <div >
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>Select Image</span>
                        <input  id="fileInput"   onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
                      </div>
                      <div className="file-path-wrapper">
                        <input id='fileName 'className={"file-path  "+ this.state.validImage} type="text"/>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
