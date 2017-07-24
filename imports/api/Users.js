import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import EmployerSchema  from './Schemas/employerSchema'
import EmployeeSchema  from './Schemas/employeeSchema';
import {DEFAULT} from './Schemas/basicTextSchema';


Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: { email: 1, profile: 1 } });
});
Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        user.profile = options.profile;
        user.email = user.emails[0].address;
        return user;
    }
    user.profile = {};
    user.profile.firstName = user.services.facebook.first_name;
    user.profile.lastName = user.services.facebook.last_name;
    user.email =  user.services.facebook.email;
    user.profile.dateJoined = user.createdAt;



    return user;
});
Meteor.methods({
    register(User){
        let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(User.email);
        let gPhone = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/.test(User.profile.phone);
        let gPass   = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/.test(User.password);
        let fEmpty = User.profile.firstName.length > 0 ? false : true;
        let lEmpty = User.profile.lastName.length > 0 ? false : true;
        let eEmpty = User.email.length > 0 ? false : true;
        let pEmpty = User.password.length > 0 ? false : true;
        let nEqual = User.password !== User.password2 ? true : false;
        let phoneE = User.profile.phone.length > 0 ? false : true;


        let Errors = {
            fEmpty : fEmpty,
            lEmpty : lEmpty,
            eEmpty : eEmpty,
            p1Empty: pEmpty,
            pValid : gPass,
            isEmail: isEmail,
            nEqual : nEqual,
            phoneE : phoneE,
            gPhone : gPhone,

        };

        if(!isEmail || !gPass || fEmpty || lEmpty || eEmpty || pEmpty || phoneE ) throw new Meteor.Error('403',Errors);
        // console.log(User);

        Accounts.createUser(User);
    },
    findUserbyId(userID){
      if(!this.userId) throw new Meteor.Error('401',"Login required");
      console.log(userID);
      return Meteor.users.findOne({_id : userID},{fields: { email: 1, profile: 1 } });
    },
    updateUserData(User){

          if(!this.userId) throw new Meteor.Error('401',"Login required");
          let gPhone = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/.test(User.profile.phone);
          let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(User.email);
          let fEmpty = User.profile.firstName.length > 0 ? false : true;
          let lEmpty = User.profile.lastName.length > 0 ? false : true;
          let eEmpty = User.email.length > 0 ? false : true;
          let phoneE = User.profile.phone.length > 0 ? false : true;

          let prevUser = Meteor.users.findOne({_id: this.userId});

          //BASIC USER INFO UPDATE
          if(isEmail && !eEmpty){
            prevUser.email = User.email;
          }
          if(!fEmpty){
            prevUser.profile.firstName = User.profile.firstName;
          }
          if(!lEmpty){
            prevUser.profile.lastName = User.profile.lastName;
          }
          if(!phoneE && gPhone){
            prevUser.profile.phone = User.profile.phone;
          }

            prevUser.profile.isPro = User.profile.isPro;


          if(!('undefined' === typeof(User.profile.employerData))){
            check(User.profile.employerData,EmployerSchema);
            if(('undefined' === typeof(prevUser.profile.employerData))){
              prevUser.profile.employerData = User.profile.employerData;
            }else{
              if(User.profile.employerData.companyName.text != DEFAULT){
                prevUser.profile.employerData.companyName.text =
                User.profile.employerData.companyName.text;
              }
              if(User.profile.employerData.webPage != DEFAULT){
                prevUser.profile.employerData.webPage=
                User.profile.employerData.webPage;
              }
              if(User.profile.employerData.details.text != DEFAULT){
                prevUser.profile.employerData.details.text=
                User.profile.employerData.details.text;
              }
              if(User.profile.employerData.image!= DEFAULT){
                prevUser.profile.employerData.image=
                User.profile.employerData.image;
              }
              if(User.profile.employerData.licenseNumber.text != DEFAULT){
                prevUser.profile.employerData.licenseNumber.text =
                User.profile.employerData.licenseNumber.text;
              }
              if(User.profile.employerData.location.locationName != DEFAULT){
                prevUser.profile.employerData.location.locationName =
                User.profile.employerData.location.locationName;

                prevUser.profile.employerData.location.latitude =
                User.profile.employerData.location.latitude;

                prevUser.profile.employerData.location.longitude =
                User.profile.employerData.location.longitude;
              }
            }




          }
          if(!('undefined' === typeof(User.profile.employeeData))){
            check(User.profile.employeeData,EmployeeSchema);
            if(('undefined' === typeof(prevUser.profile.employeeData))){
              prevUser.profile.employeeData = User.profile.employeeData;
            }else{
              if(User.profile.employeeData.jobTitle.texts.length >0 ){
                prevUser.profile.employeeData.jobTitle.texts =
                User.profile.employeeData.jobTitle.texts;
              }
              if(User.profile.employeeData.education.texts.length >0 ){
                prevUser.profile.employeeData.education.texts =
                User.profile.employeeData.education.texts;
              }
              if(User.profile.employeeData.languages.texts.length >0 ){
                prevUser.profile.employeeData.languages.texts =
                User.profile.employeeData.languages.texts;
              }
              if(User.profile.employeeData.certifications.texts.length >0 ){
                prevUser.profile.employeeData.certifications.texts =
                User.profile.employeeData.certifications.texts;
              }
              if(User.profile.employeeData.details.text != DEFAULT ){
                prevUser.profile.employeeData.details.text =
                User.profile.employeeData.details.text;
              }
              if(User.profile.employeeData.location.locationName != DEFAULT){
                prevUser.profile.employeeData.location.locationName =
                User.profile.employeeData.location.locationName;

                prevUser.profile.employeeData.location.latitude =
                User.profile.employeeData.location.latitude;

                prevUser.profile.employeeData.location.longitude =
                User.profile.employeeData.location.longitude;
              }
              if(User.profile.employeeData.Availability.length > 0){
                prevUser.profile.employeeData.Availability=
                User.profile.employeeData.Availability;
              }
              prevUser.profile.employeeData.osha = User.profile.employeeData.osha;
              prevUser.profile.employeeData.maxDistance = User.profile.employeeData.maxDistance;

            }



          }

          Meteor.users.update({_id: this.userId},{$set: prevUser});
    },
    deleteUser(userId){
      if(!this.userId) throw new Meteor.Error('401',"Login required");
      Meteor.users.remove({_id: userId});
    }


});
