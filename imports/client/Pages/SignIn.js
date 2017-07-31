import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import Header from '../Components/Shared/Header';
import Footer from '../Components/Shared/Footer';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Etyped: true,
      uExists: true,
      passC  : true
    }
  }
  handleSubmit(e){
    const email= this.refs.email.getValue();
    const password = this.refs.password1.getValue();
    const User = {
      "email": email,
      "password": password
    }
    Meteor.loginWithPassword(email, password,(err)=>{
      if(err){
        console.log(err);
        if(err.reason === "Match failed") this.setState({Etyped:false,uExists:true,passC: true})
        if(err.reason === "User not found") this.setState({uExists:false,Etyped:true,passC:true});
        if(err.reason === "Incorrect password") this.setState({passC:false,Etyped:true,uExists:true});
      }else{
        this.props.history.push('/');
      }
    });
  }



  render(){
    let passErr = this.state.passC ? '' : 'Password is incorrect';
    let userErr = this.state.uExists ? (this.state.Etyped ? '' : 'Please enter an email') : 'An account with this email does not exist';
    return(

        
        <div >
          <Header />
          <div id="howTo"className="fullWidth" >
            <div className="container">
              <MuiThemeProvider style={{zIndex:'-1'}}>
                <Card  style={{
                  backgroundColor: '#ECEFF1',
                  width:'100%',
                  
                }}>
                  <CardTitle
                    title="Sign In"
                  />
                  <CardText  >
                    <div>
                      <TextField
                        floatingLabelText="Email Address"
                        errorText={userErr}
                        ref="email"
                        fullWidth={true}
                      /><br />
                      <TextField
                        hintText="Password Field"
                        errorText={passErr}
                        floatingLabelText="Password"
                        ref="password1"
                        type="password"
                      /><br/><br/>
                    </div>
                  </CardText>
                  <CardActions>
                    <RaisedButton  onTouchTap={this.handleSubmit.bind(this)} label="Login" />
                  </CardActions>
                  <br/>
                  <br/>
                </Card>
              </MuiThemeProvider>
              <Footer/>   
            </div>
          </div>
        </div>
    )
  }
}
