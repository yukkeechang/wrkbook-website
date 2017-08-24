import {Email} from 'meteor/email';
import { Roles } from 'meteor/alanning:roles';

export const NOTAUTH = {
    notAuthorized: true
};

Accounts.urls.resetPassword = (token) => {
  return Meteor.absoluteUrl(`reset/${token}`);
};
Accounts.emailTemplates.siteName = 'WRKBOOK';
Accounts.emailTemplates.from = 'WRKBOOK Admin <no-reply@wrkbook.com';
Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `WRKBOOK , ${user.profile.firstName}`;
};
Accounts.emailTemplates.enrollAccount.text = (user, url) => {
  return 'You have been selected to participate in building a better future!'
    + ' To activate your account, simply click the link below:\n\n'
    + url;
};
Accounts.emailTemplates.resetPassword.subject =(user) =>{
    return `Reset Password for ${user.profile.firstName}`;
};
Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'WRKBOOK Password Reset <no-reply@wrkbook.com>';
};
Accounts.emailTemplates.resetPassword.text = (user,url) =>{
  return `Hey MY GUY ${user.profile.firstName},\n Click the link the reset ur things `
  + url;
};
Accounts.emailTemplates.verifyEmail = {
   subject() {
      return "Activate your account now!";
   },
   text(user, url) {
      return `Hey ${user.profile.firstName}! Verify your e-mail by following this link: ${url}`;
   }
};

Meteor.methods({
  passwordChange(){
    if(!this.userId) throw new Meteor.Error('403',NOTAUTH);

    let userMyGuy = Meteor.findOne({_id:this.userId},{fields: { emails: 1, profile: 1,roles: 1 } });

    Email.send({
      to: userMyGuy.emails[0].address,
      from: "no-reply@wrkbook.com",
      subject: "Your Password Has Been Change BOIIII",
      text: "Your password has been changed. If you didn't do this just please contact us."
    });
  }
})
