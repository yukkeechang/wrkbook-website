import React from 'react';
import ReactDOM from 'react-dom';

import Avatar from '../../../Shared/Avatar';
import { Link } from 'react-router-dom';
export default class UpdateProfilePic extends React.Component{

  componentDidMount(){
    let select = ReactDOM.findDOMNode();
    $(select).ready(()=>{
      $('.modal').modal();
    });
  }
  constructor(props){
    super(props);
    this.state={
      image: '',
      picked: false,
      validImage: '',
      shownlink: ''
    };
  }
  updateImage(){
    let updateImage = this.state.image;
    Images.insert(updateImage, (err, fileObj) => {
      if(err){
        console.log(err);
        console.log('in error');
      }
      else{
        Meteor.call('updateImage', fileObj._id, (err) => {
          if(err){
            console.log(err);
          }
          else{
            console.log('pic uploaded');
            $(this.refs.confirmModal).modal('open');
          }
        })
      }
    })
  }
  onFileInputChange(e){
    if(e.target.files.length){
      let files = e.target.files;

      if(files[0].type.includes('image')){
        this.setState({validImage:'valid'});
      }
      else{
        this.setState({validImage:'invalid', shownlink:'', picked: false});
        return;
      }
      let fr = new FileReader();
      fr.onload = function() {
        window.localStorage.setItem('image',fr.result);
        this.setState({
          shownlink:window.localStorage['image'],
          image:window.localStorage['image'],
          picked: true
        });
      }.bind(this);
      fr.readAsDataURL(files[0]);
    }
    else{
      this.setState({shownlink:'', picked: false, image: ''});
    }
  }
  closeConfirmModal=()=>{
    $(this.refs.confirmModal).modal('open');
  }
  componentWillUnmount(){
    $(this.refs.confirmModal).modal('close');
  }
  render(){
    let image = this.props.image;
    return(
      <div className="col s12">
        <div className="col m6 s12">
          <Avatar imageId={image} size={300}/>
        </div>
        <div className="row">
          <div className="file-field input-field col s8">
            <div className="btn">
              <span>Upload Image</span>
              <input id="fileInput" onChange={this.onFileInputChange.bind(this)} type="file" accept="image/*"/>
            </div>
            <div className="file-path-wrapper">
              <input id='fileName' ref='fileName' className={"file-path  "+ this.state.validImage} type="text"/>
            </div>
          </div>
          <div className="col s2" style={{margin:"17px"}}>
            {this.state.picked ?
              <a className="waves-effect green lighten-3 btn-flat" onClick={this.updateImage.bind(this)}>
                Update
              </a>
              :
              null
            }
          </div>
        </div>
            <div ref="confirmModal" id="confirmModal" className="modal">
              <div className="modal-content">
                <h4>Your Image has been updated.</h4>
              </div>
              <div className="modal-footer">
                <Link to={"/profile"}>
                  <button className="waves-effect waves-red red lighten-3 btn-flat" onClick={this.closeConfirmModal}>
                    Close
                  </button>
                </Link>
              </div>
            </div>
      </div>
  );
  }
}
