import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';
import {PICLINK} from './Schemas/basicTextSchema';

export const NOTAUTH = true;
//Global publication do not need to call subscribe on the client side
// returns user object with the fields email and profile
Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: { emails: 1, profile: 1,roles: 1 } });
});
//
let isRoles = Roles.getAllRoles().fetch();
if((!(isRoles.length > 0 )) ||  isRoles.length < 2){
  if( Roles.getAllRoles().fetch()[0].name === PROFESSIONAL){
    Roles.createRole('PRO');
  }
  if(Roles.getAllRoles().fetch()[0].name === CONTRACTOR){
    Roles.createRole('CON');
  }


}



Meteor.methods({

    validateBasicUserData(User){

      let phoneE = User.profile.phone.length > 0 ? false : true;
      let gPhone = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/.test(User.profile.phone);
      let fEmpty = User.profile.firstName.length > 0 ? false : true;
      let lEmpty = User.profile.lastName.length > 0 ? false : true;
      let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(User.email);
      let eEmpty = User.email.length > 0 ? false : true;
      let nEqual = User.password !== User.password2 ? true : false;
      let gPass   = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(User.password);
      let pEmpty = User.password.length > 0 ? false : true;


      let Errors = {
          fEmpty : fEmpty,
          lEmpty : lEmpty,
          eEmpty : eEmpty,
          isEmail: isEmail,
          phoneE : phoneE,
          gPhone : gPhone,
          pValid: gPass,
          nEqual: nEqual,
          p1Empty: pEmpty

      };
      if(!isEmail || !gPass || fEmpty || lEmpty || eEmpty || pEmpty || phoneE || nEqual) throw new Meteor.Error('403',Errors);


    },

    register(User){

      validateBasicUserData(User);

      if(User.profile.isPro){
        check(User.profile.employeeData,EmployeeSchema);//GIVES ONLY A MATCH ERROR ON CLIENT NOT DETAILED
      }else{
        check(User.profile.employerData,EmployerSchema);
      }
      let id = Accounts.createUser(User);
      if(User.profile.isPro){
        Roles.addUsersToRoles(id, PROFESSIONAL );
      }else{
        Roles.addUsersToRoles(id,CONTRACTOR);
      }
      Meteor.users.update({_id: id},{$unset : {isPro: ""}});
    },
    /**

    */
    findUserbyId(userID){

      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      check(userID,String);
      let crap =Meteor.users.findOne({_id : userID},{fields: { emails: 1, profile: 1,roles: 1 } });
      return crap;
    },




    updateUserData(User){

          if(!this.userId) throw new Meteor.Error('401',NOTAUTH);



          let prevUser = Meteor.users.findOne({_id: this.userId});
          prevUser.profile.firstName = User.profile.firstName;
          prevUser.profile.lastName = User.profile.lastName;
          prevUser.profile.phone = User.profile.phone;

          let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
          let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);

          if(!isPRO || !isCON ) throw new Meteor.Error('401',NOTAUTH);


          if(isCON){
            let employerData = User.profile.employerData;
            let oldData = prevUser.profile.employerData
            check(employerData,EmployerSchema);
            if (employerData.companyName.text != DEFAULT) {
              oldData.companyName.text = employerData.companyName.text;
            }
            if(('undefined' === typeof(oldData.webPage))  ||
                ('undefined' === typeof(employerData.webPage)) ){
              oldData.webPage = employerData.webPage;
            }
            if(('undefined' === typeof(oldData.licenseNumber))  ||
                ('undefined' === typeof(employerData.licenseNumber))){
                  oldData.licenseNumber = employerData.licenseNumber;
            }
            if(employerData.location.locationName != DEFAULT){
              oldData.location.locationName =
              employerData.location.locationName;

              oldData.location.latitude =
              employerData.location.latitude;

              oldData.location.longitude =
              employerData.location.longitude;
            }
            if(employerData.about.text != DEFAULT){
              oldData.about.text =
              employerData.about.text;
            }
            if(employerData.image != PICLINK){
              oldData.image =
              employerData.image;
            }
            prevUser.profile.employerData = oldData;
          }else{
            let oldData = prevUser.profile.employeeData;
            let employeeData = User.profile.employeeData;
            check(employeeData,EmployeeSchema);

            if(employeeData.jobTitle.texts.length >0 ){
              oldData.jobTitle.texts =
              employeeData.jobTitle.texts;
            }
            if(employeeData.education.texts.length >0 ){
              oldData.education.texts =
              employeeData.education.texts;
            }
            if(employeeData.languages.texts.length >0 ){
              oldData.languages.texts =
              employeeData.languages.texts;
            }
            if(employeeData.certifications.texts.length >0 ){
              oldData.certifications.texts =
              employeeData.certifications.texts;
            }
            if(employeeData.about.text != DEFAULT ){
              oldData.about.text =
              employeeData.about.text;
            }
            if(employeeData.skills.text != DEFAULT ){
              oldData.skills.text =
              employeeData.skills.text;
            }
            if(employeeData.location.locationName != DEFAULT){
              oldData.location.locationName =
              employeeData.location.locationName;

              oldData.location.latitude =
              employeeData.location.latitude;

              oldData.location.longitude =
              employeeData.location.longitude;
            }
            if(employeeData.Availability.beginTime.length > 0){
              oldData.Availability.beginTime=
              employeeData.Availability.beginTime;

              oldData.Availability.endTime=
              employeeData.Availability.endTime;
            }
            if(employeeData.image != PICLINK){
              oldData.image =
              employeeData.image;
            }
            if(employeeData.osha.osha10 != oldData.osha.osha10){
              oldData.osha.osha10 = employeeData.osha.osha10;
            }
            if(employeeData.osha.osha30 != oldData.osha.osha30){
              oldData.osha.osha30 = employeeData.osha.osha30;
            }
            if(employeeData.prevJobs.length>0){
              oldData.prevJobs = employeeData.prevJobs;
            }
            if(employeeData.maxDistance != oldData.maxDistance){
              oldData.maxDistance = employeeData.maxDistance
            }
            if(employeeData.driverLicense != oldData.driverLicense){
              oldData.driverLicense = employeeData.driverLicense;
            }
            if(employeeData.hasCar != oldData.hasCar){
              oldData.hasCar = employeeData.hasCar;
            }
            prevUser.profile.employeeData = oldData;

          }


          Meteor.users.update({_id: this.userId},{$set: prevUser});
    },
    deleteUser(userId){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      if(Roles.userIsInRole(this.userId,'admin')){
        Meteor.users.remove({_id: userId});
      }else{
        throw new Meteor.Error('401',NOTAUTH);
      }

    },
    deleteYourself(){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      if(Roles.userIsInRole(this.userId,CONTRACTOR)){
        Job.remove({employerId: this.userId});
      }
      Meteor.users.remove({_id:this.userId});
    }


});
