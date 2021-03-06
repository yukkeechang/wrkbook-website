import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../UserIcon';
import ReactDOM from 'react-dom';
import NavBarNotfications from '../../Dashboard/Notifications/NavBar/NotificationsNav';
import NavBarMessages from '../../Dashboard/Messages/NavBar/MessagesNav';
import WrkBookIcon from '../WrkBookIcon';
import { withTracker } from 'meteor/react-meteor-data';

let styles = {
    logo : {
        position: 'relative',
        height: '44px',
        top: '10px'
    },

    firstName : {
        padding: '17px 0',
        fontSize:'20px',
        textAlign:'right'
    },
    links:{
        color: 'white',
        padding: '17px 0',
        fontSize:'18px',
        textAlign:'left'
    },
    account:{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent:'flex-end',
    },
    profile: {
        textAlign: 'right',
        padding: '17px 10px'
    },
    icon: {
        fontSize:'30px',
        padding: '17px 0 17px 10px'
    },
    wrkbook: {
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',

    },
    sideNavJobDropdown: {
      textAlign: 'left',
      color: 'black',
    },
}
export class NavBarPage extends Component{
    constructor(props){
        super(props);

        //delete?
          if(this.props.user.roles[0]==="CON"){
            this.state={isPro: false,switchNav:false}
          } else if (this.props.user.roles[0]==="PRO") {
            this.state={isPro: true,switchNav:false}
        }
    }

    componentDidMount(){
        let el = ReactDOM.findDOMNode(this.refs.dropdown);
        $(el).dropdown({
            hover: true,
            belowOrigin: true,
            alignment: 'right',
            constrainWidth: false
        });
        let jobDropDown = ReactDOM.findDOMNode(this.refs.jobdropdown);
        $(jobDropDown).dropdown({
            hover: true,
            belowOrigin: true,
            alignment: 'left',
            constrainWidth: false
        });
        let jobDropDownSideNav = ReactDOM.findDOMNode(this.refs.jobdropdownSideNav);
        $(jobDropDownSideNav).dropdown({
            hover: true,
            belowOrigin: true,
            alignment: 'left',
            constrainWidth: false
        });
        let notificationDrop = ReactDOM.findDOMNode(this.refs.dropdownnotes);
        $(notificationDrop).dropdown({
            hover:true,
            belowOrigin:true,
            alignment:'left',
            constrainWidth:false,
            gutter: 0
        })
        let sn = ReactDOM.findDOMNode(this.refs.sideNav);
        $(sn).sideNav();
        let collapse = ReactDOM.findDOMNode(this.refs.collapsibleref);
         $(collapse).collapsible();


    }
    logout(){
        // console.log(this.props);
        Meteor.logout();
        // console.log(this.props);
    }
    arrow(){
      this.setState({switchNav:!this.state.switchNav});
    }


    sideClick(){
        let sn = ReactDOM.findDOMNode(this.refs.sideNav);
        $(sn).sideNav('hide');
        let collapse = ReactDOM.findDOMNode(this.refs.collapsibleref);
        $(collapse).collapsible('close', 0);
          this.setState({switchNav:false});

    }

