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

export const NOTAUTH = {
    notAuthorized: true
};
//Global publication do not need to call subscribe on the client side
// returns user object with the fields email and profile
Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: { emails: 1, profile: 1,roles: 1 } });
});

Meteor.methods({
    /**
    Validates the User Basic Information such as phone, email, etc. Also checks
    if there is an account already made with the same email address.
    @param{Object} User object
    @throws{Meteor.Error} If the the user object passed is missing fields or
    if the fields are incorrect an Error object will be thrown.

    */
    validateBasicUserData(User){

      let phoneE = User.profile.phone.length > 0 ? false : true;
      let gPhone = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/.test(User.profile.phone);
      let fEmpty = User.profile.firstName.length > 0 ? false : true;
      let lEmpty = User.profile.lastName.length > 0 ? false : true;
      let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(User.email);
      let eEmpty = User.email.length > 0 ? false : true;
      let nEqual = User.password !== User.password2 ? true : false;
      let gPass   = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{8,}$/.test(User.password);
      let pEmpty = User.password.length > 0 ? false : true;
      let accountExists;
      if(!eEmpty){
        let prevUser = Accounts.findUserByEmail(User.email);
        accountExists = !!prevUser;
      }

      let Errors = {
          fEmpty : fEmpty,
          lEmpty : lEmpty,
          eEmpty : eEmpty,
          isEmail: isEmail,
          phoneE : phoneE,
          gPhone : gPhone,
          pValid: gPass,
          nEqual: nEqual,
          p1Empty: pEmpty,
          accountExists: accountExists
      };
      if(!isEmail || !gPass || fEmpty || lEmpty || eEmpty
         || pEmpty || phoneE || nEqual || accountExists) throw new Meteor.Error('403',Errors);
    },
    /**
    Validates the User Employee Information such as Location, osha, etc .
    @param{Object} User object
    @throws{Meteor.Error} If the the user object passed is missing fields or
    if the fields are incorrect an Error object will be thrown.
    */
    validateEmployee(employee){
      const validationz = EmployeeSchema.newContext('Employees');
      const employ = employee;
      let jobs = validationz.validateOne(employ,'jobTitle');
      let edu = Match.test(employee.education, EducationSchema);
      let languages = validationz.validateOne(employ,'languages');
      let osha =  Match.test(employee.osha, OshaSchema);
      let location = Match.test(employee.location, LocationSchema);
      let car = validationz.validateOne(employ,'hasCar');
      let driver = validationz.validateOne(employ,'driverLicense');
      let tools = validationz.validateOne(employ,'bringTools');
      let distance = validationz.validateOne(employ,'maxDistance');

      let Errors ={
        validJobTitles: jobs,
        validEdu: edu,
        validLang: languages,
        validOsha: osha,
        validLocation: location,
        validCar: car,
        validDriver: driver,
        validTools: tools,
        validDistance: distance,

      };
      if(!jobs|| !edu || !languages || !osha
      || !location || !car || !driver || !tools || !distance){
        throw new Meteor.Error('403',Errors);
      }


    },
    /**
    Validates the User Employer Information such as Location, company name.
    @param{Object} User object
    @throws{Meteor.Error} If the the user object passed is missing fields or
    if the fields are incorrect an Error object will be thrown.
    */
    validateEmployer(employer){
      const validation = EmployerSchema.newContext();
      let company =Match.test(employer.companyName, BasicText);
      let about = Match.test(employer.about, BasicText);
      let location = Match.test(employer.location,LocationSchema);
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
        validLocation : location,
      }
      if(!company ||  !location){
        throw new Meteor.Error('403',Errors);
      }
    },
    /**
      Inserts the User into the database, but first validates the user using
      the validateBasicUserData and either the validateEmployer or the
      validateEmployer depending on if the user claim he/she is a contractor or
      professional. Also assigns a role to the user depending on if he/she
      is a professional or contractor.
      @param{Object} User object
      @throws{Meteor.Error} If the the user object passed is missing fields or
      if the fields are incorrect an Error object will be thrown.
    **/
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
      Returns the user stored in the database by given Id
      @param{String} userId is the Id of the user
      @returns{Object|Null} if the user exists or null if the user was not found
      @throws{Meteor.Error} If the the user object passed is missing fields or
      if the fields are incorrect an Error object will be thrown.
    **/
    findUserbyId(userID){

      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      check(userID,String);
      let crap =Meteor.users.findOne({_id : userID},{fields: { emails: 1, profile: 1,roles: 1 } });
      return crap;
    },


    /**
      Updates the user Information stored in the database
      @param{Object} User is the object that should contain the updated fields
      @throws{Meteor.Error} If the user is signed in or if the user is not
      a professional or a constructor
    **/
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
    /**
      Remove a user from the database given an Id for the user.
      This is an administrative function if any whose not an admin tries to use
      it an error will be thrown.
      @param {String} userId is the Id of the user
      @throws {Meteor.Error} If the person calling the function is not an admin
      or signed in.
    */
    deleteUser(userId){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      if(Roles.userIsInRole(this.userId,'admin')){
        Meteor.users.remove({_id: userId});
      }else{
        throw new Meteor.Error('401',NOTAUTH);
      }

    },
    /**
      Assins a imageId to the user calling the function.
      @param{String} imageId is the is id of the Image store in the database
      @throws{Meteor.Error} If the user is not a professional or a contractor
      or not signed in
    */
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
    /**
      Allows the user to delete himself or herself. If the User is a contractor
      all of the jobs he/she created will be removed from the database
      @throws{Meteor.Error} If the person calling the function is not sign or not
      a contractor or professional
    */
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
