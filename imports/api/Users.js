import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

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
            gPhone : gPhone
        };

        if(!isEmail || !gPass || fEmpty || lEmpty || eEmpty || pEmpty || phoneE) throw new Meteor.Error('403',Errors);
        Accounts.createUser(User);
    }

});
