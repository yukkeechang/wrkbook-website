import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import Header from './Shared/Header';
import Footer from './Shared/Footer';

export default class SignIn extends Component{
  componentDidMount(){
    let el = ReactDOM.findDOMNode(this.refs.sel);
    $(el).ready(()=>{
      $('select').material_select();
    });
  }
  render(){
    return(
      <div>
        <Header/>
          <div style={{height:'64px',flex:'1 0 auto'}}></div>
          <div className="container">
            <div className="row">
              <div className="input-field col s12">
                <select ref="sel" defaultValue="0">
                  <option value="0" disabled>O yea?</option>
                  <option value="1">Nut</option>
                  <option value="2">Nutt</option>
                  <option value="3">Nuttt</option>
                </select>
                <label>Oh hi mark</label>
              </div>
            </div>
          </div>
        <Footer/>
      </div>

    )
  }
}