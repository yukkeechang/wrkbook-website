import React , { Component } from 'react';
import Avatar from '../Shared/Avatar';

const imageStore = new FS.Store.GridFS('images');
//COPY THIS
const Images = new FS.Collection('images',{
  stores: [imageStore]
});

export default class stepThree extends Component{
  constructor(props){
      super(props);

      console.log(props.user);

      this.state={
        shownlink:'',
        submit:'Submit',
        validImage: '',
        pesonalPic: false,
        onc3:false,
        width:350,
        basic: {}
      }
    }

    isEmpty(obj) {
      for (var key in obj){
          return false;
      }
      return true;
    }

    updateDimensions(){
      let width = document.getElementById('imageContain').offsetHeight * 0.70;
      this.setState({
        width: width,
      });

    }
    componentDidMount() {
      this.updateDimensions();



//on
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    toggleFileBrowser(e){
      let inputField =   document.getElementById('fileInput');
      inputField.click();
      this.setState({pesonalPic:true});


        // this.setState({basic:basicz});

    }



    onFileInputChange(e){

      if(e.target.files.length){
        if(!this.state.onc3){
          let basicz = $('#demo-basic').croppie({
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

        // let basicz = this.state.basic;
        // console.log(basicz);


      }else{
        this.setState({button:'disabled',shownlink:'',pesonalPic:false});
      }


    }
    submit(e){
      let basic = this.state.basic;
      if(this.isEmpty(this.state.basic)){
          Meteor.call('register',this.props.user,(err)=>{
            if(err) {
              console.log(err);
            }else{
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

                if(user.profile.isPro){
                  user.profile.employeeData.image = fileObj._id;
                  Meteor.call('register',user,(err)=>{
                    if(err) {
                      console.log(err);
                    }else{
                      this.props.next(4, user, false);
                    }
                  });
                }else{
                  user.profile.employerData.image = fileObj._id;
                  Meteor.call('register',user,(err)=>{
                    if(err) {
                      console.log(err);
                    }else{
                      this.props.next(4, user, false);
                    }
                  });
                }
              }
          });

      }.bind(this));
      }
    }



    render(){

        return (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>


                <div className="row">
                    <div id="imageContain" style={{display:'flex', justifyContent:'center',alignItems:'center'}}className="col s12">
                    {this.state.pesonalPic || this.state.shownlink.length >0?
                      <div className="circle" id="page">
                        <div id="demo-basic" onClick={this.toggleFileBrowser.bind(this)}>

                        </div>
                      </div>
                      :
                      <Avatar
                        size={this.state.width}
                        letter='Y'
                        onClick={this.toggleFileBrowser.bind(this)}
                        />
                    }





                    </div>


                    {!this.state.confirmed &&
                      <div  style={{display:'flex', justifyContent:'center',alignItems:'center'}}  className="col s12">
                        <div >
                          <div className="file-field input-field">
                            <div className="btn">
                              <span>Select Image</span>
                              <input  id="fileInput"   onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
                            </div>
                            <div className="file-path-wrapper">
                              <input id='fileName'className={"file-path  "+ this.state.validImage} type="text"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <div style ={{display:'flex',justifyContent:'center',alignItems:'center'}} className="col s12">
                      <a className='btn' onClick={this.submit.bind(this)}>{this.state.submit}</a>
                    </div>
                </div>


          </div>
        );
    }


}
