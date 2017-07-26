import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {grey500} from 'material-ui/styles/colors';

injectTapEventPlugin();

export default class StepOne extends Component {
  constructor(props) {
    super(props);
    var what_person = !props.isPro;
    let checked1 = what_person ? true : false;
    this.state = {
      checked1: checked1,
      checked2: !checked1,
      showBar : false,
      showPassField: true,
      facebook_user: {
        email:'',
        profile: {
          firstName: '',
          lastName: '',
        }
      },
      validations: {
        fEmpty : false,
        lEmpty : false,
        eEmpty : false,
        p1Empty: false,
        pValid : true,
        p2Empty: false,
        nEqual : false,
        isEmail: true,
        phoneE : false,
        gPhone : true,
      }
    };

  }
  handleCheck(e) {
    let checked1 = e.target.id === "C" ? true : false;
    this.props.handler(!checked1);
    this.setState({
      checked1: checked1,
      checked2: !checked1
    });

  }
  handleFacebook(e){
    Meteor.loginWithFacebook(
      {requestPermissions: ['public_profile','email']},function(err,res){
        if (err) {
          console.log(err);
        }
        else{
          this.setState({showPassField: false,
                        facebook_user: Meteor.user(),});

        }
      }.bind(this));


  }
  handleChange(event){
    let newStuff = this.state.facebook_user;
    let id = event.target.id;
    switch (id) {
      case 'first_name_label':
        newStuff.profile.firstName = event.target.value;
        this.setState({
          facebook_user: newStuff,
        });
        break;
      case 'last_name_label':
        newStuff.profile.lastName = event.target.value;
        this.setState({
          facebook_user: newStuff,
        });
        break;
      case 'email_label':
        newStuff.email = event.target.value;
        this.setState({
          facebook_user: newStuff,
        });
        break;
      default:

    }

  }

  handleSubmit(e){

    const isPro     = this.state.checked2;
    const phone     = this.refs.phone.getValue().trim();
    console.log(isPro);

    if(this.state.showPassField){

      const firstName = this.refs.first_name.getValue().trim();
      const lastName  = this.refs.last_name.getValue().trim();
      const email     = this.refs.email.getValue().trim();
      const password1 = this.refs.password1.getValue().trim();
      const password2 = this.refs.password2.getValue().trim();

      const User = {
        email: email,
        password: password1,
        password2: password2,
        profile: {
          firstName : firstName,
          lastName  : lastName,
          isPro     : isPro,
          dateJoined: new Date(),
          phone     : phone,
        }
      };
      Meteor.call('register', User, (err)=>{
        if(err) {
          console.log(err);
          this.setState({
            validations: err.reason
          });
        }
        else{
          Meteor.loginWithPassword(User.email, User.password);
          this.props.submit();
        }
      });
    }else{
      let user = this.state.facebook_user
      user.profile.phone = phone;
      user.profile.isPro = isPro;
      Meteor.call('updateUserData',user,(err)=>{
          if (err) {
            console.log(err);
            this.setState({
              validations: err.reason
            });
          }else{
            this.props.submit();
          }
      });
    }

  }

  render(){
    let fnameE = this.state.validations.fEmpty  ? 'First Name is required' : '';
    let lnameE = this.state.validations.lEmpty  ? 'Last Name is required'  : '';
    let p1Err  = this.state.validations.p1Empty
              || !this.state.validations.pValid ? 'Password is weak' : '';
    let p2E    = this.state.validations.p2Empty
              || this.state.validations.nEqual  ? 'Passwords don\'t match' : '';
    let emailE = this.state.validations.eEmpty
              || !this.state.validations.isEmail? 'Not a valid Email' : '';
    let phoneEmpty = this.state.validations.phoneE
              || !this.state.validations.gPhone ? 'Not a valid phone number' : '';

    return(

      <MuiThemeProvider>
        <div style={{
          width: '100%',
        }}>
        <Card  style={{
          backgroundColor: '#ECEFF1',
        }}

        >
          <CardTitle
            title="Sign Up"
          />
          <CardText  >
          {
            this.state.showPassField &&
            <RaisedButton
            fullWidth={true}
            backgroundColor='#3B5998'
            onTouchTap={this.handleFacebook.bind(this)} label="Facebook" />
          }


            <div
              style={{display: 'flex', flexDirection: 'row',width:'100%',
              textAlign: 'center',}}
            >
            <div style={{
              width:'40%',
            }}>
              <TextField
                floatingLabelText="First Name"
                id='first_name_label'
                value = { this.state.facebook_user.profile.firstName }
                onChange ={this.handleChange.bind(this)}
                underlineStyle={{borderColor: '#7F8778'}}
                errorText={fnameE}
                ref="first_name"
                fullWidth={true}
              /><br />

              <TextField
                floatingLabelText="Last Name"
                id='last_name_label'
                errorText={lnameE}
                value={ this.state.facebook_user.profile.lastName}
                onChange={this.handleChange.bind(this)}
                ref="last_name"
                fullWidth={true}
              /><br />

              <TextField
                floatingLabelText="Email Address"
                id='email_label'
                value={this.state.facebook_user.email}
                onChange={this.handleChange.bind(this)}
                errorText={emailE}
                ref="email"
                fullWidth={true}
              /><br />

              <TextField
                floatingLabelText="Phone Number"
                errorText={phoneEmpty}
                ref="phone"
                type="tel"
                fullWidth={true}
              /><br />

              </div>

              <div style={{
                width:'10%',
              }}/>

              <div style={{
                width:'40%',
              }}>
              <div
              style={{
                width: 'auto',
                marginLeft:'auto',
                marginRight:'0',
                textAlign: 'left',
              }}
              >

              {this.state.showPassField &&
                <TextField
                  hintText="Password Field"
                  floatingLabelText="Password"
                  errorText={p1Err}
                  ref="password1"
                  type="password"
                />
              }

              <IconButton tooltip={
                <div style={{textAlign:'left',whiteSpace:'normal',width:'100px'}}>
                  Password must contain at least 8 characters, a capital letter  a number and a special character ('!@#$%^&*')
                </div>
              }>
              
              
                <ActionInfo color={grey500}/>
              </IconButton>
              <br />

                {this.state.showPassField &&

                <TextField
                  hintText="Enter Password Again"
                  floatingLabelText="Confirm Password"
                  errorText={p2E}
                  ref="password2"
                  type="password"
                />}
                <br /><br/>



                  <Checkbox
                  label="Contractor"
                  id='C'
                  checked={this.state.checked1}
                  onCheck={this.handleCheck.bind(this)}
                  />
                  <br/>
                  <Checkbox
                    label="Professional"
                    id='P'
                    checked={this.state.checked2}
                    onCheck={this.handleCheck.bind(this)}
                  />

              </div>
              </div>


            </div>

          </CardText>
          <CardActions>

            <RaisedButton
            fullWidth={true}
            onTouchTap={this.handleSubmit.bind(this)} label={this.state.showPassField ? 'Submit': 'Confirm'} />

          </CardActions>
          <br/>
          <br/>
          { this.state.showBar && <LinearProgress mode="indeterminate" /> }
        </Card>
        </div>




      </MuiThemeProvider>
    )
  }
}
