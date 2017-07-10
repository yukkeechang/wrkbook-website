import React from 'react';
import { Link } from 'react-router-dom'
import RaisedButton  from 'material-ui/RaisedButton';
import FlatButton  from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileCardComponent from '../Components/avatarcard';
import ProfileJobComponent from '../Components/profilejob';

export default class Home extends React.Component{
    handleContractor(e){
        this.props.history.push('/register/Contractor');
    }
    handleProfession(e){
      this.props.history.push('/register/Professional');
    }

    stuff(e){
      let tag = ['Fire','Water','Earth','Air'];
      let skill = ['Fire'];
      let tagobject = Object.assign({},tag);
      let skillobject = Object.assign({},tag);
      const job = {
        title: 'New STuff',
        description: "Rich",
        addText: "wasgsdfsdfhb",
        startAt: new Date(),
        endAt: new Date(),
        pay: 22,
        tags: tagobject,
        location: "Location",
        status: 'Yes'
      };
      const newemployee ={
        jobTitle: 'Some afdaadTitle',
        education: 'college',
        details: 'something',
        certifications: skillobject,
        languages: skillobject,
        osha: false,
        skills : skillobject,
        image: 'somelink',
        profileId: Meteor.userId(),
        reviewIds: {}
      };

      // console.log(Object.keys(tagobject).length);

      Meteor.call('createEmployee', newemployee, function(err,res){
        if(err) {
          console.log(err);

        }
        else{
          console.log(res);
        }

      });
      Meteor.call('createJob', job, function(err,res){
        if(err) {
          console.log(err);

        }
        else{
          console.log(res);
        }

      });

    }
    facenut(e){
      Meteor.loginWithFacebook(
        {requestPermissions: ['public_profile','email']},function(err,res){
          if (err) {
            console.log(err);
          }
          else{
            console.log(res);
          }
        });

    }

    render(){



        return(
          <div id='p_unit'>
            <div id="hero">
                <img id="logo" src="images/wrkBookLogo.png" id="logo"/>
                <h1>Join the Community</h1>
                <MuiThemeProvider>

                    <div id="button_contain">
                      <div id="left_stuff">
                        <FlatButton
                        onTouchTap={this.handleContractor.bind(this)}
                        labelStyle={{color: 'white',}}
                        hoverColor="#10a96d"
                        label="Contractor"/>
                      </div>

                      <div id="right_stuff">
                        <FlatButton
                        onTouchTap={this.handleProfession.bind(this)}
                        labelStyle={{color: 'white',}}
                        hoverColor="#10a96d"
                        label="Professional"/>
                      </div>
                    <br/>
                    </div>
                </MuiThemeProvider>
            </div>

            <br/>
            <MuiThemeProvider>
            <div>
                <FlatButton
                onTouchTap={this.stuff.bind(this)}
                labelStyle={{color: 'black',}}
                hoverColor="#10a96d"
                label="stuff"/>

                <FlatButton
                onTouchTap={this.facenut.bind(this)}
                labelStyle={{color: 'black',}}
                hoverColor="#10a96d"
                label="facebook"/>
              </div>
            </MuiThemeProvider>
  <section id="whatever">


            </section>

          </div>
        )
    }
}