    render(){
      let subscription = this.state.isPro ? "" : <li><Link to='/settings/subscription'>Subscription</Link></li>

      let jobDropDownLinks = this.state.isPro ?
      <ul id='jobs' className='dropdown-content'>
        <li><Link to='/jobmatches'>Job Matches</Link></li>
        <li><Link to='/applied'>Applied Jobs</Link></li>
        <li><Link to='/current'>Current</Link></li>
        <li><Link to='/completed'>Completed</Link></li>
        <li><Link to='/upcoming'>Upcoming</Link></li>

      </ul>
      :
      <ul id='jobs' className='dropdown-content'>
        <li><Link to='/upcoming'>Upcoming</Link></li>
        <li><Link to='/current'>Current</Link></li>
        <li><Link to='/completed'>Completed</Link></li>
        <li><Link to='/createjob'>Create Job</Link></li>

      </ul>

      let jobDropDownLinksSideNav = this.state.isPro ?
        <li>
        <div  className="collapsible-header" style={{paddingLeft:'30px'}}>Jobs{this.state.switchNav  ?
        <i className="large material-icons">arrow_drop_up</i> :
        <i className="large material-icons">arrow_drop_down</i>
      }</div>
        <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/jobmatches'>Job Matches</Link></div>
        <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/applied'>Applied Jobs</Link></div>
        <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/current'>Current Jobs</Link></div>
        <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/completed'>Completed Jobs</Link></div>
        <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/upcoming'>Upcoming</Link></div>
        </li>

      :

        <li>
          <div ref="jobsthingz" className="collapsible-header" style={{paddingLeft:'30px'}}>Jobs {this.state.switchNav ?
          <i className="large material-icons">arrow_drop_up</i> :
          <i className="large material-icons">arrow_drop_down</i>
          }</div>
          <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/current'>Current Jobs</Link></div>
          <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/completed'>Completed Jobs</Link></div>
          <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/createjob'>Create Job</Link></div>
          <div className="collapsible-body"  style={{paddingLeft:'35px'}}><Link onClick={this.sideClick.bind(this)} to='/upcoming'>Upcoming</Link></div>


        </li>

        return(
            <div className="row">
            <div ref="sideNav" data-activates="sideNav" className="col s4 hide-on-med-and-up">
                <div className="valign-wrapper left-align">
                  <i style={styles.icon}className="material-icons">menu</i>{this.props.general > 0 ?
                  <span className="new badge">{this.props.general}</span> : null}
                </div>
            </div>
            <div style={{textAlign:'center'}}className="col s4 m1">
              <Link to='/'>
                <img style={styles.logo} src="/images/circle-logo.svg"/>
              </Link>
            </div>
            <div style={styles.links} className="col m2 hide-on-small-only genText"><Link style={styles.links}to="/">Home</Link></div>

            <div style={styles.links} ref="jobdropdown" data-activates='jobs' className="col m2 hide-on-small-only genText">
                <div className="valign-wrapper">
                  <Link style={{color:'white'}} to="/upcoming">Jobs
                  </Link>
                  <i className="material-icons">arrow_drop_down</i>
                </div>
            </div>


            <div ref="dropdownnotes" data-activates='notification' style={styles.links} className="col m2 hide-on-small-only genText">
              <div className="valign-wrapper">

              <Link style={{color:'white'}} to="/notifications">Notifications{this.props.general > 0 ?
                    <span className="new badge">{this.props.general}</span> : null}
                </Link>
              </div>
            </div>

            <div ref="dropdown" data-activates='account' style={styles.account}className="col s3 m3 push-m2 push-s1">
                <div style={styles.firstName} className="hide-on-small-only">
                  <Link style={{color:'black'}}to="/profile">{this.props.user.profile.firstName}</Link>
                </div>
                <div style={styles.profile}>
                    <UserIcon imageId={this.props.image}/>
                </div>
            </div>

            <ul id='account' className='dropdown-content'>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/settings">Account Settings</Link></li>
              <li><Link to='/settings/password'>Change Password</Link></li>
              <div>{subscription}</div>
              <li><Link to="/" onClick={this.logout.bind(this)}>Logout</Link></li>
            </ul>

              <ul id='notification' className='dropdown-content  blue-grey lighten-5'>
                { this.props.notifications > 0 ?
                  <Link  style={{color:'black'}}  to="/notifications">
                  <h5 className="card-title center-align">Notifications{this.props.notifications > 0 ?
                        <span> ({this.props.notifications})</span> : null}</h5>
                    </Link>
                    :
                    null
                }
                <NavBarNotfications/>
                {
                  this.props.messages > 0 ?
                    <Link style={{color:'black'}} to="/messages"><h5 className="card-title center-align">Messages{this.props.messages > 0 ?
                      <span> ({this.props.messages})</span> : null}</h5>
                    </Link>
                    :
                    null
                }
                <NavBarMessages/>
              </ul>


            <div>{jobDropDownLinks}</div>

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
                    <Link onClick={this.sideClick.bind(this)} to = "/profile">Profile</Link>
                </li>
                <li>
                    <ul ref="collapsibleref" className="collapsible" data-collapsible="accordion" onClick={this.arrow.bind(this)}>
                        {jobDropDownLinksSideNav}
                    </ul>
                </li>
                {/*
                <li>
                    <Link onClick={this.sideClick.bind(this)} to = "/notifications">Notifications{this.props.general > 0 ?
                        <span className="new badge">{this.props.general}</span> : null}</Link>
                </li>

                  <li>
                      <Link onClick={this.sideClick.bind(this)} to = "/messages">Messages</Link>
                  </li>


                   */
                }


            </ul>
            </div>

        )
    }
}

export default NavBar = withTracker( params => {
  let handle = Meteor.subscribe('notifications-for-user');
  let messageHandle = Meteor.subscribe('unread-messages');
  let ready = handle.ready();
  let messageReady = messageHandle.ready();
  let messages = Message.find({seen:false}).count();
  let notifications = Notification.find({seen:false}).count();
  let match = Notification.find({typeNotifi:'MATCH'}).count();
  let appliedEmployer = Notification.find({typeNotifi:'APPLIED'}).count();
  let employeeHired = Notification.find({typeNotifi:'HIRED'}).count();
    return {
        ready: ready,
        general: notifications+messages,
        notifications:notifications,
        messages:messages,
        match:match,
        appliedEmployer:appliedEmployer,
        employeeHired:employeeHired,
        user: Meteor.user(),
    };
})(NavBarPage);
