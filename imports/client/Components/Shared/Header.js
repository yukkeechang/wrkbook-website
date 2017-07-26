import React, {Component}  from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

class Head extends Component {
    constructor(props){
        super(props);
        this.state = {
            backgroundColor: 'rgba(0,0,0,0)',
            open: false
        }
    }
    componentWillMount(){
        window.addEventListener('scroll',(e)=>{
            if(this.refs.hed){
                if(window.scrollY > 836){
                    this.setState({
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    })
                }else{
                    this.setState({
                        backgroundColor: 'rgba(0,0,0,0)'
                    })
                }
            }
            
        });
    }
    comopnentWillUnmount(){
        window.removeEventListener('scroll',()=>{});
    }
    handleClick(e){
        e.preventDefault();
        this.setState({
            anchorEl: e.currentTarget,
            open: true,
        });
    }
    handleRequestClose(){
        this.setState({
            open: false,
        });
    }
    logOut(e){
        Meteor.logout();
    }
    render(){
        let right = this.props.user ? 
        (
            <MuiThemeProvider>
                <Link ref="userL" to="/" id="login" onClick={this.handleClick.bind(this)}>
                    {this.props.user.profile.firstName}
                    <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose.bind(this)}
                    >
                    <Menu>
                        <MenuItem primaryText="Profile" />
                        <MenuItem primaryText="Settings" />
                        <Link style={{textDecoration: 'none'}}onClick={this.logOut.bind(this)} to="/"><MenuItem primaryText="Sign out" /></Link>
                    </Menu>
                    </Popover>
                    <Avatar
                    color={'white'}
                    backgroundColor={'#0ea56a'}
                    size={30}
                    style={{margin:'5px'}}
                    >
                    {this.props.user.profile.firstName[0]}
                    </Avatar>
                </Link>
                    
            </MuiThemeProvider>
        ) : 
        <Link id="login" to="/login">Login</Link>
        return (
            <div ref="hed" id="headerC" style={this.state}>
                <div id="header" >
                    <Link to="/"><img src="/images/wrkbook.png"/></Link>
                    {right} 
                </div>
            </div>
        )
    }
    
}
export default Header = createContainer(({ params }) => {
  return {
    loggingIn: Meteor.loggingIn(),
    user: Meteor.user(),
  };
}, Head);
