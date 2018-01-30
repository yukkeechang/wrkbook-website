import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import {DEFAULT} from './Schemas/basicTextSchema';
import {PICLINK} from './Schemas/basicTextSchema';
import {PROFESSIONAL} from './Schemas/employeeSchema';
import {CONTRACTOR} from './Schemas/employerSchema';
import { Roles } from 'meteor/alanning:roles';
import BasicText from './Schemas/basicTextSchema';
import LocationSchema from './Schemas/locationSchema';
import EducationSchema from './Schemas/educationSchema';
import OshaSchema from './Schemas/oshaSchema';
import TextList from './Schemas/textListSchema';
import SocialSchema from './Schemas/socialSchema';
import {ServerSession } from 'meteor/matteodem:server-session';

export const NOTAUTH = {
    notAuthorized: true
};

Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: { emails: 1, profile: 1,roles: 1 } });
});

Meteor.publish('other-user',function(id){
    if (!this.userId) {
      this.stop();
      throw new Meteor.Error('401',NOTAUTH);
    }else{
      return Meteor.users.find({_id: id}, {fields: { emails: 1, profile: 1,roles: 1 } });
    }
})

Meteor.methods({
  /*
    Checks if the new password of the user are the same, and if they meet the requirments
    @param {Object} password Object
    @throws {Meteor.Error} If the passwords don't match eachother or if the
    passwords dont match the requirments of 8 min length,one character,one number
   */
    checkPasswords(passwords){
      let nEqual = passwords.password1 !== passwords.password2 ? true : false;
      let gPass   = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{8,}$/.test(passwords.password1);
      let pEmpty = passwords.password1.length > 0 ? false : true;

      let Errors ={
        nEqual : nEqual,
        pValid : gPass,
        p1Empty : pEmpty
      };

      if(nEqual|| !gPass||pEmpty) throw new Meteor.Error('403',Errors);

    },
    /**
    Validates the User Basic Information such as phone, email, etc. Also checks
    if there is an account already made with the same email address.
    @param {Object} User object
    @throws {Meteor.Error} If the the user object passed is missing fields or
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
    @param {Object} User object
    @throws {Meteor.Error} If the the user object passed is missing fields or
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
      let socialThings = Match.test(employee.socialPref, SocialSchema);
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
        vaildSocial : socialThings
      };
      if(!jobs|| !edu || !languages || !osha || !socialThings
      || !location || !car || !driver || !tools || !distance){
        throw new Meteor.Error('403',Errors);
      }


    },
    /**
    Validates the User Employer Information such as Location, company name.
    @param {Object} User object
    @throws {Meteor.Error} If the the user object passed is missing fields or
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
     * Sends a Email Verification Link the email adress associated with the ID
     *
     * @param  {string} Id The Id the user to send email link
     * @throws {Meteor.Error}  This function is only for users who are have not
     * made accounts yet
     */
    sendVerificationEmailServer(Id){
      if(!!this.userId) throw new Meteor.Error('403',NOTAUTH);
       Accounts.sendVerificationEmail(Id);
     },
     /**
      * Sends a Email Verification Link the email adress to the logged in user
      *
      */
    sendVerificationEmail(){
      if(!this.userId) throw new Meteor.Error('403',NOTAUTH);
      Accounts.sendVerificationEmail(this.userId);
    },
    /**
      Inserts the User into the database, but first validates the user using
      the validateBasicUserData and either the validateEmployer or the
      validateEmployer depending on if the user claim he/she is a contractor or
      professional. Also assigns a role to the user depending on if he/she
      is a professional or contractor.
      @param {Object} User object
      @throws {Meteor.Error} If the the user object passed is missing fields or
      if the fields are incorrect an Error object will be thrown.
    **/
    register(User){

      Meteor.call('validateBasicUserData',User);


      if(User.profile.isPro){
        if(('undefined' === typeof(User.profile.employeeData)))throw new Meteor.Error('403','NAH');
        Meteor.call('validateEmployee',User.profile.employeeData);
        if('undefined' === typeof(User.profile.employeeData.image)){
          User.profile.employeeData.image = ServerSession.get('DEFAULTPIC');
        }
        if('undefined' === typeof(User.profile.employeeData.certfi)){
          User.profile.employeeData.certfi = [];
        }
        if('undefined' === typeof(User.profile.employeeData.prevJobs)){
          User.profile.employeeData.prevJobs = [];
        }
      }else{
        if(('undefined' === typeof(User.profile.employerData)))throw new Meteor.Error('403','NAH');
        Meteor.call('validateEmployer',User.profile.employerData);
        if('undefined' === typeof(User.profile.employerData.image)){
          User.profile.employerData.image = ServerSession.get('DEFAULTPIC');
        }
      }

      let id = Accounts.createUser(User);
      if(User.profile.isPro){
        Roles.addUsersToRoles(id, PROFESSIONAL );
      }else{
        Roles.addUsersToRoles(id,CONTRACTOR);
        Roles.addUsersToRoles(id,'free-job');
      }
      Meteor.users.update({_id: id},{$unset : {'profile.isPro': 1}});
      Meteor.call('sendVerificationEmailServer',id,(err)=>{
        if(err)console.log(err);
      })
    },

    /**
      Returns the user stored in the database by given Id
      @param{String} userId is the Id of the user
      @returns {UserObject|Null} if the user exists or null if the user was not found
      @throws {Meteor.Error} If the the user object passed is missing fields or
      if the fields are incorrect an Error object will be thrown.
    **/
    findUserbyId(userID){

      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      check(userID,String);
      let crap =Meteor.users.findOne({_id : userID},{fields: { emails: 1, profile: 1,roles: 1 } });
      return crap;
    },
    updateEmployerData(employerData){
        let prevUser = Meteor.users.findOne({_id: this.userId});
        let oldData = prevUser.profile.employerData;


        Meteor.call('validateEmployer',employerData);

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
        Meteor.users.update({_id: this.userId},{$set: prevUser});


    },
    updateEmployeeData(employeeData){

      let prevUser = Meteor.users.findOne({_id: this.userId});
      let oldData = prevUser.profile.employeeData;
      Meteor.call('validateEmployee',employeeData);

      if(employeeData.jobTitle.length >0 ){
        oldData.jobTitle =
        employeeData.jobTitle;
      }
      if(employeeData.languages.length >0 ){
        oldData.languages =
        employeeData.languages;
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
      if('undefined' === typeof(employeeData.prevJobs)){
        employeeData.prevJobs = [];
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

      Meteor.users.update({_id: this.userId},{$set: prevUser});
    },



    /**
      Updates the user Information stored in the database
      @param {Object} User is the object that should contain the updated fields
      @throws {Meteor.Error} If the user is signed in or if the user is not
      a professional or a constructor
    **/
    updateUserData(User){

          if(!this.userId) throw new Meteor.Error('401',NOTAUTH);

          let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
          let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);

          if(!isPRO && !isCON ) throw new Meteor.Error('401',NOTAUTH);

          if(isCON){
              Meteor.call('updateEmployerData',User.profile.employerData);
          }else{
              Meteor.call('updateEmployeeData',User.profile.employeeData);

          }

          let prevUser = Meteor.users.findOne({_id: this.userId});
          prevUser.profile.firstName = User.profile.firstName;
          prevUser.profile.lastName = User.profile.lastName;
          prevUser.profile.phone = User.profile.phone;

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
      Assigns a imageId to the user calling the function.
      @deprecated Not Really Used and all Images function will move into Images.API
      @param {String} imageId is the is id of the Image store in the database
      @throws {Meteor.Error} If the user is not a professional or a contractor
      or not signed in
    */
    uploadPic(imageId){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
      let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
      if(!isPRO && !isCON ) throw new Meteor.Error('401',NOTAUTH);
      let user = Meteor.user.findOne({_id:this.userId});
      check(imageId,String);
      user.image = imageId;
      Meteor.users.update({_id: this.userId},{$set: user});
    },
    /**
      Allows the user to delete himself or herself. If the User is a contractor
      all of the jobs he/she created will be removed from the database
      @throws {Meteor.Error} If the person calling the function is not sign or not
      a contractor or professional
    */
    deleteYourself(){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      let isPRO = Roles.userIsInRole(this.userId,PROFESSIONAL);
      let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);

      if(!isPRO && !isCON ) throw new Meteor.Error('401',NOTAUTH);
      if(Roles.userIsInRole(this.userId,CONTRACTOR)){
        Job.remove({employerId: this.userId});
      }
      Meteor.users.remove({_id:this.userId});
    },
    /**
     * Once a job is completed the employee that is associated with the id,(userId)
     * the field prevjob will be updated with the id of the completed job
     * @param  {string} userId  the id of the employee
     * @param  {string} jobId  the id of the job
     * @todo check if job exists and if employer is owner of that job
     */
    updateEmployeeJobHistory(userId,jobId){
      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      let isCON = Roles.userIsInRole(this.userId,CONTRACTOR);
      if(!isCON ) throw new Meteor.Error('401',NOTAUTH);
      let user = Meteor.user.findOne({_id:userId});
      let prevJob = user.profile.employeeData.prevjobs;
      prevJob[prevJob.length] = jobId;
      Meteor.users.update({_id: userId},{$set: user});


    },
    updateEmail(oldEmail, newEmail){

      if(!this.userId) throw new Meteor.Error('401',NOTAUTH);
      Accounts.addEmail(this.userId, newEmail, function(err,res){
        if(err) {
          console.log("ERROR SERVERSIDE IN UPDATE EMAIL: "+err)
        } else {
          console.log(res)

        }
      Accounts.removeEmail(this.userId, oldEmail)
      })

      //LAST RESORT: ADD OR REMOVE EMAIL method

      //---This below  doesn't work, ERROR: E11000 duplicate key error collection: meteor.users index:
      // let prevUser = Meteor.users.findOne({_id: this.userId});
      // prevUser.emails[0].address = newEmail;
      // Meteor.users.update({_id: this.userId}, {$set: prevUser});


      //---This below  doesn't work
      //Meteor.users.update({_id: this.userId}, {$set: {'user.emails[0].address': newEmail}});

      //----Uncomment below AFTER changing email works
    //Accounts.sendVerificationEmail(this.userId);
    //TODO: reset verify to false
      let user = Meteor.users.findOne({_id: this.userId});
      console.log(user.emails[0].address)

    }


});
