import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import WrkBookIcon from '../WrkBookIcon';
import ReactDOM from 'react-dom';



export default class Base extends Component{
  constructor(props){
      super(props);

  }
  componentDidMount(){
    //console.log(this.props);
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

  handleClick = (e) => {
    if (e === "How To") {
      this.props.handleClick("HowTo");
    } else {
      this.props.handleClick("collectEmails");
    }

  }
  /*links for full nav bar */
  links = (to, bind, linkName) => {
    if (to === "questions") {
      return (
        <Link to={to}>
          <div style={styles.links} className="col  m1 l1 hide-on-small-only nav-bar-text">{linkName}</div>
        </Link>
      )
    }
    if (linkName === "How It Works") {
      return (
        <Link to={to}  onClick={this.things.bind(this, bind)}>
          <div style={styles.links} className="col  m2 l2 hide-on-small-only nav-bar-text">{linkName}</div>
        </Link>
      )
    }
    if (bind === "HowTo") {
      return (
       <Link to={to}  onClick={this.things.bind(this, bind)}>
          <div style={styles.links} className="col  m2 hide-on-small-only nav-bar-text">{linkName}</div>
        </Link>
      )
    }
    return (
      <Link to={to}  onClick={this.things.bind(this, bind)}>
        <div style={styles.links} className="col  m1 l1 hide-on-small-only nav-bar-text">{linkName}</div>
      </Link>
    )
  }


    render(){
      return(
          <div className="row">

          {/*Menu bar/Small screen links */}
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

              {/*Full Nav bar & Medium/Large  screen links */}
                {this.links("/#", "home", "Home")}
                {this.links("/questions", "", "FAQ")}
                {this.links("/#HowTo", "HowTo", "How It Works")}


              {/* UNCOMMENT AFTER BETA CAN BE RELEASED!!
                 <Link to="/login">
                  <div style={styles.heading} className="col m1 offset-m1 valign-wrapper hide-on-small-only nav-bar-heading">
                      <div className="genText">Login</div>
                  </div>
                  <div  style={styles.headIcon} className="col s3 hide-on-med-and-up">
                      <i style={styles.icon} className="genText material-icons">account_circle</i>
                  </div>
              </Link>

              */}
              <Link to="/#collectEmails">
                <button id="rec-but" style={styles.rounded} className="col m2 push-l1 push-m1 hide-on-small-only nav-bar-heading" onClick={this.handleClick}>
                  <div className="genText">Sign Up</div>
                </button>
              </Link>

            {/* UNCOMMENT AFTER VERSION 2 LAUNCH
              <Link to="/register">
                <div id="rec-but" style={styles.heading} className="col m1  hide-on-small-only nav-bar-heading ">
                <div className="genText">Sign Up</div>
                </div>
              </Link>
            */}



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
                  {/*
                    <li>
                        <Link onClick={this.sideClick.bind(this)} to = "/#price">Pricing</Link>
                    </li>
                  */}
                  <li>
                      <Link onClick={this.sideClick.bind(this)} to = "/questions">FAQs</Link>
                  </li>
                  <li>
                      <a onClick={this.handleClick.bind(this, "How To")}>How it works</a>
                  </li>
                  <li>
                      <Link onClick={this.handleClick.bind(this)} to = "/">Sign Up</Link>
                  </li>


              </ul>
          </div>
      )
  }
}

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
        top: '22px',
        textAlign:'left',
        position: 'relative'
    },
    heading : {
        position: 'relative',
        top: '12px',
        textAlign:'center',
        padding: '0px'

    },
    rounded : {
        position: 'relative',
        top: '12px',
        textAlign:'center',
        padding: '0px',
        backgroundColor: 'transparent',
        border: '1px solid white'
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
    },
    butText: {
    		top: '9px',
    		right: '15px',
    		fontSize:'25px',
    		textAlign: 'center',
    		padding: 'none'

    }
}
