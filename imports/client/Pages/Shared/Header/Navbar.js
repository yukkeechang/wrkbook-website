import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../UserIcon';
import ReactDOM from 'react-dom';
import WrkBookIcon from '../WrkBookIcon';
import { createContainer } from 'meteor/react-meteor-data';

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
        fontSize:'20px',
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

}
export class NavBarPage extends Component{
    constructor(props){
        super(props);

          if(this.props.user.roles[0]==="CON"){
            this.state={isPro: false}
          } else if (this.props.user.roles[0]==="PRO") {
            this.state={isPro: true}
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
        let sn = ReactDOM.findDOMNode(this.refs.sideNav);
        $(sn).sideNav();
    }
    logout(){
        console.log(this.props);
        Meteor.logout();
        console.log(this.props);
    }
    sideClick(){
        let sn = ReactDOM.findDOMNode(this.refs.sideNav);
        $(sn).sideNav('hide');
    }

    render(){
      let subscription = this.state.isPro ? "" : <li><Link to='/settings/subscription'>Subscription</Link></li>

      let jobDropDownLinks = this.state.isPro ?
      <ul id='jobs' className='dropdown-content'>
        <li><Link to='/jobs'>All Jobs</Link></li>
        <li><Link to='/current'>Current</Link></li>
        <li><Link to='/completed'>Completed</Link></li>

      </ul>
      :
      <ul id='jobs' className='dropdown-content'>

        <li style={{display:'none'}}><Link to='/conjobcurrent'>Current</Link></li>
        <li><Link to='/upcoming'>Upcoming</Link></li>
        <li><Link to='/completed'>Completed</Link></li>
        <li><Link to='/createjob'>Create Job</Link></li>
      </ul>

        return(
            <div className="row">
            <div ref="sideNav" data-activates="sideNav" className="col s4 hide-on-med-and-up">
                <i style={styles.icon}className="material-icons">menu</i>
            </div>
            <div style={{textAlign:'center'}}className="col s4 m1">
                <img style={styles.logo} src="/images/circle-logo.svg"/>
            </div>
            <div style={styles.links} className="col m2 hide-on-small-only genText"><Link style={styles.links}to="/">Home</Link></div>
            <div style={styles.links} ref="jobdropdown" data-activates='jobs' className="col m2 hide-on-small-only genText"><div>Jobs</div></div>
            <div style={styles.links} className="col m2 hide-on-small-only genText"><Link style={styles.links}to="/profile">Profile</Link></div>
            <div ref="dropdown" data-activates='account' style={styles.account}className="col s3 m3 push-m1">
                <div style={styles.firstName} className="hide-on-small-only">{this.props.firstName}</div>
                <div style={styles.profile}>
                    <UserIcon imageId={this.props.image}/>
                </div>
            </div>
            <ul id='account' className='dropdown-content'>
              <li><Link to="/settings">Account Settings</Link></li>
                <li><Link to='/settings/password'>Change Password</Link></li>
                <div>{subscription}</div>
              <li><Link to="/" onClick={this.logout.bind(this)}>Logout</Link></li>
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
                    <Link onClick={this.sideClick.bind(this)} to = "/jobs">Jobs</Link>
                </li>
                <li>
                    <Link onClick={this.sideClick.bind(this)} to = "/profile">Profile</Link>
                </li>

            </ul>
            </div>

        )
    }
}

export default NavBar = createContainer(({ params }) => {
    return {

        user: Meteor.user(),
    };
}, NavBarPage);
