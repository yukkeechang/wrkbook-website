import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import WrkBookIcon from '../WrkBookIcon';
import ReactDOM from 'react-dom';

let styles = {
    logofull : {
        position: 'relative',
        height: '54px',
        top: '5px'
    },
    logo : {
        position: 'relative',
        height: '44px',
        top: '10px'
    },
    links:{
        color: 'white',
        fontSize:'18px',
        top: '17px',
        textAlign:'left',
        position: 'relative'
    },
    heading : {
        position: 'relative',
        top: '9px',
        fontSize:'30px',
        textAlign:'center'
    },
    headIcon: {
        position: 'relative',
        textAlign: 'right',
        top: '17px'
    },
    wrkbook: {
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',

    },
    icon : {
        fontSize: '30px'
    }
}

export default class Base extends Component{
  constructor(props){
      super(props);

  }
  componentDidMount(){
    console.log(this.props);
    let sn = ReactDOM.findDOMNode(this.refs.sideNav);
    $(sn).sideNav();
  }
  sideClick(){
      let sn = ReactDOM.findDOMNode(this.refs.sideNav);
      $(sn).sideNav('hide');


  }
  things(event){

    this.props.handleClick(event);
  }
    render(){
      return(
          <div className="row">

          <div ref="sideNav" data-activates="sideNav" className="col s4 hide-on-med-and-up">
              <i style={{fontSize:'30px',padding: '17px 0 17px 10px'}}className="material-icons">menu</i>
          </div>
              <Link to="/#" onClick={this.things.bind(this,"home")}>
                  <div className="col m4 hide-on-small-only">
                      <div style={{height: '54px',position:'relative',top:'5px', paddingLeft:'50px'}}>
                          <WrkBookIcon/>
                      </div>

                  </div>
                  <div  style={{textAlign:'center'}} className="col s4 center-align  hide-on-med-and-up">
                      <img style={styles.logo} src="/images/circle-logo.svg"/>
                  </div>
              </Link>
              <Link to="/#" onClick={this.things.bind(this,"home")}>
                <div  style={styles.links} className="col  m1 hide-on-small-only">Home</div>
              </Link>
              <Link to="/#price"  onClick={this.things.bind(this,"price")}>
                <div  style={styles.links} className="col  m1 hide-on-small-only">Pricing</div>
              </Link>
              <Link  to="/questions">
                <div  style={styles.links} className="col  m1 hide-on-small-only">FAQs</div>
              </Link>
              <Link to="/#HowTo"  onClick={this.things.bind(this,"HowTo")}>
                <div  style={styles.links} className="col  m2 hide-on-small-only">How it Works</div>
              </Link>
              <Link to="/login">
                  <div style={styles.heading} className="col m3  hide-on-small-only">
                      <span className="genText">Login</span>
                  </div>
                  <div  style={styles.headIcon} className="col s3 hide-on-med-and-up">
                      <i style={styles.icon} className="genText material-icons">account_circle</i>
                  </div>
              </Link>


              <ul id="sideNav" className="side-nav">
                  <li>
                      <div style={styles.wrkbook}>
                          <WrkBookIcon/>
                      </div>
                  </li>
                  <li>
                      <div className="divider"> </div>
                  </li>
                  <li>
                      <Link onClick={this.sideClick.bind(this)} to = "/">Home</Link>
                  </li>
                  <li>
                      <Link onClick={this.sideClick.bind(this)} to = "/price">Pricing</Link>
                  </li>
                  <li>
                      <Link onClick={this.sideClick.bind(this)} to = "/questions">FAQs</Link>
                  </li>


              </ul>
          </div>
      )
  }
}
