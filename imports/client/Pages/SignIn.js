import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 
import Header from './Shared/Header';
import Footer from './Shared/Footer';

export default class SignIn extends Component{
  componentDidMount(){
    // let el = ReactDOM.findDOMNode(this.refs.sel);
    // $(el).ready(()=>{
    //   $('select').material_select();
    // });
  }
  render(){
    return(
      <div>
        <Header/>
          <div style={{height:'64px'}}></div>
          <div style={{zIndex:'-1'}} className="container">
            <div className="card z-depth-0">
              <div className="row card-content">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="email" type="text" className="validate"/>
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input id="password" type="password" className="validate"/>
                      <label htmlFor="password">Password</label>
                    </div>
                  </div>
                  <a className="btn-flat teal lighten-5" style={{color: 'black'}}type="submit">Login</a>
                </form>
              </div>  

            </div>
          </div>
        <Footer/>
      </div>

    )
  }
}