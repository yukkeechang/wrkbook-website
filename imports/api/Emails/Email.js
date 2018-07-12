import {Email} from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SSR } from 'meteor/meteorhacks:ssr';
/* global Assets*/
export const NOTAUTH = {
    notAuthorized: true
};

Accounts.emailTemplates.siteName = 'WRKBOOK';
Accounts.emailTemplates.from = 'WRKBOOK Admin <info@wrkbook.com>';

Accounts.emailTemplates.enrollAccount = {
  subject(user) {
    return `WRKBOOK , ${user.profile.firstName}`;
  },
  text(user, url) {
    return `You have been selected to participate in building a better future! To activate your account, simply click the link below:\n${url}`
  }
}


Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`reset/${token}`);
};

Accounts.emailTemplates.resetPassword = {
  subject(user){
    return `Reset Password for ${user.profile.firstName}`;
  },
  from(){
    // Overrides the value set in `Accounts.emailTemplates.from` when resetting
    // passwords.
    return 'WRKBOOK Password Reset <info@wrkbook.com>';
  },
  html(user,url){
    SSR.compileTemplate('htmlEmail', Assets.getText('EmailTemplates/ResetPassword.html'));
    let emailData = {
      name: `${user.profile.firstName}` ,
      url: `${url}`
    };
    return SSR.render('htmlEmail', emailData)
  }
};



Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   html(user, url) {
     SSR.compileTemplate('htmlEmail', Assets.getText('EmailTemplates/VerifyAccount.html'));

     let data = {
       name: `${user.profile.firstName}`,
       url: `${url}`
     }
     return SSR.render('htmlEmail', data)
   }

};

Meteor.methods({
  passwordChange(){
    if(!this.userId) throw new Meteor.Error('403',NOTAUTH);
    let userMyGuy = Meteor.users.findOne({_id:this.userId},{fields: { emails: 1, profile: 1,roles: 1 } });
    SSR.compileTemplate('htmlEmail', Assets.getText('EmailTemplates/ResetPassword.html'));

    let emailData = {
      name: `${userMyGuy.profile.firstName}`
    };

    Email.send({
      to: userMyGuy.emails[0].address,
      from: "WRKBOOK <info@wrkbook.com>",
      subject: "Your Password Has Been Changed",
      //***---Use text if you don't want to use an HTML file
      //text: "Your password has been changed. If you didn't do this, please disregard this email.",
      html: SSR.render('htmlEmail', emailData)
    });
  },

  removeJobPro(totalPeople,jobLocation) {

    for (let i = 0; i < totalPeople.length; i++){
      //send email out for everyone in the array

      let person=  Meteor.users.findOne({_id:totalPeople[i]},{fields: { emails: 1} });
      Email.send({
        to: person.emails[0].address,
        from: "WRKBOOK <info@wrkbook.com>",
        subject: `You have been removed from a matched job at ${jobLocation}`,
        text: "The contractor who created this job that you were matched to has deleted the job post."
      });
    }

  },


  removeJobCon(conId, jobLocation) {
   SSR.compileTemplate('htmlEmail', Assets.getText('EmailTemplates/RemoveJobCon.html'));
   let conUser = Meteor.users.findOne({_id:conId});
    let emailData = {
      location: `${jobLocation}`,
      name: `${conUser.profile.firstName}`,
    };

    Email.send({
      to: conUser.emails[0].address,
      from: "WRKBOOK <info@wrkbook.com>",
      subject: `You have deleted a job at  ${jobLocation}`,
      html: SSR.render('htmlEmail', emailData)
    });
  }
})
