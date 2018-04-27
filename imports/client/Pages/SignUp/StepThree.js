import React , { Component } from 'react';
import Avatar from '../Shared/Avatar';
import ReCAPTCHA from "react-google-recaptcha";
import {initGA, logPageView} from  '../Shared/GoogleAnalytics';

export default class stepThree extends Component{
  constructor(props){
      super(props);

      console.log(props.user);

      this.state={
        shownlink:'',
        submit:'Submit',
        validImage: '',
        stopclicks: '',
        pesonalPic: false,
        onc3:false,
        width:350,
        basic: {},
        captchaSolved: false,
        captchaWarningOn: false,
      }
    }

    isEmpty(obj) {
      for (var key in obj){
          return false;
      }
      return true;
    }


    componentDidMount() {
      initGA()
      logPageView()
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
          let basicz = $('#demo-basic').croppie({
            viewport: {
              width: 350,
              height: 350,
              type: 'circle'
            },
            boundary: {
                width: 400,
                height: 400
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
    submit(e){

      let basic = this.state.basic;
      // if(!this.state.captchaSolved){
      //   this.setState({
      //     captchaWarningOn:true
      //   });
      //   return;
      // }
      this.setState({stopclicks: 'disabled'});
      if(this.isEmpty(this.state.basic)){
          Meteor.call('register',this.props.user,(err)=>{
            if(err) {
              console.log(err);
            }else{
              this.setState({stopclicks: 'disabled'});
              this.props.next(4, this.props.user, false);
            }
          });
      }else{
        basic.croppie('result').then(function (resp) {
           Images.insert(resp, (err,fileObj)=>{
              if (err) {
                console.log(err);
              }else{
                let user = this.props.user;
                console.log(fileObj);
                if(user.profile.isPro){
                  user.profile.employeeData.image = fileObj._id;
                  Meteor.call('register',user,(err)=>{
                    if(err) {
                      console.log(err);
                    }else{
                      this.setState({stopclicks: 'disabled'});
                      this.props.next(4, user, false);
                    }
                  });
                }else{
                  user.profile.employerData.image = fileObj._id;
                  Meteor.call('register',user,(err)=>{
                    if(err) {
                      console.log(err);
                    }else{
                      this.setState({stopclicks: 'disabled'});
                      this.props.next(4, user, false);
                    }
                  });
                }
              }
          });

      }.bind(this));
      }
    }

  onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    // Get rid of red border around captcha box and get rid of error message
    this.setState({
      captchaSolved: true,
      captchaWarningOn: false,
    });
  }
  handlePrev(){
    let thin = window.sessionStorage.getItem('reg');

    UserObjectArray = JSON.parse(thin);
    this.props.next(2,UserObjectArray[0],UserObjectArray[0].profile.isPro)
  }



    render(){

        return (
            <div className="container">
            <div className="card">
            <div className="row card-content">
                <span className="col s12 card-title">Step 3 of 3</span>

            <div className="col s12">
                <div className="row">
                    <div id="imageContain" style={{display:'flex', justifyContent:'center',alignItems:'center'}} className="col s12">
                    {this.state.pesonalPic ?
                      <div id="page">
                        <div id="demo-basic">

                        </div>
                      </div>
                      :
                      <Avatar
                        size={this.state.width}
                        letter= {this.props.user.profile.firstName[0]}
                        onClick={this.toggleFileBrowser.bind(this)}
                        />
                    }





                    </div>
                  </div>


                    {!this.state.confirmed &&
                    <div className="row">
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
                    }
                <div className="row">
                    <div
                    style={{display:'flex', justifyContent:'center',alignItems:'center'}}
                     className="col s6 offset-s3"
                     style={ this.state.captchaWarningOn ?
                       { border: "1px solid red", display: "inline-block", padding: 5 } :
                       { display: "inline-block", padding: 5 }
                     }
                   >
                   <div
                   style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                     <ReCAPTCHA
                       ref="recaptcha"
                       sitekey="6LcGWEcUAAAAAB3-GDcONGEIoUOnSLwY8WJHIcDa"
                       onChange={this.onCaptchaChange}
                     />

                    </div>
                    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                    { this.state.captchaWarningOn ?
                      <p style={{color: "red"}}>Please verify that you are not a robot.</p>
                      :
                      null
                    }
                    </div>
                    <div style={{margin: "10px auto", textAlign: "center"}}>
                        By signing up, I agree to the WrkBook<br/><a target="_blank" href="TermsAndConditions.pdf">User Access Terms and Conditions</a>
                    </div>
                   </div>

                </div>
                <div className="row">
                  <a onClick={this.handlePrev.bind(this)} className="btn-flat blue-grey lighten-4 col s5 m3" style={{color: 'black',textAlign:'center',marginTop: '8px'}}>Back</a>
                  <a onClick={this.submit.bind(this)} className={"btn-flat teal lighten-4 " + this.state.stopclicks  +" col s5 offset-s2 m3 offset-m6"} style={{color: 'black',textAlign:'center',marginTop: '8px'}}type="submit">{this.state.submit}</a>
                </div>
              </div>
            </div>
            </div>
            </div>




        );
    }
}
