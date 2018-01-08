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
  return `Hey ${user.profile.firstName},\n Click the link the reset your password `
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

    let userMyGuy = Meteor.users.findOne({_id:this.userId},{fields: { emails: 1, profile: 1,roles: 1 } });

    Email.send({
      to: userMyGuy.emails[0].address,
      from: "no-reply@wrkbook.com",
      subject: "Your Password Has Been Changed",
      text: "Your password has been changed. If you didn't do this, please disregard this email."
    });
  },

  removeJobPro(totalPeople,jobLocation) {
    console.log("removing job email")
    for (let i = 0; i < totalPeople.length; i++){
      //send email out for everyone in the array
      console.log("function email for removing job")
      Email.send({
        to: totalPeople.emails[0].address,
        from: "no-reply@wrkbook.com",
        subject: `You have been removed from a matched job at ${jobLocation}`,
        text: "The contractor who created this job that you were matched to has deleted the job post."
      });
    }
    Email.send({
      to: conId.emails[0].address,
      from: "no-reply@wrkbook.com",
      subject: `You have deleted a job at  ${jobLocation}`,
      text: "bruh"
    });
  },

  removeJobCon(conId, jobLocation) {
    let conUser = Meteor.users.findOne({_id:conId},{fields: { emails: 1} });
    Email.send({
      to: conUser.emails[0].address,
      from: "no-reply@wrkbook.com",
      subject: `You have deleted a job at  ${jobLocation}`,
      text: "All matched/hired employees are notified that this job has been deleted."
    });
  }
})
