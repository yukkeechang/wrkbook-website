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
import BasicText from './Schemas/basicTextSchema';
import LocationSchema from './Schemas/locationSchema';
import EducationSchema from './Schemas/educationSchema';
import OshaSchema from './Schemas/oshaSchema';
import TextList from './Schemas/textListSchema';

export const NOTAUTH = true;
//Global publication do not need to call subscribe on the client side
// returns user object with the fields email and profile
Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: { emails: 1, profile: 1,roles: 1 } });
});

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
      let prevUser =Accounts.findUserbyEmail(User.email);
      let accountExists = true;
      if(!(prevUser))throw new Meteor.Error('403',accountExists);


    },
    validateEmployee(employee){
      const validationz = EmployeeSchema.newContext('Employees');
      const employ = employee;
      let jobs = validationz.validateOne(employ,'jobTitle');
      let edu = Match.test(employee.education, EducationSchema);
      let certification = Match.test(employee.certifications, TextList);
      let languages = validationz.validateOne(employ,'languages');
      let osha =  Match.test(employee.osha, OshaSchema);
      let about = Match.test(employee.about,BasicText);
      let skills = Match.test(employee.skills,BasicText);
      let location = Match.test(employee.location, LocationSchema);
      let car = validationz.validateOne(employ,'hasCar');
      let driver = validationz.validateOne(employ,'driverLicense');
      let tools = validationz.validateOne(employ,'bringTools');
      let distance = validationz.validateOne(employ,'maxDistance');
      let image = validationz.validateOne(employ,'image');

      let Errors ={
        validJobTitles: jobs,
        validEdu: edu,
        validCert : certification,
        validLang: languages,
        validOsha: osha,
        validAbout: about,
        validSkills : skills,
        validLocation: location,
        validCar: car,
        validDriver: driver,
        validTools: tools,
        validDistance: distance,
        validImage: image
      };
      if(!jobs|| !edu || !certification|| !languages || !osha || !about || !skills
      || !location || !car || !driver || !tools || !distance|| !image){
        throw new Meteor.Error('403',Errors);
      }


    },
    validateEmployer(employer){
      const validation = EmployerSchema.newContext();
      // console.log(employer);

      // console.log(EmployerSchema);
      let company =Match.test(employer.companyName, BasicText);
      let about = Match.test(employer.about, BasicText);
      let location = Match.test(employer.location,LocationSchema);
      let image =  validation.validateOne(employer,'image');
      let web = true;
      let licenseNumber = true;
      if(!('undefined' === typeof(employer.webPage))){
        web =  validation.validateOne(employer,'webPage');
      }
      if(!('undefined' === typeof(employer.licenseNumber))){
        licenseNumber = validation.validateOne(employer,'licenseNumber');
      }
      let Errors = {
        validCompany: company,
        validAbout : about,
        validLocation : location,
        validImage : image,
        validWeb: web,
        validLicense: licenseNumber
      }
      console.log(Errors);
      if(!company || !about || !location || !image || !web ||!licenseNumber){
        throw new Meteor.Error('403',Errors);
      }
    },
    register(User){

      Meteor.call('validateBasicUserData',User);


      if(User.profile.isPro){
        if(('undefined' === typeof(User.profile.employeeData)))throw new Meteor.Error('403','NAH');
        Meteor.call('validateEmployee',User.profile.employeeData);
      }else{
          if(('undefined' === typeof(User.profile.employerData)))throw new Meteor.Error('403','NAH');
        Meteor.call('validateEmployer',User.profile.employerData);
      }

      let id = Accounts.createUser(User);
      if(User.profile.isPro){
        Roles.addUsersToRoles(id, PROFESSIONAL );
      }else{
        Roles.addUsersToRoles(id,CONTRACTOR);
      }
      Meteor.users.update({_id: id},{$unset : {'profile.isPro': 1}});
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
                !('undefined' === typeof(employerData.webPage)) ){
              oldData.webPage = employerData.webPage;
            }
            if(('undefined' === typeof(oldData.licenseNumber))  ||
                !('undefined' === typeof(employerData.licenseNumber))){
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

            if(employeeData.jobTitle.length >0 ){
              oldData.jobTitle =
              employeeData.jobTitle;
            }
            if(employeeData.languages.length >0 ){
              oldData.languages =
              employeeData.languages;
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
            if(employeeData.education.highGED != oldData.education.highGED){
              oldData.education.highGED = employeeData.education.highGED;
            }
            if(employeeData.education.tradeSchool != oldData.education.tradeSchool){
              oldData.education.tradeSchool = employeeData.education.tradeSchool;
            }
            if(employeeData.education.higherEdu != oldData.education.higherEdu){
              oldData.education.higherEdu = employeeData.education.higherEdu;
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
    uploadPic(imageId){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
      let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
      if(!isPRO || !isCON ) throw new Meteor.Error('401',NOTAUTH);
      let user = Meteor.user.findOne({_id:this.userId});
      check(imageId,String);
      user.image = imageId;
      Meteor.users.update({_id: this.userId},{$set: user});
    },
    deleteYourself(){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
      let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);

      if(!isPRO || !isCON ) throw new Meteor.Error('401',NOTAUTH);
      if(Roles.userIsInRole(this.userId,CONTRACTOR)){
        Job.remove({employerId: this.userId});
      }
      Meteor.users.remove({_id:this.userId});
    }


});
