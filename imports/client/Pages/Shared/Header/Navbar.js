import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../UserIcon';
import ReactDOM from 'react-dom';
import WrkBookIcon from '../WrkBookIcon';
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

    }
}
export default class Navbar extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let el = ReactDOM.findDOMNode(this.refs.dropdown);
        $(el).dropdown({
            hover: true,
            belowOrigin: true,
            alignment: 'right',
            constrainWidth: false
        });
        let sn = ReactDOM.findDOMNode(this.refs.sideNav);
        $(sn).sideNav();
    }
    logout(){
        Meteor.logout();
    }
    sideClick(){
        let sn = ReactDOM.findDOMNode(this.refs.sideNav);
        $(sn).sideNav('hide');
    }
    render(){
        return(
            <div className="row">
            <div ref="sideNav" data-activates="sideNav" className="col s4 hide-on-med-and-up">
                <i style={styles.icon}className="material-icons">menu</i>
            </div>
            <div style={{textAlign:'center'}}className="col s4 m1">
                <img style={styles.logo} src="/images/circle-logo.svg"/>
            </div>
            <div style={styles.links} className="col m2 hide-on-small-only genText"><Link style={styles.links}to="/">Home</Link></div>
            <div style={styles.links} className="col m2 hide-on-small-only genText"><Link style={styles.links}to="/jobs">Jobs</Link></div>
            <div style={styles.links} className="col m2 hide-on-small-only genText"><Link style={styles.links}to="/profile">Profile</Link></div>

            <div ref="dropdown" data-activates='account' style={styles.account}className="col s4 m4 push-m1">
                <div style={styles.firstName} className="hide-on-small-only">{this.props.firstName}</div>
                <div style={styles.profile}>
                    <UserIcon imageId={this.props.image}/>
                </div>
            </div>
            <ul id='account' className='dropdown-content'>
                <li><Link to="/settings">Account Settings</Link></li>
                <li><a onClick={this.logout}>Logout</a></li>
            </ul>
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
                    <Link onClick={this.sideClick.bind(this)} to = "/messages">Messages</Link>
                </li>
                <li>
                    <Link onClick={this.sideClick.bind(this)} to = "/profile">Profile</Link>
                </li>

            </ul>
            </div>

        )
    }
}
