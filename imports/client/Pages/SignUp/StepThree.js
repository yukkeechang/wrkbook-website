import React , { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from '../Shared/Avatar';

const imageStore = new FS.Store.GridFS('images');
//COPY THIS
const Images = new FS.Collection('images',{
  stores: [imageStore]
});


class stepThree extends Component{
  constructor(props){
      super(props);

      this.state={
        shownlink:'',
        submit:'Submit',
        validImage: '',
        confirmed : false,
        width:350,
        button: 'disabled'
      }
    }
    updateDimensions(){
      let width = document.getElementById('imageContain').offsetHeight * 0.70;
      this.setState({
        width: width,
      });

    }
    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    toggleFileBrowser(e){
      document.getElementById('fileInput').click();
    }

    onFileInputChange(e){
      if(e.target.files.length){
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
        }.bind(this);
        fr.readAsDataURL(files[0]);
      }else{
        this.setState({button:'disabled',shownlink:'' });
      }


    }
    submit(e){
      let inputField = document.getElementById('fileInput');
      let files = inputField.files;

      Images.insert(files[0], function(err,fileObj){
         if (err) {
           console.log(err);
         }else{
           console.log(fileObj);
           this.setState({submit:'Submitted',
                          button: 'disabled',
                          confirmed:true});
         }
       }.bind(this));



    }


    render(){

        return (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
                <div className="row">
                    <div id="imageContain" style={{display:'flex', justifyContent:'center',alignItems:'center'}}className="col s12">
                        <Avatar
                        size={this.state.width}
                        srcLink={this.state.shownlink}
                        letter='Y'
                        onClick={this.toggleFileBrowser.bind(this)}
                        />
                    </div>
                    {!this.state.confirmed &&
                      <div  style={{display:'flex', justifyContent:'center',alignItems:'center'}}  className="col s12">
                        <form>
                          <div className="file-field input-field">
                            <div className="btn">
                              <span>Select Image</span>
                              <input  id="fileInput" onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
                            </div>
                            <div className="file-path-wrapper">
                              <input id='fileName'className={"file-path  "+ this.state.validImage} type="text"/>
                            </div>
                          </div>
                        </form>
                      </div>
                    }

                    <div style ={{display:'flex',justifyContent:'center',alignItems:'center'}} className="col s12">
                      <a className={'btn '+this.state.button} onClick={this.submit.bind(this)}>{this.state.submit}</a>
                    </div>
                </div>


          </div>
        );
    }


}

export default PictureStep = createContainer(({ params }) => {
    return {
        loggingIn: Meteor.loggingIn(),
        user: Meteor.user(),
    };
}, stepThree);
